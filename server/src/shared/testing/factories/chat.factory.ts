import { Chat } from '../../entities/chat.entity';
import { FROZEN_NOW } from '../frozen-clock';

export const makeChat = (overrides: Partial<Chat> = {}): Chat => ({
  id: 1,
  name: 'General',
  createdAt: FROZEN_NOW,
  updatedAt: FROZEN_NOW,
  course: null,
  room: null,
  messages: [],
  ...overrides,
});
