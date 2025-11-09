import constants from '@core/constants';
import CacheService from '@infra/cache/cahe.service';
import PrismaService from '@infra/database/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class NoficationsService {
  constructor(
    private readonly cache: CacheService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll(userid: number, page: number, limit: number) {
    const finalLimit =
      limit > constants.max_items_per_page || limit <= 0
        ? constants.max_items_per_page
        : limit;

    const skip = (page - 1) * finalLimit;
    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: {
          userId: userid,
        },
        take: finalLimit,
        skip,
      }),
      this.prisma.notification.count({
        where: {
          userId: userid,
        },
      }),
    ]);
    const lastPage = Math.ceil(total / limit);
    return {
      data: notifications,
      page,
      limit: finalLimit,
      maxPerPage: constants.max_items_per_page,
      hasNextPage: lastPage > page,
      hasPrevPage: page > 1,
    };
  }

  async update(userid: number) {
    try {
      await this.prisma.notification.updateMany({
        where: {
          userId: userid,
        },
        data: {
          read: true,
        },
      });
      return {
        sucess: true,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao actualizar as notificações');
    }
  }
}
