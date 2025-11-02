import { Module } from '@nestjs/common';
import { QuizresponseService } from './quizresponse.service';
import { QuizresponseController } from './quizresponse.controller';

@Module({
  controllers: [QuizresponseController],
  providers: [QuizresponseService],
})
export class QuizresponseModule {}
