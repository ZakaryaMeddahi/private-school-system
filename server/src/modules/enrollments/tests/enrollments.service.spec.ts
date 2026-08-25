import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailService } from 'src/modules/mail/mail.service';
import { StudentsService } from 'src/modules/students/students.service';
import { Enrollment } from 'src/shared/entities/enrollment.entity';
import { EnrollmentStatus } from 'src/shared/enums';
import {
  createMockQueryBuilder,
  createMockRepository,
  makeEnrollment,
  makeStudent,
  makeUser,
  MockRepository,
} from 'src/shared/testing';
import { Equal } from 'typeorm';
import { EnrollmentsService } from '../enrollments.service';

describe('EnrollmentsService', () => {
  let service: EnrollmentsService;
  let repository: MockRepository<Enrollment>;
  let studentsService: { findEntityByUserId: jest.Mock };
  let mailService: { sendEnrollmentStatus: jest.Mock };

  beforeEach(async () => {
    repository = createMockRepository<Enrollment>();
    studentsService = { findEntityByUserId: jest.fn() };
    mailService = { sendEnrollmentStatus: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentsService,
        { provide: getRepositoryToken(Enrollment), useValue: repository },
        { provide: StudentsService, useValue: studentsService },
        { provide: MailService, useValue: mailService },
      ],
    }).compile();

    service = module.get(EnrollmentsService);
  });

  describe('findOne', () => {
    it('should return the enrollment linking the user to the course', async () => {
      const enrollment = makeEnrollment();
      repository.findOne.mockResolvedValue(enrollment);

      await expect(service.findOne(1, 2)).resolves.toEqual(enrollment);
    });

    it('should return null when the user is not enrolled', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1, 999)).resolves.toBeNull();
    });
  });

  describe('isEnrolled', () => {
    it('should return true for an approved enrollment', async () => {
      repository.findOne.mockResolvedValue(
        makeEnrollment({ enrollmentStatus: EnrollmentStatus.APPROVED }),
      );

      await expect(service.isEnrolled(1, 2)).resolves.toBe(true);
    });

    it('should return false when there is no approved enrollment', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.isEnrolled(1, 2)).resolves.toBe(false);
    });

    // A pending or rejected enrollment must not grant access, so the status
    // filter is the whole point of this method.
    it('should only count enrollments that are approved', async () => {
      repository.findOne.mockResolvedValue(null);

      await service.isEnrolled(1, 2);

      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            enrollmentStatus: EnrollmentStatus.APPROVED,
          }),
        }),
      );
    });
  });

  describe('findAll', () => {
    it('should return the enrollments of the given user', async () => {
      const enrollments = [makeEnrollment()];
      repository.find.mockResolvedValue(enrollments);

      await expect(service.findAll(1)).resolves.toEqual(enrollments);
    });

    // Passing 0 is the caller's way of asking for every enrollment rather than
    // one user's, so the branch is behaviour rather than an implementation quirk.
    it('should return every enrollment when the user id is 0', async () => {
      repository.find.mockResolvedValue([]);

      await service.findAll(0);

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({ where: {} }),
      );
    });
  });

  describe('findByCourseId', () => {
    it('should return the enrollments of the course', async () => {
      const enrollments = [makeEnrollment()];
      repository.createQueryBuilder.mockReturnValue(
        createMockQueryBuilder(enrollments) as never,
      );

      await expect(service.findByCourseId(1)).resolves.toEqual(enrollments);
    });

    it('should return an empty list when the course has no enrollments', async () => {
      repository.createQueryBuilder.mockReturnValue(
        createMockQueryBuilder([]) as never,
      );

      await expect(service.findByCourseId(999)).resolves.toEqual([]);
    });
  });

  describe('getCourseMembers', () => {
    it('should return the students behind the approved enrollments', async () => {
      const student = makeStudent();
      repository.createQueryBuilder.mockReturnValue(
        createMockQueryBuilder([makeEnrollment({ student })]) as never,
      );

      await expect(service.getCourseMembers(1)).resolves.toEqual([student]);
    });

    it('should return an empty list when nobody is enrolled', async () => {
      repository.createQueryBuilder.mockReturnValue(
        createMockQueryBuilder([]) as never,
      );

      await expect(service.getCourseMembers(999)).resolves.toEqual([]);
    });
  });

  describe('create', () => {
    it('should return the new enrollment', async () => {
      const enrollment = makeEnrollment();
      studentsService.findEntityByUserId.mockResolvedValue(makeStudent());
      repository.create.mockReturnValue(enrollment);
      repository.save.mockResolvedValue(enrollment);

      await expect(service.create(1, 2, {})).resolves.toEqual(enrollment);
    });

    it('should link the enrollment to the student behind the user id', async () => {
      studentsService.findEntityByUserId.mockResolvedValue(
        makeStudent({ id: 7 }),
      );
      repository.create.mockReturnValue(makeEnrollment());
      repository.save.mockResolvedValue(makeEnrollment());

      await service.create(42, 3, {});

      expect(studentsService.findEntityByUserId).toHaveBeenCalledWith(42);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ course: { id: 3 }, student: { id: 7 } }),
      );
    });

    it('should translate a foreign-key violation into a not-found error', async () => {
      studentsService.findEntityByUserId.mockResolvedValue(makeStudent());
      repository.create.mockReturnValue(makeEnrollment());
      repository.save.mockRejectedValue({ code: '23503' });

      await expect(service.create(1, 999, {})).rejects.toThrow(
        'There is no course with the provided id 999',
      );
    });
  });

  describe('update', () => {
    const enrollmentWithRelations = () =>
      makeEnrollment({
        student: makeStudent({ user: makeUser() }),
        course: { id: 1, title: 'TypeScript' } as never,
      });

    it('should return the updated enrollment', async () => {
      const existing = enrollmentWithRelations();
      const updated = makeEnrollment({
        enrollmentStatus: EnrollmentStatus.APPROVED,
      });
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(updated);

      await expect(
        service.update(existing.id, {
          enrollmentStatus: EnrollmentStatus.APPROVED,
        }),
      ).resolves.toEqual(updated);
    });

    // Telling the student the decision is the point of approving or rejecting,
    // so the notification belongs in the contract.
    it('should notify the student when the enrollment is approved', async () => {
      const existing = enrollmentWithRelations();
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(
        makeEnrollment({ enrollmentStatus: EnrollmentStatus.APPROVED }),
      );

      await service.update(existing.id, {
        enrollmentStatus: EnrollmentStatus.APPROVED,
      });

      expect(mailService.sendEnrollmentStatus).toHaveBeenCalledWith(
        existing.student.user,
        EnrollmentStatus.APPROVED,
        existing.course,
        'Congratulation, you are enrolled!',
      );
    });

    it('should notify the student when the enrollment is rejected', async () => {
      const existing = enrollmentWithRelations();
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(
        makeEnrollment({ enrollmentStatus: EnrollmentStatus.REJECTED }),
      );

      await service.update(existing.id, {
        enrollmentStatus: EnrollmentStatus.REJECTED,
      });

      expect(mailService.sendEnrollmentStatus).toHaveBeenCalledWith(
        existing.student.user,
        EnrollmentStatus.REJECTED,
        existing.course,
        'Your enrollment has been rejected.',
      );
    });

    it('should throw when the enrollment does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, { enrollmentStatus: EnrollmentStatus.APPROVED }),
      ).rejects.toThrow('There is no enrollment with the id 999');
      expect(repository.save).not.toHaveBeenCalled();
    });

    // TODO: the save is committed before the email is sent, and a mailer
    // failure is caught and rethrown as a 500. The status change is already
    // persisted at that point, so the caller sees an error for an update that
    // actually succeeded.
    it.todo('should keep the status change when the notification fails');
  });

  describe('remove', () => {
    it('should delete the enrollment', async () => {
      const enrollment = makeEnrollment();
      repository.findOne.mockResolvedValue(enrollment);

      await service.remove(1, enrollment.id);

      expect(repository.delete).toHaveBeenCalledWith(enrollment.id);
    });

    // The lookup is scoped by user so nobody can cancel someone else's
    // enrollment by guessing an id.
    it('should only look for an enrollment owned by the requesting user', async () => {
      repository.findOne.mockResolvedValue(makeEnrollment());

      await service.remove(7, 5);

      expect(repository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            student: { user: { id: Equal(7) } },
          }),
        }),
      );
    });

    it('should throw when the enrollment does not exist or belongs to someone else', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(1, 999)).rejects.toThrow(
        'There is no enrollment with the id 999',
      );
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
