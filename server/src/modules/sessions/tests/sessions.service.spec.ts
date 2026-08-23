import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Session } from 'src/shared/entities/session.entity';
import {
  createMockRepository,
  makeSession,
  MockRepository,
} from 'src/shared/testing';
import { SessionsService } from '../sessions.service';

describe('SessionsService', () => {
  let service: SessionsService;
  let repository: MockRepository<Session>;

  beforeEach(async () => {
    repository = createMockRepository<Session>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        { provide: getRepositoryToken(Session), useValue: repository },
      ],
    }).compile();

    service = module.get(SessionsService);
  });

  describe('findRecentSession', () => {
    it('should return the session for the room', async () => {
      const session = makeSession();
      repository.findOne.mockResolvedValue(session);

      await expect(service.findRecentSession(1)).resolves.toEqual(session);
    });

    // The ordering *is* the behaviour here — without it the method is just
    // "find a session", not "find the recent one".
    it('should pick the most recently started session', async () => {
      repository.findOne.mockResolvedValue(makeSession());

      await service.findRecentSession(1);

      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ order: { startTime: 'DESC' } }),
      );
    });

    // TODO: returns whatever the repository gives back, so a room with no
    // sessions resolves `null` silently. Callers cannot tell that apart from
    // a failure.
    it('should return null when the room has no sessions', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findRecentSession(999)).resolves.toBeNull();
    });
  });

  describe('create', () => {
    it('should return the saved session', async () => {
      const session = makeSession();
      repository.create.mockReturnValue(session);
      repository.save.mockResolvedValue(session);

      await expect(
        service.create({ agoraChannel: 'agora-channel', agoraToken: null }, 1),
      ).resolves.toEqual(session);
    });

    it('should attach the session to the given room', async () => {
      repository.create.mockReturnValue(makeSession());
      repository.save.mockResolvedValue(makeSession());

      await service.create(
        { agoraChannel: 'agora-channel', agoraToken: null },
        42,
      );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ room: { id: 42 } }),
      );
    });
  });

  describe('update', () => {
    it('should return the updated session', async () => {
      const existing = makeSession();
      const updated = makeSession({
        endTime: new Date('2026-02-01T00:00:00Z'),
      });
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(updated);

      await expect(
        service.update(existing.id, { endTime: updated.endTime }),
      ).resolves.toEqual(updated);
    });

    it('should apply the changes on top of the existing session', async () => {
      const existing = makeSession();
      const endTime = new Date('2026-02-01T00:00:00Z');
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(makeSession({ endTime }));

      await service.update(existing.id, { endTime });

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: existing.id, endTime }),
      );
    });

    it('should throw when the session does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, { endTime: new Date() }),
      ).rejects.toThrow('Session not found');
      expect(repository.save).not.toHaveBeenCalled();
    });
  });
});
