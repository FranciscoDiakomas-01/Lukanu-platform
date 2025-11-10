import { Module } from '@nestjs/common';
import TaskService from './task.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [TaskService],
  imports: [ScheduleModule.forRoot({})],
})
export default class TaskModule {}
