import { Test, TestingModule } from '@nestjs/testing';
import { WithdralService } from './withdral.service';

describe('WithdralService', () => {
  let service: WithdralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WithdralService],
    }).compile();

    service = module.get<WithdralService>(WithdralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
