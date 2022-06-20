import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';

describe('ManufacturerController', () => {
  let controller: ManufacturerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturerController],
      providers: [ManufacturerService],
    }).compile();

    controller = module.get<ManufacturerController>(ManufacturerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
