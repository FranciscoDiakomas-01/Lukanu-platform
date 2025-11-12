import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePurchaseDto,
  UpdatePurchaseDto,
} from './dto/create-purchase.dto';
import CacheService from '@infra/cache/cahe.service';
import PrismaService from '@infra/database/prisma.service';
import constants from '@core/constants';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreatePurchaseDto, userId: number) {
    const [isAProduct, isAUser, isAnBuyer, isAfiliationCode] =
      await Promise.all([
        this.prisma.ebook.findFirst({
          where: {
            id: data.ebookId,
          },
        }),
        this.prisma.user.findFirst({
          where: {
            id: data.ownerId,
          },
          omit: {
            password: true,
          },
        }),
        this.prisma.user.findFirst({
          where: {
            id: userId,
          },
          omit: {
            password: true,
          },
        }),
        this.prisma.afiliations.findFirst({
          where: {
            bookId: data.ebookId,
            link: {
              endsWith: data?.affCode,
              mode: 'insensitive',
            },
          },
        }),
      ]);
    
    console.log(isAProduct , isAUser , isAnBuyer)
    if (!isAProduct) {
      throw new NotFoundException('Produto não encontrado');
    }
    if (!isAnBuyer) {
      throw new NotFoundException('Comprador não encontrado');
    }
    if (!isAUser) {
      throw new NotFoundException('Vendedor não encontrado');
    }
    await Promise.all([
      this.prisma.purschase.create({
        data: {
          price: isAProduct.currentPrice,
          payed: 0,
          afiliationCode: data?.affCode,
          digital: data.digital,
          fileUrl: data.fileUrl,
          buyerId: userId,
          description: '',
          ebookId: data.ebookId,
          ownerId: data.ownerId,
          status: 'PENDING',
          client: JSON.stringify(isAnBuyer),
        },
      }),
      this.prisma.notification.createMany({
        data: [
          {
            title: 'Nova venda',
            message: 'Uma venda foi criada , agurde pela a comfirmação',
            userId: isAUser.id,
          },
          {
            title: 'Nova compra',
            message: 'Uma compra foi criada , agurde pela a comfirmação',
            userId: isAnBuyer.id,
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
            in: [isAnBuyer.id, isAUser.id],
          },
        },
      }),
      this.prisma.user.update({
        data: {
          totalPendingPurchase: {
            increment: 1,
          },
        },
        where: {
          id: isAUser.id,
        },
      }),
    ]);
    return {
      message: 'Pagamento feito com sucesso',
      descritpiton: 'Agurade a confirmaão do seu livro no painel',
    };
  }
  async findAll(userId: number, page: number, limit: number) {
    page = Number.isNaN(page) ? page : 1;
    const finalLimit =
      limit > constants.max_items_per_page || limit <= 0
        ? constants.max_items_per_page
        : limit;

    const skip = (page - 1) * finalLimit;

    const isUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!isUser) {
      throw new NotFoundException('Usuário não ncontrado');
    }

    const [purchases, totalPurchases, totalPurchase] = await Promise.all([
      this.prisma.purschase.findMany({
        where:
          isUser?.role == 'ADMIN'
            ? {}
            : {
                OR: [
                  {
                    ownerId: userId,
                  },
                  {
                    buyerId: userId,
                  },
                ],
              },
        take: finalLimit,
        skip,
        include: {
          ebook: true,
          owner: {
            omit: {
              password: true,
            },
          },
        },
      }),
      this.prisma.purschase.count({
        where:
          isUser?.role == 'ADMIN'
            ? {}
            : {
                OR: [
                  {
                    ownerId: userId,
                  },
                  {
                    buyerId: userId,
                  },
                ],
              },
      }),
      this.prisma.purschase.aggregate({
        _count: {
          payed: true,
          price: true,
        },
        where:
          isUser?.role == 'ADMIN'
            ? {}
            : {
                ownerId: userId,
                status: 'PENDING',
              },
      }),
    ]);
    const lastPage = Math.ceil(totalPurchases / finalLimit);
    return {
      data: purchases,
      page,
      limit: finalLimit,
      maxPerPage: constants.max_items_per_page,
      hasNextPage: lastPage > page,
      hasPrevPage: page > 1,
      lastPage,
      myId: userId,
      stats:
        isUser.role == 'ADMIN'
          ? [
              {
                title: 'Total Vendas',
                description: 'Total facturado na plaforma',
                value: totalPurchase._count.payed,
                isCoin: true,
              },
              {
                title: 'Saldo',
                description: 'Valor disponível para saque',
                value: this.getPlatFormercent(totalPurchase._count.payed),
                isCoin: true,
              },
            ]
          : [
              {
                title: 'Total Vendas',
                description: 'Total facturado na plaforma',
                value: isUser.totalErned,
                isCoin: true,
              },
              {
                title: 'Saldo',
                description: 'Valor disponível para saque',
                value: isUser.totalAvaliable,
                isCoin: true,
              },
              {
                title: 'Vendas Pendentes',
                description: 'Total de livros criados por mim',
                value: totalPurchase._count.price,
                isCoin: false,
              },
              {
                title: 'Livros',
                description: 'Total de livros criados por mim',
                value: isUser.totalBooks,
                isCoin: false,
              },
            ],
    };
  }
  async update(id: number, data: UpdatePurchaseDto) {
    const payment = await this.prisma.purschase.findFirst({
      where: {
        id,
        status: 'PENDING',
      },
      include: {
        owner: true,
        ebook: true,
      },
    });

    const buyer = await this.prisma.user.findFirst({
      where: {
        id: Number(payment?.buyerId),
      },
    });

    if (!payment) {
      throw new BadRequestException('Pagamento não encontrado');
    }

    if (!buyer) {
      throw new BadRequestException('Comprador não encontrado');
    }
    if (data.status == 'PENDING') {
      throw new BadRequestException('Estatus inválido');
    }

    if (data.status == 'PAID') {
      if (payment.afiliationCode) {
        const amount = this.getPlatFormercent(payment.ebook.currentPrice);
        const Afilate = await this.prisma.afiliations.findFirst({
          where: {
            link: {
              endsWith: payment.afiliationCode,
              mode: 'insensitive',
            },
            bookId: payment.ebookId,
          },
        });
        if (Afilate) {
          const descount = this.getAfiliatePecent(
            amount,
            payment.ebook.sharePercent,
          );
          await this.prisma.$transaction([
            this.prisma.purschase.update({
              data: {
                status: data.status,
                description: 'Pago com sucesso',
                payed: amount - descount,
              },
              where: {
                id,
              },
            }),
            this.prisma.notification.createMany({
              data: [
                {
                  message: `Uma nova venda foi regisrada no seu painel , venda registrada apartir de afiliação  , do livro ${payment.ebook.title}`,
                  title: 'Confirmalão de pagamento',
                  userId: payment.ownerId,
                },
                {
                  message: `Recebeste uma comisão de ${descount.toLocaleString('pt')} kzna sua afiliação ao livro ${payment.ebook.title}`,
                  title: 'Confirmalão de pagamento',
                  userId: Afilate.userid,
                },
              ],
            }),
            this.prisma.user.update({
              data: {
                totalUnreadNotification: {
                  increment: 1,
                },
                totalPendingPurchase: {
                  decrement: 1,
                },
                totalAvaliable: {
                  increment: amount - descount,
                },
                totalErned: {
                  increment: payment.price,
                },
              },
              where: {
                id: payment.ownerId,
              },
            }),
            this.prisma.user.update({
              data: {
                totalUnreadNotification: {
                  increment: 1,
                },
                totalAvaliable: {
                  increment: descount,
                },
              },
              where: {
                id: Afilate.userid,
              },
            }),
          ]);
          return {
            sucess: true,
          };
        }
        await this.prisma.$transaction([
          this.prisma.purschase.update({
            data: {
              status: data.status,
              description: 'Pago com sucesso',
              payed: amount,
            },
            where: {
              id,
            },
          }),
          this.prisma.notification.createMany({
            data: [
              {
                message: `Uma nova venda foi regisrada no seu painel , do livro ${payment.ebook.title}`,
                title: 'Confirmalão de pagamento',
                userId: payment.ownerId,
              },
            ],
          }),
          this.prisma.user.update({
            data: {
              totalUnreadNotification: {
                increment: 1,
              },
              totalPendingPurchase: {
                decrement: 1,
              },
              totalAvaliable: {
                increment: amount,
              },
              totalErned: {
                increment: payment.price,
              },
            },
            where: {
              id: payment.ownerId,
            },
          }),
        ]);
        return {
          sucess: true,
        };
      } else {
        const amount = this.getPlatFormercent(payment.ebook.currentPrice);
        await this.prisma.$transaction([
          this.prisma.purschase.update({
            data: {
              status: data.status,
              description: 'Pago com sucesso',
              payed: amount,
            },
            where: {
              id,
            },
          }),
          this.prisma.notification.createMany({
            data: [
              {
                message: `Uma nova venda foi regisrada no seu painel , do livro ${payment.ebook.title}`,
                title: 'Confirmalão de pagamento',
                userId: payment.ownerId,
              },
            ],
          }),
          this.prisma.user.update({
            data: {
              totalUnreadNotification: {
                increment: 1,
              },
              totalPendingPurchase: {
                decrement: 1,
              },
              totalAvaliable: {
                increment: amount,
              },
              totalErned: {
                increment: payment.price,
              },
            },
            where: {
              id: payment.ownerId,
            },
          }),
        ]);
        return {
          sucess: true,
        };
      }
    } else {
      await Promise.all([
        this.prisma.purschase.update({
          data: {
            status: data.status,
            description: data.description,
          },
          where: {
            id,
          },
        }),
        this.prisma.notification.createMany({
          data: [
            {
              message: String(data.description),
              title: 'Cancelamento de pagamento',
              userId: payment.ownerId,
            },
            {
              message: String(data.description),
              title: 'Cancelamento de pagamento',
              userId: buyer.id,
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
              in: [buyer.id, payment.ownerId],
            },
          },
        }),
      ]);
      return {
        sucess: true,
      };
    }
  }
  private getPlatFormercent(price: number) {
    const percent = 0.1;
    const descount = price * percent;
    return price - descount;
  }
  private getAfiliatePecent(price: number, percent: number) {
    const descount = price * percent;
    return price - descount;
  }
}
