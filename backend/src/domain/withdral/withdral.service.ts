import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWithdralDto } from './dto/create-withdral.dto';
import PrismaService from '@infra/database/prisma.service';
import { STATUS } from '@prisma/client';
import constants from '@core/constants';

@Injectable()
export class WithdralService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async create(data: CreateWithdralDto, userId: number) {
    const [user, admin] = await Promise.all([
      this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      }),
      this.prisma.user.findFirst({
        where: {
          role: 'ADMIN',
        },
      }),
    ]);

    if (!admin) {
      throw new ForbiddenException('Admin não encontrado');
    }
    if (!user) {
      throw new NotFoundException('Usuário nao encontrado');
    }
    if (!user.iban || !user.bank) {
      throw new ForbiddenException('Dados bancários em falta');
    }
    if (user.totalAvaliable < data.amount) {
      throw new ForbiddenException('Saldo insufficiente');
    }

    const [widthdral] = await this.prisma.$transaction([
      this.prisma.notification.createMany({
        data: [
          {
            title: 'Pedido de saque',
            message: 'Seu pedido de saque foi enviado',
            userId,
          },
          {
            title: 'Pedido de saque',
            message: `O usuário ${user.firstName} solicitou um saque de ${data.amount.toLocaleString('pt')} kz `,
            userId,
          },
        ],
      }),
      this.prisma.withdral.create({
        data: {
          ...data,
          userId,
        },
      }),
      this.prisma.user.updateMany({
        data: {
          totalUnreadNotification: {
            increment: 1,
          },
        },
        where: {
          id: {
            in: [admin.id, user.id],
          },
        },
      }),
    ]);

    return {
      data: widthdral,
    };
  }
  async findAll(userId: number, page: number, limit: number) {
    page = Number.isNaN(page) ? page : 1;
    const finalLimit =
      limit > constants.max_items_per_page || limit <= 0
        ? constants.max_items_per_page
        : limit;
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.role == 'ADMIN') {
      const [total, widthdrall] = await this.prisma.$transaction([
        this.prisma.subscription.count(),
        this.prisma.subscription.findMany({
          take: finalLimit,
          skip: (page - 1) * finalLimit,
        }),
      ]);

      const lastPage = Math.ceil(total / finalLimit);
      return {
        data: widthdrall,
        page,
        limit: finalLimit,
        maxPerPage: constants.max_items_per_page,
        hasNextPage: lastPage > page,
        hasPrevPage: page > 1,
      };
    }
    const [total, widthdrall] = await this.prisma.$transaction([
      this.prisma.subscription.count({
        where: {
          userId,
        },
      }),
      this.prisma.subscription.findMany({
        take: finalLimit,
        skip: (page - 1) * finalLimit,
        where: {
          userId,
        },
      }),
    ]);

    const lastPage = Math.ceil(total / finalLimit);
    return {
      data: widthdrall,
      page,
      limit: finalLimit,
      maxPerPage: constants.max_items_per_page,
      hasNextPage: lastPage > page,
      hasPrevPage: page > 1,
    };
  }
  update(id: number, status: STATUS) {
    try {
      this.prisma.withdral
        .update({
          data: {
            status: status == 'ACTIVED' ? 'ACTIVED' : 'DESACTIVED',
          },
          where: {
            id,
          },
        })
        .then(async (data) => {
          await Promise.all([
            this.prisma.notification.create({
              data: {
                title:
                  status == 'ACTIVED'
                    ? 'Aprovação de saque'
                    : 'Rejeição de saque',
                message:
                  status == 'ACTIVED'
                    ? `Seu saque no valor de ${data.amount.toLocaleString('pt')} kz foi efectuado`
                    : 'Seu saque foi recusado pelo administrador',
                userId: data.userId,
              },
            }),
            this.prisma.user.update({
              data: {
                totalUnreadNotification: {
                  increment: 1,
                },
                totalAvaliable: {
                  decrement: status == 'ACTIVED' ? data.amount : 0,
                },
              },
              where: {
                id: data.userId,
              },
            }),
          ]);
          return {
            sucess: true,
          };
        })
        .catch((error) => {
          throw new BadRequestException(
            error?.message ?? error?.cause ?? error?.error,
          );
        });
    } catch (error) {
      throw new BadRequestException(
        error?.message ?? error?.cause ?? error?.error,
      );
    }
  }
}
