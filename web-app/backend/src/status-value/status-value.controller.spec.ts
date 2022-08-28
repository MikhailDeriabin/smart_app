import { Test, TestingModule } from '@nestjs/testing';
import { StatusValueController } from './status-value.controller';

describe('StatusValueController', () => {
  let controller: StatusValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusValueController],
    }).compile();

    controller = module.get<StatusValueController>(StatusValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
