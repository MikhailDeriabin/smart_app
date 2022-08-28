import { Test, TestingModule } from '@nestjs/testing';
import { SensorValueService } from './sensor-value.service';

describe('SensorValueService', () => {
  let service: SensorValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorValueService],
    }).compile();

    service = module.get<SensorValueService>(SensorValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
