import { Test, TestingModule } from '@nestjs/testing';
import { NoficationsController } from './nofications.controller';
import { NoficationsService } from './nofications.service';

describe('NoficationsController', () => {
  let controller: NoficationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoficationsController],
      providers: [NoficationsService],
    }).compile();

    controller = module.get<NoficationsController>(NoficationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
