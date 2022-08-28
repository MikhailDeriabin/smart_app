import { Test, TestingModule } from '@nestjs/testing';
import { SensorValueController } from './sensor-value.controller';

describe('SensorValueController', () => {
  let controller: SensorValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorValueController],
    }).compile();

    controller = module.get<SensorValueController>(SensorValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
