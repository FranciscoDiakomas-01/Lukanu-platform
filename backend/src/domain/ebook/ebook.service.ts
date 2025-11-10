import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import CacheService from '@infra/cache/cahe.service';
import PrismaService from '@infra/database/prisma.service';
import crypto from 'node:crypto';
import constants from '@core/constants';
import { Ebook } from '@prisma/client';
@Injectable()
export class EbookService {
  constructor(
    private readonly cache: CacheService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateEbookDto, userId: number) {
    const isUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!isUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const code = crypto.randomUUID();

    const [ebook] = await this.prisma.$transaction([
      this.prisma.ebook.create({
        data: {
          ...data,
          authorId: userId,
          checkoutURL: process.env.CHEKOUT + code,
          metaData: JSON.stringify(data.metaData),
          oldProce: data.currentPrice,
          sharePercent: data.isShared ? data.sharePercent : 0,
          code,
        },
      }),
      this.prisma.user.update({
        data: {
          totalBooks: {
            increment: 1,
          },
          totalUnreadNotification: {
            increment: 1,
          },
        },
        where: {
          id: userId,
        },
      }),
    ]);
    await this.prisma.notification.create({
      data: {
        title: 'Novo livro',
        message: 'Seu livro foi publicado com sucesso',
        deepLink: (process.env.BOOK as string) + ebook.id,
        userId,
      },
    });

    return {
      message: 'Ebook criado',
      data: ebook,
    };
  }
  async findAll({
    page,
    limit,
    userId,
  }: {
    userId: number;
    page: number;
    limit: number;
    }) {
    
    page = Number.isNaN(page) ? page : 1;
    const finalLimit =
      limit > constants.max_items_per_page || limit <= 0
        ? constants.max_items_per_page
        : limit;

    const skip = (page - 1) * finalLimit;
    const isAdmin = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!isAdmin) {
      throw new ForbiddenException('Usuário não encontrado');
    }
    if (isAdmin?.role == 'ADMIN') {
      const [ebooks, total] = await Promise.all([
        this.prisma.ebook.findMany({
          include: {
            author: {
              omit: {
                password: true,
              },
            },
            _count: {
              select: {
                Afiliations: true,
                Purschases: true,
              },
            },
          },
          skip,
        }),
        this.prisma.ebook.count({}),
      ]);
      const lastPage = Math.ceil(total / finalLimit);
      return {
        data: ebooks,
        page,
        limit: finalLimit,
        maxPerPage: constants.max_items_per_page,
        hasNextPage: lastPage > page,
        hasPrevPage: page > 1,
      };
    }
    const [ebooks, total] = await Promise.all([
      this.prisma.ebook.findMany({
        where: {
          authorId: userId,
        },
        include: {
          author: {
            omit: {
              password: true,
            },
          },
          _count: {
            select: {
              Afiliations: true,
              Purschases: true,
            },
          },
        },
        skip,
      }),
      this.prisma.ebook.count({
        where: {
          authorId: userId,
        },
      }),
    ]);
    const lastPage = Math.ceil(total / limit);
    return {
      data: ebooks,
      page,
      limit: finalLimit,
      maxPerPage: constants.max_items_per_page,
      hasNextPage: lastPage > page,
      hasPrevPage: page > 1,
    };
  }
  public async findOne(id: number, userid: number) {
    const [User, CachedBook] = await Promise.all([
      this.prisma.user.findFirst({
        where: {
          id: userid,
        },
      }),
      this.cache.get(`Ebook${id}`) as Promise<Ebook>,
    ]);

    if (!User) {
      throw new ForbiddenException('Usuário não encontrado');
    }
    if (CachedBook) {
      try {
        if (CachedBook?.authorId != userid) {
          await this.prisma.ebook.update({
            where: {
              id,
            },
            data: {
              views: {
                increment: 1,
              },
            },
          });
        }
        return {
          data: CachedBook,
        };
      } catch (error) {
        await this.cache.delete(`Ebook${id}`);
        throw new ConflictException('Livro não encontrado');
      }
    } else {
      try {
        const ebook = await this.prisma.ebook.findFirst({
          where: {
            id,
          },
        });
        if (ebook) {
          if (ebook.authorId != userid) {
            await this.prisma.ebook.update({
              where: {
                id,
              },
              data: {
                views: {
                  increment: 1,
                },
              },
            });
          }
          await this.cache.set(`Ebook${id}`, ebook);
          return {
            data: ebook,
          };
        }
        throw new NotFoundException('Ebook não encontrado');
      } catch (error) {
        await this.cache.delete(`Ebook${id}`);
        throw new ConflictException('Livro não encontrado');
      }
    }
  }

  async update(id: number, data: UpdateEbookDto, userId: number) {
    try {
      const [updated] = await this.prisma.$transaction([
        this.prisma.ebook.update({
          data: {
            ...data,
            oldProce: data.currentPrice,
          },
          where: {
            id,
            authorId: userId,
          },
        }),
      ]);

      await this.cache.set(`Ebook${id}`, updated);
      return {
        sucess: true,
        data: updated,
      };
    } catch (error) {
      throw new ConflictException('Erro ao actualizar os dados');
    }
  }
  async remove(id: number, userId: number) {
    try {
      const [deleted] = await this.prisma.$transaction([
        this.prisma.ebook.delete({
          where: {
            authorId: userId,
            id,
          },
        }),
        this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            totalBooks: {
              decrement: 1,
            },
          },
        }),
        this.prisma.notification.create({
          data: {
            userId,
            title: 'Remoção de ebook',
            message: 'Um dos seus livros foi removido',
            deepLink: process.env.BOOK,
          },
        }),
      ]);
      return {
        sucess: true,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao eliminar o livro');
    }
  }
}
