import { Enrollment } from '../../entities/enrollment.entity';
import { EnrollmentStatus } from '../../enums';
import { FROZEN_NOW } from '../frozen-clock';
import { makeStudent } from './student.factory';

export const makeEnrollment = (
  overrides: Partial<Enrollment> = {},
): Enrollment => ({
  id: 1,
  enrollmentStatus: EnrollmentStatus.PENDING,
  progress: 0,
  enrollmentDate: FROZEN_NOW,
  student: makeStudent(),
  course: null,
  ...overrides,
});
