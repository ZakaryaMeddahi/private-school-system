import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentsService } from 'src/modules/students/students.service';
import { StudentSession } from 'src/shared/entities/studentSession.entity';
import {
  createMockRepository,
  makeSession,
  makeStudent,
  makeStudentSession,
  MockRepository,
} from 'src/shared/testing';
import { StudentSessionsService } from '../student-sessions.service';

describe('StudentSessionsService', () => {
  let service: StudentSessionsService;
  let repository: MockRepository<StudentSession>;
  let studentsService: { findEntityByUserId: jest.Mock };

  beforeEach(async () => {
    repository = createMockRepository<StudentSession>();
    studentsService = { findEntityByUserId: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentSessionsService,
        { provide: getRepositoryToken(StudentSession), useValue: repository },
        { provide: StudentsService, useValue: studentsService },
      ],
    }).compile();

    service = module.get(StudentSessionsService);
  });

  describe('create', () => {
    it('should return the created student session', async () => {
      const studentSession = makeStudentSession();
      studentsService.findEntityByUserId.mockResolvedValue(makeStudent());
      repository.create.mockReturnValue(studentSession);
      repository.save.mockResolvedValue(studentSession);

      await expect(
        service.create(1, makeSession(), { joinDate: new Date() }),
      ).resolves.toEqual(studentSession);
    });

    it('should link the session to the student behind the user id', async () => {
      const student = makeStudent({ id: 7 });
      const session = makeSession();
      studentsService.findEntityByUserId.mockResolvedValue(student);
      repository.create.mockReturnValue(makeStudentSession());
      repository.save.mockResolvedValue(makeStudentSession());

      await service.create(42, session, { joinDate: new Date() });

      expect(studentsService.findEntityByUserId).toHaveBeenCalledWith(42);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ student: { id: 7 }, session }),
      );
    });

    it('should throw when the user has no student profile', async () => {
      studentsService.findEntityByUserId.mockResolvedValue(null);

      await expect(
        service.create(999, makeSession(), { joinDate: new Date() }),
      ).rejects.toThrow('Student not found');
      expect(repository.save).not.toHaveBeenCalled();
    });

    // TODO: `create()` returns the entity built by `repository.create(...)`,
    // not the one returned by `repository.save(...)`. Anything the database
    // assigns on insert — the generated `id` above all — is missing from the
    // returned object. Return the saved entity instead.
    it.todo('should return the persisted entity rather than the built one');
  });

  describe('update', () => {
    it('should return the updated student session', async () => {
      const existing = makeStudentSession();
      const leaveDate = new Date('2026-02-01T00:00:00Z');
      const updated = makeStudentSession({ leaveDate });
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(updated);

      await expect(service.update(existing.id, { leaveDate })).resolves.toEqual(
        updated,
      );
    });

    it('should apply the changes on top of the existing session', async () => {
      const existing = makeStudentSession();
      const leaveDate = new Date('2026-02-01T00:00:00Z');
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(makeStudentSession({ leaveDate }));

      await service.update(existing.id, { leaveDate });

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: existing.id, leaveDate }),
      );
    });

    it('should throw when the student session does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, { leaveDate: new Date() }),
      ).rejects.toThrow('Student session not found');
      expect(repository.save).not.toHaveBeenCalled();
    });

    // TODO: the lookup matches the single `id` argument against the student
    // session id OR the student id OR the session id, so an id of 3 can return
    // a completely unrelated row. The caller means one of those specifically —
    // split this into distinct methods or take a typed criteria object.
    it.todo('should not match an unrelated row via the student or session id');
  });
});
