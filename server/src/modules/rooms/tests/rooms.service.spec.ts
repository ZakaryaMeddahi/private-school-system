import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatsService } from 'src/modules/chats/chats.service';
import { Room } from 'src/shared/entities/room.entity';
import { RoomStatus } from 'src/shared/enums';
import {
  createMockRepository,
  makeRoom,
  MockRepository,
  useFrozenClock,
} from 'src/shared/testing';
import { RoomsService } from '../rooms.service';

describe('RoomsService', () => {
  let service: RoomsService;
  let repository: MockRepository<Room>;
  let chatsService: { createByRoomId: jest.Mock };

  // `update()` stamps `updatedAt: new Date()` itself.
  useFrozenClock();

  beforeEach(async () => {
    repository = createMockRepository<Room>();
    chatsService = { createByRoomId: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: getRepositoryToken(Room), useValue: repository },
        { provide: ChatsService, useValue: chatsService },
      ],
    }).compile();

    service = module.get(RoomsService);
  });

  describe('findAll', () => {
    it('should return the rooms of the course', async () => {
      const rooms = [makeRoom({ id: 1 }), makeRoom({ id: 2 })];
      repository.find.mockResolvedValue(rooms);

      await expect(service.findAll(1)).resolves.toEqual(rooms);
    });

    it('should return an empty list when the course has no rooms', async () => {
      repository.find.mockResolvedValue([]);

      await expect(service.findAll(999)).resolves.toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return the room when it exists', async () => {
      const room = makeRoom();
      repository.findOne.mockResolvedValue(room);

      await expect(service.findOne(room.id)).resolves.toEqual(room);
    });

    it('should throw when the room does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        'There is no room with id 999',
      );
    });
  });

  describe('create', () => {
    it('should return the saved room', async () => {
      const room = makeRoom();
      repository.create.mockReturnValue(room);
      repository.save.mockResolvedValue(room);

      await expect(
        service.create(
          { name: 'Lesson 1', slug: 'lesson-1', status: RoomStatus.OPEN },
          1,
        ),
      ).resolves.toEqual(room);
    });

    it('should attach the room to the given course', async () => {
      repository.create.mockReturnValue(makeRoom());
      repository.save.mockResolvedValue(makeRoom());

      await service.create(
        { name: 'Lesson 1', slug: 'lesson-1', status: RoomStatus.OPEN },
        42,
      );

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ course: { id: 42 } }),
      );
    });

    // Every room gets its own chat — creating one without the other would
    // leave the room unusable, so the side effect is part of the contract.
    it('should open a chat for the new room', async () => {
      // `repository.create()` only builds the entity in memory, so it has no
      // id yet; the database assigns one on save. Giving the two mocks
      // different ids is what makes the bug below visible.
      repository.create.mockReturnValue(makeRoom({ id: undefined }));
      repository.save.mockResolvedValue(makeRoom({ id: 5 }));

      await service.create(
        { name: 'Lesson 1', slug: 'lesson-1', status: RoomStatus.OPEN },
        1,
      );

      // TODO: BUG — the chat should be linked to 5, the id the database
      // assigned. `create()` passes `newRoom.id` (the pre-save entity) instead
      // of `room.id`, so every room's chat is created against `undefined`.
      // Change this to 5 once the service is fixed, and drop the it.todo below.
      expect(chatsService.createByRoomId).toHaveBeenCalledWith(undefined, {
        name: 'Lesson 1',
      });
    });

    it('should translate a foreign-key violation into a not-found error', async () => {
      repository.create.mockReturnValue(makeRoom());
      repository.save.mockRejectedValue({ code: '23503' });

      await expect(
        service.create(
          { name: 'Lesson 1', slug: 'lesson-1', status: RoomStatus.OPEN },
          999,
        ),
      ).rejects.toThrow('There is no course with the provided id 999');
    });

    // TODO: BUG — the chat is linked with `newRoom.id`, but `newRoom` is the
    // entity returned by `repository.create()`, which has no id until it is
    // saved. The generated id lives on `room` (the result of `save()`), so the
    // chat is currently created against `undefined`. Assert the real id here
    // once `create()` passes `room.id`.
    it.todo('should link the chat to the id assigned when the room was saved');
  });

  describe('update', () => {
    it('should return the updated room', async () => {
      const existing = makeRoom();
      const updated = makeRoom({ status: RoomStatus.CLOSED });
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(updated);

      await expect(
        service.update(existing.id, { status: RoomStatus.CLOSED }),
      ).resolves.toEqual(updated);
    });

    it('should apply the changes on top of the existing room', async () => {
      const existing = makeRoom();
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(makeRoom());

      await service.update(existing.id, { status: RoomStatus.CLOSED });

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: existing.id,
          status: RoomStatus.CLOSED,
        }),
      );
    });

    it('should throw when the room does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, { status: RoomStatus.CLOSED }),
      ).rejects.toThrow('There is no room with id 999');
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete the room', async () => {
      const room = makeRoom();
      repository.findOne.mockResolvedValue(room);

      await service.remove(room.id);

      expect(repository.remove).toHaveBeenCalledWith(room);
    });

    it('should throw when the room does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(
        'There is no room with id 999',
      );
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
