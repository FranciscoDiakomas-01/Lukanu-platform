import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  private readonly logger = new Logger('DatabaseService');

  constructor() {
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({
      connectionString,
    });
    super({
      adapter,
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

