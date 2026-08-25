/**
 * The single instant every factory and frozen-clock test shares.
 *
 * Having one constant means a fixture built at module scope and a `new Date()`
 * created inside a service during the test compare equal.
 */
export const FROZEN_NOW = new Date('2026-01-01T12:00:00.000Z');

/**
 * Freezes the clock for the surrounding `describe`, and restores it afterwards.
 *
 * Only needed for services that call `new Date()` themselves. Two independent
 * `new Date()` calls land milliseconds apart, so a deep-equality assertion
 * against a fixture is otherwise a coin flip.
 *
 * ```ts
 * describe('UsersService', () => {
 *   useFrozenClock();
 *   ...
 * });
 * ```
 *
 * TODO: once `createdAt`/`updatedAt` move to `@CreateDateColumn` /
 * `@UpdateDateColumn`, the services stop setting timestamps by hand and most
 * callers of this helper can drop it.
 */
export const useFrozenClock = (now: Date = FROZEN_NOW): void => {
  beforeEach(() => {
    jest.useFakeTimers({ now });
  });

  afterEach(() => {
    jest.useRealTimers();
  });
};
