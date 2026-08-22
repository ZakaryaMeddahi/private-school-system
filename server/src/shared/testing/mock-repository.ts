import { ObjectLiteral, Repository } from 'typeorm';

/**
 * A TypeORM repository whose methods are all jest mocks.
 *
 * Declared as a partial record so a spec only has to care about the methods
 * the service under test actually calls, while still getting mock typings
 * (`mockResolvedValue`, `toHaveBeenCalledWith`, ...) on every one of them.
 */
export type MockRepository<T extends ObjectLiteral = ObjectLiteral> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

/**
 * Builds a repository double covering every method used across the codebase.
 *
 * Declaring all of them up front matters: `jest.spyOn` can only replace a
 * property that already exists, so a missing key surfaces as
 * "Property `x` does not exist in the provided object" rather than a
 * useful failure.
 */
export const createMockRepository = <
  T extends ObjectLiteral = ObjectLiteral,
>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(),
});
