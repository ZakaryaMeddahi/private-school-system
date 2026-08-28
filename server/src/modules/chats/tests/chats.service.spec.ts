import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Chat } from 'src/shared/entities/chat.entity';
import {
  createMockQueryBuilder,
  createMockRepository,
  makeChat,
  MockRepository,
  useFrozenClock,
} from 'src/shared/testing';
import { ChatsService } from '../chats.service';

describe('ChatsService', () => {
  let service: ChatsService;
  let repository: MockRepository<Chat>;

  // `update()` stamps `updatedAt: new Date()` itself.
  useFrozenClock();

  beforeEach(async () => {
    repository = createMockRepository<Chat>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        { provide: getRepositoryToken(Chat), useValue: repository },
      ],
    }).compile();

    service = module.get(ChatsService);
  });

  describe('findByCourseId', () => {
    it('should return the chats', async () => {
      const chats = [makeChat()];
      repository.find.mockResolvedValue(chats);

      await expect(service.findByCourseId()).resolves.toEqual(chats);
    });

    // TODO: despite its name this takes no course id and calls `find()` with no
    // filter, so it returns every chat in the database — identical to
    // `findAll()`. Either filter by course or delete the method.
    it.todo('should only return the chats belonging to the given course');
  });

  describe('findAll', () => {
    it('should return every chat', async () => {
      const chats = [makeChat({ id: 1 }), makeChat({ id: 2 })];
      repository.find.mockResolvedValue(chats);

      await expect(service.findAll()).resolves.toEqual(chats);
    });
  });

  describe('findOne', () => {
    it('should return the chat when it exists', async () => {
      const chat = makeChat();
      repository.createQueryBuilder.mockReturnValue(
        createMockQueryBuilder(chat) as never,
      );

      await expect(service.findOne(chat.id)).resolves.toEqual(chat);
    });

    it('should return null when the chat does not exist', async () => {
      repository.createQueryBuilder.mockReturnValue(
        createMockQueryBuilder(null) as never,
      );

      await expect(service.findOne(999)).resolves.toBeNull();
    });
  });

  describe('findByRoomId', () => {
    it('should return the chat attached to the room', async () => {
      const chat = makeChat();
      repository.findOne.mockResolvedValue(chat);

      await expect(service.findByRoomId(1)).resolves.toEqual(chat);
    });

    it('should return null when the room has no chat', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findByRoomId(999)).resolves.toBeNull();
    });
  });

  describe('createByCourseId', () => {
    it('should return the saved chat', async () => {
      const chat = makeChat();
      repository.create.mockReturnValue(chat);
      repository.save.mockResolvedValue(chat);

      await expect(
        service.createByCourseId(1, { name: 'General' }),
      ).resolves.toEqual(chat);
    });

    it('should attach the chat to the given course', async () => {
      repository.create.mockReturnValue(makeChat());
      repository.save.mockResolvedValue(makeChat());

      await service.createByCourseId(42, { name: 'General' });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ course: { id: 42 } }),
      );
    });

    // A foreign-key violation is the database telling us the course does not
    // exist; surfacing it as a 404 rather than a 500 is deliberate behaviour.
    it('should translate a foreign-key violation into a not-found error', async () => {
      repository.create.mockReturnValue(makeChat());
      repository.save.mockRejectedValue({ code: '23503' });

      await expect(
        service.createByCourseId(999, { name: 'General' }),
      ).rejects.toThrow('There is no course with the provided id 999');
    });
  });

  describe('createByRoomId', () => {
    it('should return the saved chat', async () => {
      const chat = makeChat();
      repository.create.mockReturnValue(chat);
      repository.save.mockResolvedValue(chat);

      await expect(
        service.createByRoomId(1, { name: 'Lesson 1' }),
      ).resolves.toEqual(chat);
    });

    it('should attach the chat to the given room', async () => {
      repository.create.mockReturnValue(makeChat());
      repository.save.mockResolvedValue(makeChat());

      await service.createByRoomId(42, { name: 'Lesson 1' });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ room: { id: 42 } }),
      );
    });
  });

  describe('update', () => {
    it('should return the updated chat', async () => {
      const existing = makeChat();
      const updated = makeChat({ name: 'Renamed' });
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(updated);

      await expect(
        service.update(existing.id, { name: 'Renamed' }),
      ).resolves.toEqual(updated);
    });

    it('should apply the changes on top of the existing chat', async () => {
      const existing = makeChat();
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(makeChat({ name: 'Renamed' }));

      await service.update(existing.id, { name: 'Renamed' });

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: existing.id, name: 'Renamed' }),
      );
    });

    // TODO: BUG — the guard reads `if (!chat) null;` and is missing its
    // `return`, so a missing chat falls through and `save({ ...undefined })`
    // INSERTS a brand new row instead of failing. This test pins the broken
    // behaviour; once the guard is fixed, replace it with the `it.todo` below.
    it('should currently create a new chat when the id does not exist', async () => {
      repository.findOne.mockResolvedValue(null);
      repository.save.mockResolvedValue(makeChat());

      await service.update(999, { name: 'Renamed' });

      expect(repository.save).toHaveBeenCalled();
    });

    it.todo('should throw when the chat does not exist');
  });
});
