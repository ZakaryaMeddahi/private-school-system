import { Test, TestingModule } from '@nestjs/testing';
import { SocialLinksService } from '../social-links.service';

describe('SocialLinksService', () => {
  let service: SocialLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialLinksService],
    }).compile();

    service = module.get<SocialLinksService>(SocialLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
