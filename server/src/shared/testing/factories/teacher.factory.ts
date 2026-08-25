import { Teacher } from '../../entities/teacher.entity';
import { Role } from '../../enums';
import { makeUser } from './user.factory';

export const makeTeacher = (overrides: Partial<Teacher> = {}): Teacher => ({
  id: 1,
  biography: null,
  profilePicture: null,
  user: makeUser({ role: Role.TEACHER }),
  courses: [],
  ...overrides,
});
