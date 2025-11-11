import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import PrismaService from '@infra/database/prisma.service';
import CacheService from '@infra/cache/cahe.service';
import constants from '@core/constants';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}
  async create(data: CreateCourseDto) {
    const [corse, _] = await this.prisma.$transaction([
      this.prisma.course.create({
        data: {
          ...data,
          isPublished: false,
        },
      }),
      this.prisma.user.update({
        data: {
          totalUnreadNotification: {
            increment: 1,
          },
          totalCourses: {
            increment: 1,
          },
        },
        where: {
          id: data.ownerId,
        },
      }),
    ]);
    await this.prisma.notification.create({
      data: {
        title: 'Novo curso',
        message:
          'Seu curso foi criado , agora preciss criar os modulos e as aulas , no final pubicar',
        userId: data.ownerId,
        deepLink: process.env.FRONTEND + `dashboard/course/${corse.id}`,
      },
    });

    return {
      created: true,
      data: corse,
    };
  }
  async findAll({
    page,
    limit,
    userId,
  }: {
    page: number;
    limit: number;
    userId: number;
  }) {
    page = Number.isNaN(page) ? page : 1;
    const finalLimit =
      limit > constants.max_items_per_page || limit <= 0
        ? constants.max_items_per_page
        : limit;
    const whoIsCalling = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!whoIsCalling) {
      throw new ForbiddenException('Usuário não encontrado');
    }
    if (whoIsCalling.role == 'ADMIN') {
      const [total, courses] = await this.prisma.$transaction([
        this.prisma.course.count(),
        this.prisma.course.findMany({
          take: finalLimit,
          skip: (page - 1) * finalLimit,
        }),
      ]);
      const lastPage = Math.ceil(total / finalLimit);
      return {
        data: courses,
        page,
        limit: finalLimit,
        maxPerPage: constants.max_items_per_page,
        hasNextPage: lastPage > page,
        hasPrevPage: page > 1,
        lastPage,
      };
    } else {
      const [total, courses] = await this.prisma.$transaction([
        this.prisma.course.count({
          where: {
            isPublished: true,
            Subscriptions: {
              none: {
                userId,
              },
            },
          },
        }),
        this.prisma.course.findMany({
          take: finalLimit,
          skip: (page - 1) * finalLimit,
          where: {
            isPublished: true,
            Subscriptions: {
              none: {
                userId,
              },
            },
          },
        }),
      ]);
      const lastPage = Math.ceil(total / finalLimit);
      return {
        data: courses,
        page,
        limit: finalLimit,
        maxPerPage: constants.max_items_per_page,
        hasNextPage: lastPage > page,
        hasPrevPage: page > 1,
        lastPage,
      };
    }
  }
  async findOne(id: number) {
    const isCashed = await this.cache.get(`Course${id}`);
    if (isCashed) {
      return {
        data: isCashed,
      };
    }

    const course = await this.prisma.course.findFirst({
      where: {
        id,
      },
      include: {
        Lessons: {
          orderBy: {
            order: 'desc',
          },
        },
        owner: {
          omit: {
            password: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Curso não encontrado');
    }
    await this.cache.set(`Course${id}`, course, 1000000);
    return {
      data: course,
    };
  }
  async update(id: number, data: UpdateCourseDto) {
    try {
      await this.prisma.course.update({
        where: { id },
        data,
      });
      return {
        sucess: true,
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message ?? error?.cause ?? error?.error,
      );
    }
  }
  async remove(id: number) {
    try {
      await this.prisma.course.delete({
        where: { id },
      });
      return {
        sucess: true,
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message ?? error?.cause ?? error?.error,
      );
    }
  }
  async publisch(id: number) {
    try {
      const data = await Promise.all([
        this.prisma.course.update({
          where: { id },
          data: {
            isPublished: true,
            owner: {
              update: {
                totalUnreadNotification: {
                  increment: 1,
                },
              },
            },
          },
        }),
      ]);
      this.prisma.notification.create({
        data: {
          title: 'Curso publicado',
          message: 'Seu curso foi publicado',
          userId: data[0].ownerId,
        },
      });
      return {
        sucess: true,
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message ?? error?.cause ?? error?.error,
      );
    }
  }
}
