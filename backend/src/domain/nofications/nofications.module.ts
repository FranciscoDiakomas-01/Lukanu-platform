import { Module } from '@nestjs/common';
import { NoficationsService } from './nofications.service';
import { NoficationsController } from './nofications.controller';

@Module({
  controllers: [NoficationsController],
  providers: [NoficationsService],
})
export class NoficationsModule {}
