import { Test, TestingModule } from '@nestjs/testing';
import { HeightController } from './height.controller';

describe('HeightController', () => {
  let controller: HeightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeightController],
    }).compile();

    controller = module.get<HeightController>(HeightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
