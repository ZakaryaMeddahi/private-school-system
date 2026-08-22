import { Admin } from '../../entities/admin.entity';
import { Role } from '../../enums';
import { makeUser } from './user.factory';

export const makeAdmin = (overrides: Partial<Admin> = {}): Admin => ({
  id: 1,
  user: makeUser({ role: Role.ADMIN }),
  ...overrides,
});
