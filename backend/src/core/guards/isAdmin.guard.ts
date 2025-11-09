import PrismaService from '@infra/database/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export default class isAdminGuard implements CanActivate {
  constructor(private readonly database: PrismaService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest() as Request;

    const userId = req.headers['sub'] as string;
    if (!userId) {
      throw new UnauthorizedException('Precisa ser admin');
    }
    try {
      const isAdmin = await this.database.user.findFirst({
        where: {
          id: +userId,
        },
      });
      if (!isAdmin) {
        throw new UnauthorizedException('Precisa ser admin');
      } else if (isAdmin && isAdmin.role != 'ADMIN') {
        throw new UnauthorizedException('Precisa ser admin');
      }
      return isAdmin.role == 'ADMIN';
    } catch (error) {
      throw new UnauthorizedException('Precisa ser admin');
    }
  }
}
