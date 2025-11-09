import { Module } from '@nestjs/common';
import { AfiliatesService } from './afiliates.service';
import { AfiliatesController } from './afiliates.controller';

@Module({
  controllers: [AfiliatesController],
  providers: [AfiliatesService],
})
export class AfiliatesModule {}
