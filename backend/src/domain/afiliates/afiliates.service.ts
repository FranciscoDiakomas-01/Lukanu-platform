import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAfiliateDto } from './dto/create-afiliate.dto';
import PrismaService from '@infra/database/prisma.service';
import CacheService from '@infra/cache/cahe.service';
import constants from '@core/constants';

@Injectable()
export class AfiliatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  public async create(data: CreateAfiliateDto) {
    const [hasAfiliation, isMyEbook, Ebook, User] = await Promise.all([
      this.prisma.afiliations.findFirst({
        where: {
          bookId: data.productId,
          userid: data.userId,
        },
      }),
      this.prisma.ebook.findFirst({
        where: {
          id: data.productId,
          authorId: data.userId,
        },
      }),
      this.prisma.ebook.findFirst({
        where: {
          id: data.productId,
        },
      }),
      this.prisma.user.findFirst({
        where: {
          id: data.userId,
        },
      }),
    ]);
    if (!User) {
      throw new NotFoundException('Conta não encontrada');
    }
    if (!Ebook) {
      throw new NotFoundException('Livro não encontrado');
    }
    if (!hasAfiliation) {
      if (isMyEbook) {
        throw new ForbiddenException('Você não pode se afiliar ao seu produto');
      }
      const [newAfiliations, notifications, _] = await Promise.all([
        this.prisma.afiliations.create({
          data: {
            bookId: data.productId,
            userid: data.userId,
            link: `${Ebook.checkoutURL}?aff=${User.id}`,
          },
        }),
        this.prisma.notification.createMany({
          data: [
            {
              message: `Sua afiliação foi aprovada`,
              title: 'Afiliação',
              userId: User.id,
            },
            {
              message: `Sua afiliação foi aprovada`,
              title: 'Afiliação',
              userId: Ebook.authorId,
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
              in: [User.id, Ebook.authorId],
            },
          },
        }),
      ]);

      this.prisma.afiliations
        .findMany({
          where: {
            userid: data.userId,
          },
          include: {
            ebook: true,
            user: {
              omit: {
                password: true,
              },
            },
          },
        })
        .then(async (values) => {
          await this.cache.set(`affiliations${data.userId}`, values, 20000);
        });
      throw new HttpException(
        {
          message: 'Afiliação criada',
          data: newAfiliations,
        },
        HttpStatus.CREATED,
      );
    }
    throw new ConflictException('Você já é afiliado do livro em questão');
  }
  public async getMyAfiliations(userId: number) {
    const [cachedAfiliations, User] = await Promise.all([
      this.cache.get(`affiliations${userId}`),
      this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      }),
    ]);
    if (!User) {
      throw new NotFoundException('Conta não encontrada');
    }
    if (cachedAfiliations) {
      return {
        data: cachedAfiliations,
      };
    }

    const affiliations = await this.prisma.afiliations.findMany({
      where: {
        userid: User.id,
      },
      include: {
        ebook: true,
        user: {
          omit: {
            password: true,
          },
        },
      },
    });
    return {
      data: affiliations,
    };
  }
  public async getProductToAfilate(
    userId: number,
    page: number,
    limit: number,
  ) {
    const finalLimit =
      limit > constants.max_items_per_page || limit <= 0
        ? constants.max_items_per_page
        : limit;

    const [products, total] = await this.prisma.$transaction([
      this.prisma.ebook.findMany({
        where: {
          Afiliations: {
            none: {
              userid: userId,
            },
          },
        },
        take: finalLimit,
        skip: (page - 1) * finalLimit,
      }),
      this.prisma.ebook.count({
        where: {
          Afiliations: {
            none: {
              userid: userId,
            },
          },
        },
      }),
    ]);
    const lastPage = Math.ceil(total / limit);
    return {
      data: products,
      page,
      limit: finalLimit,
      maxPerPage: constants.max_items_per_page,
      hasNextPage: lastPage > page,
      hasPrevPage: page > 1,
    };
  }
}
