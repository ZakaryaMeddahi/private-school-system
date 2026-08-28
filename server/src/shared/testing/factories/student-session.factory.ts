import { StudentSession } from '../../entities/studentSession.entity';
import { FROZEN_NOW } from '../frozen-clock';
import { makeStudent } from './student.factory';

export const makeStudentSession = (
  overrides: Partial<StudentSession> = {},
): StudentSession => ({
  id: 1,
  joinDate: FROZEN_NOW,
  leaveDate: null,
  student: makeStudent(),
  session: null,
  ...overrides,
});
