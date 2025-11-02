import { Test, TestingModule } from '@nestjs/testing';
import { QuizresponseController } from './quizresponse.controller';
import { QuizresponseService } from './quizresponse.service';

describe('QuizresponseController', () => {
  let controller: QuizresponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizresponseController],
      providers: [QuizresponseService],
    }).compile();

    controller = module.get<QuizresponseController>(QuizresponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
