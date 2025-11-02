import { Test, TestingModule } from '@nestjs/testing';
import { QuizresponseService } from './quizresponse.service';

describe('QuizresponseService', () => {
  let service: QuizresponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizresponseService],
    }).compile();

    service = module.get<QuizresponseService>(QuizresponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
