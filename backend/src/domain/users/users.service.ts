import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto, UpdateUserPassword } from './dto/update-user.dto';
import CacheService from '@infra/cache/cahe.service';
import PrismaService from '@infra/database/prisma.service';
import constants from '@core/constants';
import BcryptService from '@core/services/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly cache: CacheService,
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
  ) {}
  async findAll(page: number = 1, limit: number) {
    const finalLimit =
      limit > constants.max_items_per_page || limit <= 0
        ? constants.max_items_per_page
        : limit;

    const [total, users] = await Promise.all([
      this.prisma.user.count({
        where: {
          role: 'REGULAR',
        },
      }),
      this.prisma.user.findMany({
        where: {
          role: 'REGULAR',
        },
        omit: {
          password: true,
        },
        take: finalLimit,
        skip: (page - 1) * finalLimit,
      }),
    ]);
    const lastPage = Math.ceil(total / finalLimit);
    return {
      data: users,
      page,
      limit: finalLimit,
      maxPerPage: constants.max_items_per_page,
      hasNextPage: lastPage > page,
      hasPrevPage: page > 1,
    };
  }
  async findOne(id: number) {
    const cachedUser = await this.cache.get(`userProfile${id}`);
    if (cachedUser) {
      return {
        data: cachedUser,
      };
    }
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
    await this.cache.set(`userProfile${id}`, user, 500000);
    return {
      data: user,
    };
  }
  async update(id: number, data: UpdateUserDto) {
    try {
      const updatedProfile = await this.prisma.user.update({
        data,
        where: {
          id,
        },
        omit: {
          password: true,
        },
      });
      await this.cache.set(`userProfile${id}`, updatedProfile, 500000);
    } catch (error) {
      throw new BadRequestException('Erro ao actualizar o perfil');
    }
  }
  async updateCredential(id: number, data: UpdateUserPassword) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Conta não encontrada');
    }
    const [newPassword, isMyPasword] = await Promise.all([
      this.bcrypt.hash(data.newPassWord),
      this.bcrypt.compare(data.odlPassword, user.password),
    ]);
    if (isMyPasword) {
      await Promise.all([
        this.prisma.notification.create({
          data: {
            userId: id,
            message: 'Sua senha foi alterada',
            title: 'Redfinição de senha',
          },
        }),
        this.prisma.user.update({
          where: {
            id,
          },
          data: {
            password: newPassword,
            totalUnreadNotification: {
              increment: 1,
            },
          },
        }),
      ]);
      return {
        sucess: true,
      };
    }
    throw new ForbiddenException('Acesso negado');
  }
  async remove(id: number) {
    try {
      const [_, user] = await Promise.all([
        this.cache.delete(`userProfile${id}`),
        this.prisma.user.delete({
          where: {
            id,
          },
          omit: {
            password: true,
          },
        }),
      ]);

      return {
        sucess: true,
        user,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao eliminar');
    }
  }
}
