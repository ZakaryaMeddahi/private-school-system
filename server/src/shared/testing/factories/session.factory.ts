import { Session } from '../../entities/session.entity';
import { FROZEN_NOW } from '../frozen-clock';

export const makeSession = (overrides: Partial<Session> = {}): Session => ({
  id: 1,
  agoraChannel: 'agora-channel',
  agoraToken: null,
  startTime: FROZEN_NOW,
  endTime: null,
  room: null,
  studentSessions: [],
  ...overrides,
});
