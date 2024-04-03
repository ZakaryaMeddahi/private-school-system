import { Test, TestingModule } from '@nestjs/testing';
import { ObjectStorageService } from '../object-storage.service';

describe('ObjectStorageService', () => {
  let service: ObjectStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjectStorageService],
    }).compile();

    service = module.get<ObjectStorageService>(ObjectStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
