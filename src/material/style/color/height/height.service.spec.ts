import { Test, TestingModule } from '@nestjs/testing';
import { HeightService } from './height.service';

describe('HeightService', () => {
  let service: HeightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeightService],
    }).compile();

    service = module.get<HeightService>(HeightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
