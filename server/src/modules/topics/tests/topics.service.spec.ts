import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Topic } from 'src/shared/entities/topic.entity';
import {
  createMockRepository,
  makeTopic,
  MockRepository,
} from 'src/shared/testing';
import { CreateTopicParams, UpdateTopicParams } from 'src/shared/types';
import { TopicsService } from '../topics.service';

describe('TopicsService', () => {
  let service: TopicsService;
  let repository: MockRepository<Topic>;

  beforeEach(async () => {
    repository = createMockRepository<Topic>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicsService,
        { provide: getRepositoryToken(Topic), useValue: repository },
      ],
    }).compile();

    service = module.get(TopicsService);
  });

  describe('findOne', () => {
    it('should return the topic when it exists', async () => {
      const topic = makeTopic();
      repository.findOne.mockResolvedValue(topic);

      await expect(service.findOne(topic.id)).resolves.toEqual(topic);
    });

    // TODO: this returns `null` rather than throwing `NotFoundException`, which
    // is inconsistent with the other services. Tighten to `.rejects.toThrow`
    // once it does.
    it('should return null when the topic does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).resolves.toBeNull();
    });
  });

  describe('createOne', () => {
    it('should return the saved topic', async () => {
      const topicData: CreateTopicParams = { title: 'Generics' };
      const savedTopic = makeTopic({ title: 'Generics' });
      repository.create.mockReturnValue(savedTopic);
      repository.save.mockResolvedValue(savedTopic);

      await expect(service.createOne(topicData)).resolves.toEqual(savedTopic);
    });
  });

  describe('createMany', () => {
    it('should return every saved topic', async () => {
      const topicsData: CreateTopicParams[] = [
        { title: 'Generics' },
        { title: 'Decorators' },
      ];
      const savedTopics = [
        makeTopic({ id: 1, title: 'Generics' }),
        makeTopic({ id: 2, title: 'Decorators' }),
      ];
      repository.create.mockReturnValue(savedTopics);
      repository.save.mockResolvedValue(savedTopics);

      await expect(service.createMany(topicsData)).resolves.toEqual(
        savedTopics,
      );
    });
  });

  describe('updateOne', () => {
    it('should return the updated topic', async () => {
      const existingTopic = makeTopic();
      const updatedTopic = makeTopic({ title: 'Updated title' });
      repository.findOne.mockResolvedValue(existingTopic);
      repository.save.mockResolvedValue(updatedTopic);

      await expect(
        service.updateOne(existingTopic.id, null, { title: 'Updated title' }),
      ).resolves.toEqual(updatedTopic);
    });

    it('should apply the changes on top of the existing topic', async () => {
      const existingTopic = makeTopic();
      repository.findOne.mockResolvedValue(existingTopic);
      repository.save.mockResolvedValue(makeTopic());

      await service.updateOne(existingTopic.id, null, { title: 'New title' });

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: existingTopic.id, title: 'New title' }),
      );
    });

    // TODO: returns `null` instead of throwing — see the note on `findOne`.
    it('should return null when the topic does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.updateOne(999, null, { title: 'New title' }),
      ).resolves.toBeNull();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('updateMany', () => {
    it('should update the topics that already exist', async () => {
      const topicsData: UpdateTopicParams[] = [{ id: 1, title: 'Updated' }];
      const updatedTopic = makeTopic({ title: 'Updated' });
      repository.findOne.mockResolvedValue(makeTopic());
      repository.save.mockResolvedValue(updatedTopic);

      await expect(service.updateMany(topicsData)).resolves.toEqual([
        updatedTopic,
      ]);
    });

    it('should create a topic when it does not exist yet', async () => {
      const topicsData: UpdateTopicParams[] = [{ id: 999, title: 'Brand new' }];
      const createdTopic = makeTopic({ id: 999, title: 'Brand new' });
      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(createdTopic);
      repository.save.mockResolvedValue(createdTopic);

      await expect(service.updateMany(topicsData)).resolves.toEqual([
        createdTopic,
      ]);
      expect(repository.create).toHaveBeenCalled();
    });

    it('should remove the topics flagged as deleted and omit them from the result', async () => {
      const topicsData: UpdateTopicParams[] = [{ id: 1, isDeleted: true }];
      const topic = makeTopic();
      repository.findOne.mockResolvedValue(topic);
      repository.remove.mockResolvedValue(topic);

      await expect(service.updateMany(topicsData)).resolves.toEqual([]);
      expect(repository.remove).toHaveBeenCalledWith(topic);
    });

    it('should throw when a topic flagged as deleted does not exist', async () => {
      const topicsData: UpdateTopicParams[] = [{ id: 999, isDeleted: true }];
      repository.findOne.mockResolvedValue(null);

      await expect(service.updateMany(topicsData)).rejects.toThrow(
        'There is no topic with the id 999',
      );
    });

    it('should not strip the id and isDeleted flag into the persisted topic', async () => {
      const topicsData: UpdateTopicParams[] = [
        { id: 999, title: 'Brand new', isDeleted: false },
      ];
      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(makeTopic());
      repository.save.mockResolvedValue(makeTopic());

      await service.updateMany(topicsData);

      expect(repository.create).toHaveBeenCalledWith({ title: 'Brand new' });
    });
  });

  describe('deleteOne', () => {
    it('should return the removed topic', async () => {
      const topic = makeTopic();
      repository.findOne.mockResolvedValue(topic);
      repository.remove.mockResolvedValue(topic);

      await expect(service.deleteOne(topic.id)).resolves.toEqual(topic);
      expect(repository.remove).toHaveBeenCalledWith(topic);
    });

    // TODO: returns `null` instead of throwing — see the note on `findOne`.
    it('should return null when the topic does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.deleteOne(999)).resolves.toBeNull();
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
