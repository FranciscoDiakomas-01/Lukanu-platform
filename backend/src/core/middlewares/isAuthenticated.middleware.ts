import {
  BadRequestException,
  ForbiddenException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { NextFunction, Request, Response } from 'express';

export default class AuthMiddleware implements NestMiddleware {
  private readonly jwt = new JwtService({ secret: process.env.JWT_SECRET });
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] as string;

    if (!authHeader) {
      throw new ForbiddenException({
        message: 'authorization',
        describe: 'Informe o header authorization BEARER TOKEN',
      });
    }

    const [_, token] = authHeader?.split(' ');
    if (req.method == 'PATCH' && req.originalUrl == '/auth/refresh') {
      const [decoded] = await Promise.all([
        this.jwt.decode(token) as { sub: string },
      ]);
      req.headers['sub'] = decoded?.sub;
      next();
      return;
    }
    if (!token) {
      throw new UnauthorizedException('Token não enviado');
    }
    try {
      const [decoded, verifyed] = await Promise.all([
        this.jwt.decode(token) as { sub: string },
        this.jwt.verifyAsync(token),
      ]);
      if (verifyed && decoded?.sub) {
        req.headers['sub'] = decoded?.sub;
        next();
        return;
      } else {
        throw new UnauthorizedException('Token inválido ou expirado');
      }
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
