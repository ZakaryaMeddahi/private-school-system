import { User } from '../../entities/user.entity';
import { Role } from '../../enums';
import { FROZEN_NOW } from '../frozen-clock';

/**
 * Builds a `User` with sensible defaults; override only what the test is about.
 *
 * ```ts
 * const admin = makeUser({ id: 2, role: Role.ADMIN });
 * ```
 *
 * Keeping the shape in one place is the point: adding a column to the entity
 * is a one-line change here instead of an edit in every spec.
 */
export const makeUser = (overrides: Partial<User> = {}): User => ({
  id: 1,
  email: 'zakarya@gmail.com',
  password: 'hashed_password',
  firstName: 'Zakarya',
  lastName: 'Meddahi',
  // TODO: `User.address` is typed `string` but its column is
  // `@Column({ nullable: true })`. Once the entity is corrected to
  // `string | null`, this default stops relying on `strictNullChecks: false`.
  address: null,
  role: Role.STUDENT,
  isActive: true,
  lastLogging: FROZEN_NOW,
  createdAt: FROZEN_NOW,
  updatedAt: FROZEN_NOW,
  messages: [],
  ...overrides,
});
