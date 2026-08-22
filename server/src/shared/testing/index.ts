/**
 * Shared unit-test helpers.
 *
 * Test-only code: excluded from `tsconfig.build.json` so it never reaches
 * `dist/`, and from coverage collection.
 */
export * from './frozen-clock';
export * from './mock-query-builder';
export * from './mock-repository';
export * from './factories/admin.factory';
export * from './factories/student.factory';
export * from './factories/user.factory';
