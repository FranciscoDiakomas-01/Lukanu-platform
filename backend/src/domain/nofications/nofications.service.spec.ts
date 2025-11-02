import { Test, TestingModule } from '@nestjs/testing';
import { NoficationsService } from './nofications.service';

describe('NoficationsService', () => {
  let service: NoficationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoficationsService],
    }).compile();

    service = module.get<NoficationsService>(NoficationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
