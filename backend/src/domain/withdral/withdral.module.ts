import { Module } from '@nestjs/common';
import { WithdralService } from './withdral.service';
import { WithdralController } from './withdral.controller';

@Module({
  controllers: [WithdralController],
  providers: [WithdralService],
})
export class WithdralModule {}
