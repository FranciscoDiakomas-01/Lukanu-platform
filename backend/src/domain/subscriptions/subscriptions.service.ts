import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { STATUS } from '@prisma/client';
import PrismaService from '@infra/database/prisma.service';
import CacheService from '@infra/cache/cahe.service';
import constants from '@core/constants';
import { isAnUser } from '@core/utils/utils';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  async create(data: CreateSubscriptionDto, userId: number) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    const [admin, student, course, hasSubscription] = await Promise.all([
      this.prisma.user.findFirst({
        where: {
          role: 'ADMIN',
        },
      }),
      this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      }),
      this.prisma.course.findFirst({
        where: {
          id: data.courseId,
        },
      }),
      this.prisma.subscription.findFirst({
        where: {
          userId,
          courseId: data.courseId,
        },
      }),
    ]);
    if (hasSubscription) {
      throw new BadRequestException('Você já possuí matricula nesse curso');
    }
    if (!student) {
      throw new NotFoundException('Aluno não encontrado');
    }

    if (!admin) {
      throw new NotFoundException('Admin não encontrado');
    }
    if (student?.role == 'ADMIN') {
      throw new BadRequestException('Admininstrador não pode se matricular');
    }

    if (!course) {
      throw new NotFoundException('Curso não encontrado');
    }

    if (!course?.isPublished) {
      throw new ConflictException('O curso ainda não foi disonibilizado');
    }

    await this.prisma.$transaction([
      this.prisma.subscription.create({
        data: {
          ...data,
          amount: course.price,
          userId: student.id,
          expiredAt: expires,
        },
      }),
      this.prisma.notification.createMany({
        data: [
          {
            title: 'Nova inscrição',
            message: `O curso de ${course?.title} recebeu uma nova inscrição`,
            deepLink: process.env.FRONTEND + 'dashboard/subscriptions',
            userId: admin.id,
          },
          {
            title: 'Nova inscrição',
            message: `A sua matricula no curso de ${course?.title} foi feita aguarde a aprovação`,
            userId: student.id,
          },
        ],
      }),
      this.prisma.user.updateMany({
        data: {
          totalUnreadNotification: {
            increment: 1,
          },
        },
        where: {
          id: {
            in: [student.id, admin.id],
          },
        },
      }),
    ]);
    return {
      sucess: true,
    };
  }
  public async findAll(page: number, limit: number, userId: number) {
    page = Number.isNaN(page) ? page : 1;

    const cached = await this.cache.get(`subscription${userId}`);
    if (cached) {
      return {
        data: cached,
      };
    }
    const finalLimit =
      limit > constants.max_items_per_page || limit <= 0
        ? constants.max_items_per_page
        : limit;

    const isUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!isUser) {
      throw new ForbiddenException('Usuário não encontrado');
    }
    if (isUser?.role == 'ADMIN') {
      const [total, subscriptions] = await this.prisma.$transaction([
        this.prisma.subscription.count(),
        this.prisma.subscription.findMany({
          take: finalLimit,
          skip: (page - 1) * finalLimit,
        }),
      ]);

      const lastPage = Math.ceil(total / finalLimit);
      return {
        data: total,
        page,
        limit: finalLimit,
        maxPerPage: constants.max_items_per_page,
        hasNextPage: lastPage > page,
        hasPrevPage: page > 1,
      };
    } else {
      const subscriptions = await this.prisma.subscription.findMany({
        where: {
          userId,
        },
        include: {
          course: {
            include: {
              Lessons: true,
            },
          },
        },
      });
      const mapped = subscriptions.map((item) => {
        if (item.status != 'ACTIVED') {
          return {
            ...item,
            course: {
              ...item.course,
              Lessons: [],
            },
          };
        }
        return item;
      });
      await this.cache.set(`subscription${userId}`, mapped, 500000);
      return {
        data: mapped,
      };
    }
  }
  async update(id: number, status: STATUS) {
    try {
      if (status == 'PENDING') {
        throw new HttpException('Subscrilão alterada', HttpStatus.OK);
      }

      const subscriptiion = await this.prisma.subscription.findFirst({
        where: {
          id,
        },
      });

      if (!subscriptiion) {
        throw new NotFoundException('Subscrição não encontrado');
      }

      if (subscriptiion.status != 'PENDING') {
        throw new BadRequestException(
          `Subscrição já foi ${subscriptiion.status == 'ACTIVED' ? 'Confirmada' : 'Rejeitada'}`,
        );
      }
      this.prisma.subscription
        .update({
          data: {
            status,
          },
          where: {
            id,
          },
          include: {
            course: true,
          },
        })
        .then(async (data) => {
          await this.prisma.$transaction([
            this.prisma.notification.create({
              data: {
                title:
                  status == 'ACTIVED'
                    ? 'Aprovação da tua sbscrição'
                    : 'Sua subscrição foi recusada',
                message:
                  status == 'ACTIVED'
                    ? 'Confira seu curso na sua lista de cursos'
                    : 'Sua subscrição foi reprovada pelo proprétário do curso',
                userId: data.userId,
                deepLink:
                  status == 'ACTIVED'
                    ? process.env.FRONTEND + 'dashboard/subscriptions'
                    : '',
              },
            }),
            this.prisma.user.update({
              data: {
                totalUnreadNotification: {
                  increment: 1,
                },
                totalCourses: {
                  increment: status == 'ACTIVED' ? 1 : 0,
                },
              },
              where: {
                id: data.userId,
              },
            }),
          ]);
        })
        .catch((error) => {
          throw new BadRequestException(
            error?.message ??
              error?.cause ??
              error?.error ??
              'Erro ao actualizar a subscrição',
          );
        });
    } catch (error) {}
  }
}
