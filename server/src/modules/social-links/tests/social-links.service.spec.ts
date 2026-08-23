import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SocialLinks } from 'src/shared/entities/socialLinks.entity';
import {
  createMockRepository,
  makeSocialLinks,
  MockRepository,
} from 'src/shared/testing';
import { SocialLinksService } from '../social-links.service';

describe('SocialLinksService', () => {
  let service: SocialLinksService;
  let repository: MockRepository<SocialLinks>;

  beforeEach(async () => {
    repository = createMockRepository<SocialLinks>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialLinksService,
        { provide: getRepositoryToken(SocialLinks), useValue: repository },
      ],
    }).compile();

    service = module.get(SocialLinksService);
  });

  describe('findByUserId', () => {
    it('should return the social links belonging to the user', async () => {
      const socialLinks = makeSocialLinks();
      repository.findOne.mockResolvedValue(socialLinks);

      await expect(service.findByUserId(1)).resolves.toEqual(socialLinks);
    });

    it('should throw when the user has no social links', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findByUserId(999)).rejects.toThrow(
        'Social links not found',
      );
    });
  });

  describe('findOne', () => {
    it('should return the social links when they exist', async () => {
      const socialLinks = makeSocialLinks();
      repository.findOne.mockResolvedValue(socialLinks);

      await expect(service.findOne(socialLinks.id)).resolves.toEqual(
        socialLinks,
      );
    });

    it('should throw when the social links do not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        'Social links not found',
      );
    });
  });

  describe('create', () => {
    it('should return the saved social links', async () => {
      const socialLinks = makeSocialLinks();
      repository.create.mockReturnValue(socialLinks);
      repository.save.mockResolvedValue(socialLinks);

      await expect(
        service.create(1, { github: 'https://github.com/ZakaryaMeddahi' }),
      ).resolves.toEqual(socialLinks);
    });

    it('should attach the social links to the given user', async () => {
      repository.create.mockReturnValue(makeSocialLinks());
      repository.save.mockResolvedValue(makeSocialLinks());

      await service.create(42, { github: 'https://github.com/ZakaryaMeddahi' });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ user: { id: 42 } }),
      );
    });
  });

  describe('update', () => {
    it('should return the updated social links', async () => {
      const existing = makeSocialLinks();
      const updated = makeSocialLinks({ github: 'https://github.com/updated' });
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(updated);

      await expect(
        service.update(1, existing.id, {
          github: 'https://github.com/updated',
        }),
      ).resolves.toEqual(updated);
    });

    it('should keep the links attached to the requesting user', async () => {
      repository.findOne.mockResolvedValue(makeSocialLinks());
      repository.save.mockResolvedValue(makeSocialLinks());

      await service.update(42, 1, { github: 'https://github.com/updated' });

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ user: { id: 42 } }),
      );
    });

    it('should throw when the social links do not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(1, 999, { github: 'x' })).rejects.toThrow(
        'Social links not found',
      );
      expect(repository.save).not.toHaveBeenCalled();
    });
  });
});
