import { Test, TestingModule } from '@nestjs/testing';
import { AfiliatesController } from './afiliates.controller';
import { AfiliatesService } from './afiliates.service';

describe('AfiliatesController', () => {
  let controller: AfiliatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfiliatesController],
      providers: [AfiliatesService],
    }).compile();

    controller = module.get<AfiliatesController>(AfiliatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
