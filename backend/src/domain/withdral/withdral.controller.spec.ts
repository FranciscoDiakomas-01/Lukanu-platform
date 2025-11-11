import { Test, TestingModule } from '@nestjs/testing';
import { WithdralController } from './withdral.controller';
import { WithdralService } from './withdral.service';

describe('WithdralController', () => {
  let controller: WithdralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WithdralController],
      providers: [WithdralService],
    }).compile();

    controller = module.get<WithdralController>(WithdralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
