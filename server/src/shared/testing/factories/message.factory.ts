import { Message } from '../../entities/message.entity';
import { FROZEN_NOW } from '../frozen-clock';
import { makeUser } from './user.factory';

export const makeMessage = (overrides: Partial<Message> = {}): Message => ({
  id: 1,
  content: 'Hello everyone',
  isPinned: false,
  sentAt: FROZEN_NOW,
  updatedAt: FROZEN_NOW,
  sender: makeUser(),
  chat: null,
  file: null,
  ...overrides,
});
