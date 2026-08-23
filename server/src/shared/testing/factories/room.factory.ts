import { Room } from '../../entities/room.entity';
import { RoomStatus } from '../../enums';
import { FROZEN_NOW } from '../frozen-clock';

export const makeRoom = (overrides: Partial<Room> = {}): Room => ({
  id: 1,
  name: 'Lesson 1',
  status: RoomStatus.OPEN,
  createdAt: FROZEN_NOW,
  updatedAt: FROZEN_NOW,
  course: null,
  sessions: [],
  ...overrides,
});
