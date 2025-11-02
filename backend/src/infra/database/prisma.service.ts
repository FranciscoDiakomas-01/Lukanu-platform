import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  private readonly logger = new Logger('DatabaseService');
  constructor() {
    super({
      log: ['error', 'query', 'warn', 'info'],
    });
  }
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.debug('Database Desconected');
  }
  async onModuleInit() {
    await this.$connect();
    this.logger.debug('Database Connected');
  }
}
