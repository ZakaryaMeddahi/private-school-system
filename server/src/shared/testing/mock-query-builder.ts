/** Methods that return the builder itself so calls can be chained. */
const CHAIN_METHODS = [
  'select',
  'addSelect',
  'where',
  'andWhere',
  'orWhere',
  'leftJoin',
  'leftJoinAndSelect',
  'innerJoin',
  'innerJoinAndSelect',
  'orderBy',
  'groupBy',
  'skip',
  'take',
  'limit',
  'offset',
] as const;

export type MockQueryBuilder = Record<string, jest.Mock>;

/**
 * Builds a chainable `SelectQueryBuilder` double.
 *
 * Every chain method returns `this`, so `.addSelect(...).where(...).getOne()`
 * flows exactly as it does against a real builder. The terminal methods
 * resolve `result`, which lets a spec assert the query *shape* (which columns,
 * which predicate, which bound parameters) without touching a database.
 *
 * Pass it to a repository double with a cast — a real
 * `SelectQueryBuilder<T>` has ~100 methods and satisfying all of them buys
 * nothing:
 *
 * ```ts
 * const qb = createMockQueryBuilder(user);
 * repository.createQueryBuilder.mockReturnValue(qb as never);
 * ```
 */
export const createMockQueryBuilder = (result?: unknown): MockQueryBuilder => {
  const queryBuilder: MockQueryBuilder = {};

  for (const method of CHAIN_METHODS) {
    queryBuilder[method] = jest.fn().mockReturnThis();
  }

  queryBuilder.getOne = jest.fn().mockResolvedValue(result ?? null);
  queryBuilder.getRawOne = jest.fn().mockResolvedValue(result ?? null);
  queryBuilder.getMany = jest.fn().mockResolvedValue(result ?? []);
  queryBuilder.getRawMany = jest.fn().mockResolvedValue(result ?? []);
  queryBuilder.getCount = jest.fn().mockResolvedValue(0);
  queryBuilder.execute = jest.fn().mockResolvedValue(result ?? null);

  return queryBuilder;
};
