import { Test, TestingModule } from '@nestjs/testing';
import { SocialLinksController } from '../social-links.controller';

describe('SocialLinksController', () => {
  let controller: SocialLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialLinksController],
    }).compile();

    controller = module.get<SocialLinksController>(SocialLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
