import { Test, TestingModule } from '@nestjs/testing';
import { DeviceGroupService } from './device-group.service';

describe('DeviceGroupService', () => {
  let service: DeviceGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceGroupService],
    }).compile();

    service = module.get<DeviceGroupService>(DeviceGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
