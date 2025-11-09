import { Test, TestingModule } from '@nestjs/testing';
import { AfiliatesService } from './afiliates.service';

describe('AfiliatesService', () => {
  let service: AfiliatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfiliatesService],
    }).compile();

    service = module.get<AfiliatesService>(AfiliatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
