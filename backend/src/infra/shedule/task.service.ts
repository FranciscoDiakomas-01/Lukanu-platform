import BcryptService from '@core/services/bcrypt/bcrypt.service';
import PrismaService from '@infra/database/prisma.service';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export default class TaskService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcript: BcryptService,
  ) {}
  private readonly logger = new Logger(TaskService.name);
  async onModuleInit() {
    const hasAdim = await this.prisma.user.findFirst({
      where: {
        role: 'ADMIN',
      },
    });

    if (hasAdim) {
      this.logger.debug('Admin already exist');
      return;
    }

    this.logger.verbose('Admin not found , creating ...');
    const password = await this.bcript.hash(
      process.env.ADMIN_PASSWORD as string,
    );

    await this.prisma.user.create({
      data: {
        lastName: 'Corp',
        firstName: 'Lukanu',
        email: process.env.ADMIN_EMAIl ?? 'lukanu@gmail.com',
        password,
        profileUrl: 'https://shadcnui.com',
        role: 'ADMIN',
      },
    });
    this.logger.verbose('Admin created');
  }
}
