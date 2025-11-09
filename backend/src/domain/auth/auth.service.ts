import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import PrismaService from '@infra/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import BcryptService from '@core/services/bcrypt/bcrypt.service';
import CacheService from '@infra/cache/cahe.service';
import { RefreshToken } from '@core/types';
import { SignInDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
    private readonly cache: CacheService,
  ) {}

  private readonly jwt = new JwtService({ secret: process.env.JWT_SECRET });

  private readonly oneMonthInSeconds = 30 * 24 * 60 * 60;

  public async login(data: LoginDto) {
    const userWithEmail = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!userWithEmail) {
      throw new NotFoundException('Account not found');
    }
    const { password, ...userProfile } = userWithEmail;
    const [isCorrectPassword, acessToken, refresToken] = await Promise.all([
      this.bcrypt.verify(data.password, password),
      this.jwt.signAsync(
        {
          sub: userProfile.id,
        },
        {
          expiresIn: '1d',
        },
      ),
      this.jwt.signAsync(
        {
          sub: userProfile.id,
          role: userProfile.role,
        },
        {
          expiresIn: '7d',
        },
      ),
    ]);
    if (!isCorrectPassword) {
      throw new ForbiddenException('Wrong password');
    }
    await Promise.all([
      this.cache.set(
        `refresh${userProfile.id}`,
        {
          acess: acessToken,
          refres: refresToken,
          createdAT: new Date(),
        },
        this.oneMonthInSeconds,
      ),
      this.cache.set(`userProfile${userProfile.id}`, userProfile, 500000),
      this.prisma.notification.create({
        data: {
          userId: userProfile.id,
          message: 'Bem vindo de volta á plataforma',
          title: 'Novo Login',
        },
      }),
      this.prisma.user.update({
        data: {
          totalUnreadNotification: {
            increment: 1,
          },
        },
        where: {
          id: userProfile.id,
        },
      }),
    ]);

    throw new HttpException(
      {
        ...userProfile,
        message: 'Logged sucessly',
        acessToken,
      },
      HttpStatus.OK,
    );
  }
  public async signIn(data: SignInDto) {
    const [isAnUser, hashedPassword] = await Promise.all([
      this.prisma.user.findFirst({
        where: {
          OR: [
            {
              email: data.email,
            },
            {
              phone: data.phone,
            },
          ],
        },
      }),
      this.bcrypt.hash(data.password),
    ]);

    if (!isAnUser) {
      const { password, ...newUser } = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
      const [acessToken, refresToken] = await Promise.all([
        this.jwt.signAsync(
          {
            sub: newUser.id,
          },
          {
            expiresIn: '1hr',
          },
        ),
        this.jwt.signAsync(
          {
            sub: newUser.id,
            role: newUser.role,
            createdAt: new Date(),
          },
          {
            expiresIn: '7d',
          },
        ),
      ]);
      await Promise.all([
        this.cache.set(
          `refresh${newUser.id}`,
          {
            acess: acessToken,
            refres: refresToken,
            createdAT: new Date(),
          },
          this.oneMonthInSeconds,
        ),
        this.cache.set(`userProfile${newUser.id}`, newUser, 500000),
        this.prisma.notification.create({
          data: {
            userId: newUser.id,
            message: 'Bem vindo  á plataforma',
            title: 'Boas vindas',
          },
        }),
        this.prisma.user.update({
          data: {
            totalUnreadNotification: {
              increment: 1,
            },
          },
          where: {
            id: newUser.id,
          },
        }),
      ]);
      throw new HttpException(
        {
          ...newUser,
          message: 'Logged sucessly',
          acessToken,
        },
        HttpStatus.OK,
      );
    }

    throw new ConflictException('This phone or email belong to another user');
  }
  public async logOut(userId: number) {
    await Promise.all([
      this.cache.delete(`acessToken${userId}`),
      this.cache.delete(`userProfile${userId}`),
    ]);
    return {
      message: 'If you are an user , your cache was cleaned',
    };
  }
  public async refresh(userId: number) {
    const refreshToken = await this.cache.get<{
      acess: string;
      refres: string;
    }>(`refresh${userId}`);
    if (refreshToken) {
      try {
        const [decodedRefreshToken, validate] = await Promise.all([
          this.jwt.decode<RefreshToken>(refreshToken.refres),
          this.jwt.verifyAsync(refreshToken?.refres),
        ]);
        console.log(decodedRefreshToken, validate);
        if (decodedRefreshToken?.sub) {
          const newAcessToken = await this.jwt.signAsync(
            {
              sub: decodedRefreshToken.sub,
            },
            {
              expiresIn: '1d',
            },
          );
          if (decodedRefreshToken?.sub != userId) {
            throw new ForbiddenException('Açção suspeita');
          }
          return {
            acessToken: newAcessToken,
            mustLogin: false,
          };
        }
      } catch (error) {
        throw new BadRequestException({
          message: error?.message ?? error?.cause,
          mustLogin: true,
        });
      }
    }
    throw new ForbiddenException({
      message: 'Refresh token expired or not found in cache',
      mustLogin: true,
    });
  }
}
