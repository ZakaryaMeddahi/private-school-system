import { Test, TestingModule } from '@nestjs/testing';
import { StudentSessionsService } from '../student-sessions.service';

describe('StudentSessionsService', () => {
  let service: StudentSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentSessionsService],
    }).compile();

    service = module.get<StudentSessionsService>(StudentSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
