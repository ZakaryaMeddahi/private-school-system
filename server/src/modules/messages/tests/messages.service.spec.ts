import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatsService } from 'src/modules/chats/chats.service';
import { UsersService } from 'src/modules/users/users.service';
import { Message } from 'src/shared/entities/message.entity';
import {
  createMockRepository,
  makeChat,
  makeMessage,
  makeUser,
  MockRepository,
  useFrozenClock,
} from 'src/shared/testing';
import { Equal } from 'typeorm';
import { MessagesService } from '../messages.service';

describe('MessagesService', () => {
  let service: MessagesService;
  let repository: MockRepository<Message>;
  let chatsService: { findByRoomId: jest.Mock };
  let usersService: { findOne: jest.Mock };

  // `update()` stamps `updatedAt: new Date()` itself.
  useFrozenClock();

  beforeEach(async () => {
    repository = createMockRepository<Message>();
    chatsService = { findByRoomId: jest.fn() };
    usersService = { findOne: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: getRepositoryToken(Message), useValue: repository },
        { provide: ChatsService, useValue: chatsService },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    service = module.get(MessagesService);
  });

  describe('findByChatId', () => {
    it('should return the messages of the chat', async () => {
      const messages = [makeMessage()];
      repository.find.mockResolvedValue(messages);

      await expect(
        service.findByChatId({ courseId: 1, chatId: 2 }),
      ).resolves.toEqual(messages);
    });

    // Chronological order is what makes a transcript readable, so it is part of
    // the contract rather than an implementation detail.
    it('should return them oldest first', async () => {
      repository.find.mockResolvedValue([]);

      await service.findByChatId({ courseId: 1, chatId: 2 });

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({ order: { sentAt: 'ASC' } }),
      );
    });

    it('should return an empty list when the chat has no messages', async () => {
      repository.find.mockResolvedValue([]);

      await expect(
        service.findByChatId({ courseId: 1, chatId: 2 }),
      ).resolves.toEqual([]);
    });
  });

  describe('findByRoomId', () => {
    it('should return the messages of the room', async () => {
      const messages = [makeMessage()];
      repository.find.mockResolvedValue(messages);

      await expect(
        service.findByRoomId({ courseId: 1, roomId: 3 }),
      ).resolves.toEqual(messages);
    });

    it('should return them oldest first', async () => {
      repository.find.mockResolvedValue([]);

      await service.findByRoomId({ courseId: 1, roomId: 3 });

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({ order: { sentAt: 'ASC' } }),
      );
    });

    it('should return an empty list when the room has no messages', async () => {
      repository.find.mockResolvedValue([]);

      await expect(
        service.findByRoomId({ courseId: 1, chatId: 2 }),
      ).resolves.toEqual([]);
    });
  });

  describe('createByChatId', () => {
    it('should return the saved message', async () => {
      const message = makeMessage();
      usersService.findOne.mockResolvedValue(makeUser());
      repository.create.mockReturnValue(message);
      repository.save.mockResolvedValue(message);

      await expect(
        service.createByChatId(1, 2, { content: 'Hello', file: null }),
      ).resolves.toEqual(message);
    });

    it('should record the sender resolved from the user id', async () => {
      const sender = makeUser({ id: 7 });
      usersService.findOne.mockResolvedValue(sender);
      repository.create.mockReturnValue(makeMessage());
      repository.save.mockResolvedValue(makeMessage());

      await service.createByChatId(7, 2, { content: 'Hello', file: null });

      expect(usersService.findOne).toHaveBeenCalledWith(7);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ sender, chat: { id: 2 }, content: 'Hello' }),
      );
    });

    it('should default the attachment to null when none is given', async () => {
      usersService.findOne.mockResolvedValue(makeUser());
      repository.create.mockReturnValue(makeMessage());
      repository.save.mockResolvedValue(makeMessage());

      await service.createByChatId(1, 2, { content: 'Hello', file: null });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ file: null }),
      );
    });
  });

  describe('createByRoomId', () => {
    it('should return the saved message', async () => {
      const message = makeMessage();
      chatsService.findByRoomId.mockResolvedValue(makeChat());
      repository.create.mockReturnValue(message);
      repository.save.mockResolvedValue(message);

      await expect(
        service.createByRoomId(1, 3, { content: 'Hello', file: null }),
      ).resolves.toEqual(message);
    });

    it('should post the message into the chat that belongs to the room', async () => {
      chatsService.findByRoomId.mockResolvedValue(makeChat({ id: 9 }));
      repository.create.mockReturnValue(makeMessage());
      repository.save.mockResolvedValue(makeMessage());

      await service.createByRoomId(1, 3, { content: 'Hello', file: null });

      expect(chatsService.findByRoomId).toHaveBeenCalledWith(3);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ chat: { id: 9 } }),
      );
    });

    it('should throw when the room has no chat', async () => {
      chatsService.findByRoomId.mockResolvedValue(null);

      await expect(
        service.createByRoomId(1, 999, { content: 'Hello', file: null }),
      ).rejects.toThrow('Cannot find chat');
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should return the updated message', async () => {
      const message = makeMessage();
      repository.findOne.mockResolvedValue(message);
      repository.save.mockResolvedValue(message);

      await expect(
        service.update(1, message.id, { content: 'Edited', isPinned: false }),
      ).resolves.toEqual(message);
    });

    it('should keep the previous content when none is supplied', async () => {
      const message = makeMessage({ content: 'Original' });
      repository.findOne.mockResolvedValue(message);
      repository.save.mockResolvedValue(message);

      await service.update(1, message.id, { isPinned: true });

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ content: 'Original', isPinned: true }),
      );
    });

    it('should throw when the message does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update(1, 999, { content: 'Edited' }),
      ).rejects.toThrow('Cannot find message');
      expect(repository.save).not.toHaveBeenCalled();
    });

    // TODO: `userId` is accepted but never used, so any authenticated user can
    // edit anyone's message. `remove()` below scopes its lookup by sender —
    // `update()` should do the same.
    it.todo('should refuse to update a message the user did not send');
  });

  describe('remove', () => {
    it('should delete the message', async () => {
      const message = makeMessage();
      repository.findOne.mockResolvedValue(message);

      await service.remove(1, message.id);

      expect(repository.remove).toHaveBeenCalledWith(message);
    });

    // Scoping the lookup by sender is what stops one user deleting another's
    // message, so it is behaviour worth asserting.
    it('should only look for a message sent by the requesting user', async () => {
      repository.findOne.mockResolvedValue(makeMessage());

      await service.remove(7, 5);

      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            sender: { id: Equal(7) },
          }),
        }),
      );
    });

    it('should throw when the message does not exist or belongs to someone else', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(1, 999)).rejects.toThrow(
        'Cannot find message',
      );
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
