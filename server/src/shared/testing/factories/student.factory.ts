import { Student } from '../../entities/student.entity';
import { makeUser } from './user.factory';

export const makeStudent = (overrides: Partial<Student> = {}): Student => ({
  id: 1,
  biography: null,
  profilePicture: null,
  user: makeUser(),
  joinedSessions: [],
  enrollments: [],
  ...overrides,
});
