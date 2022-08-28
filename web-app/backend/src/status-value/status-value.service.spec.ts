import { Test, TestingModule } from '@nestjs/testing';
import { StatusValueService } from './status-value.service';

describe('StatusValueService', () => {
  let service: StatusValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusValueService],
    }).compile();

    service = module.get<StatusValueService>(StatusValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
