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
export * from './factories/chat.factory';
export * from './factories/enrollment.factory';
export * from './factories/file.factory';
export * from './factories/message.factory';
export * from './factories/room.factory';
export * from './factories/session.factory';
export * from './factories/social-links.factory';
export * from './factories/student.factory';
export * from './factories/student-session.factory';
export * from './factories/topic.factory';
export * from './factories/upload-result.factory';
export * from './factories/user.factory';
