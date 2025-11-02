import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import PrismaService from '@infra/database/prisma.service';
import { isAnUser } from '@core/utils/utils';
import CacheService from '@infra/cache/cahe.service';
import { Wallet } from '@prisma/client';

@Injectable()
export class WalletsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {}

  public async create(data: CreateWalletDto, userId: number) {
    const isUser = await isAnUser(this.prisma, userId);
    if (!isUser) {
      throw new ForbiddenException('Account not found or desactived');
    }
    const hasAWallet = await this.prisma.wallet.findFirst({
      where: {
        iban: data.iban,
      },
    });

    if (hasAWallet) {
      throw new ConflictException('Iban already in use');
    }
    const [newWallet, userWallets] = await Promise.all([
      this.prisma.wallet.create({
        data: {
          ...data,
          userId,
        },
      }),
      this.prisma.wallet.findMany({
        where: {
          userId,
        },
      }),
    ]);
    const allUserWallets = [newWallet, ...userWallets];
    await Promise.all([
      this.cache.set(
        `userWallets${userId}`,
        JSON.stringify({
          wallets: allUserWallets,
        }),
      ),
      10000,
    ]);
    throw new HttpException(
      {
        message: 'Wallet created',
        data: allUserWallets,
      },
      HttpStatus.CREATED,
    );
  }
  public async findAll(userId: number) {
    const isUser = await isAnUser(this.prisma, userId);
    if (!isUser) {
      throw new ForbiddenException('Account not found or desactived');
    }
    const userCachedWallets = await this.cache.get(`userWallets${userId}`);
    if (userCachedWallets) {
      const data = JSON.parse(userCachedWallets) as { wallets: Wallet[] };
      return {
        data,
        message: 'Cached Data',
      };
    }
    const data = await this.prisma.wallet.findFirst({
      where: {
        userId,
      },
    });
    await Promise.all([
      this.cache.set(
        `userWallets${userId}`,
        JSON.stringify({
          wallets: data,
        }),
      ),
      10000,
    ]);
    return {
      data,
    };
  }
  public async update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }
  public async remove(walletId: number, userId: number) {
    const isUser = await isAnUser(this.prisma, userId);
    if (!isUser) {
      throw new ForbiddenException('Account not found or desactived');
    }
    try {
      const [wallets, deletedWallet] = await Promise.all([
        this.prisma.wallet.findMany({
          where: {
            userId,
          },
        }),
        this.prisma.wallet.delete({
          where: {
            userId,
            id: walletId,
          },
        }),
      ]);
      const filtredWallets = wallets.filter((item) => {
        return item?.id != walletId;
      });
      await Promise.all([
        this.cache.set(
          `userWallets${userId}`,
          JSON.stringify({
            wallets: filtredWallets,
          }),
        ),
        10000,
      ]);
      return {
        data: filtredWallets,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Wallet not found  Or wallet dont belong to this user',
      );
    }
  }
}
