import constants from '@core/constants';
import CacheService from '@infra/cache/cahe.service';
import PrismaService from '@infra/database/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class NoficationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userid: number, page: number, limit: number) {
    page = page >= 1 ? page : 1;
    const finalLimit =
      limit > constants.max_items_per_page || limit <= 0
        ? constants.max_items_per_page
        : limit;

    const skip = (page - 1) * finalLimit;
    const [notifications, total, updatedUser] = await Promise.all([
      this.prisma.notification.findMany({
        where: {
          userId: userid,
        },
        take: finalLimit,
        skip,
        orderBy: {
          createdAt: 'asc',
        },
      }),
      this.prisma.notification.count({
        where: {
          userId: userid,
        },
      }),
      this.prisma.user.update({
        where: {
          id: userid,
        },
        data: {
          totalUnreadNotification: 0,
        },
      }),
    ]);
    const lastPage = Math.ceil(total / finalLimit);
    return {
      data: notifications,
      total,
      updatedUser,
      hasError: false,
      message: 'Notificações encontradas com sucesso',
      lastPage,
      page,
      limit: finalLimit,
      maxPerPage: constants.max_items_per_page,
      hasNextPage: lastPage > page,
      hasPrevPage: page > 1,
    };
  }
}
