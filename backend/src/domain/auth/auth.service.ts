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
      this.jwt.signAsync({
        sub: userProfile.id,
      }),
      this.jwt.signAsync({
        sub: userProfile.id,
        role: userProfile.role,
      }),
    ]);
    if (!isCorrectPassword) {
      throw new ForbiddenException('Senha errada');
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
    ]);

    throw new HttpException(
      {
        ...userProfile,
        message: 'Logado com sucesso',
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
        this.jwt.signAsync({
          sub: newUser.id,
        }),
        this.jwt.signAsync({
          sub: newUser.id,
          role: newUser.role,
          createdAt: new Date(),
        }),
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
      ]);
      throw new HttpException(
        {
          ...newUser,
          message: 'Logado com sucesso',
          acessToken,
        },
        HttpStatus.OK,
      );
    }

    throw new ConflictException('Email esta sendo usado por outro usuaário');
  }
}
