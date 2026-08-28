import { Course } from '../../entities/course.entity';
import { Difficulty, DurationUnit } from '../../enums';
import { FROZEN_NOW } from '../frozen-clock';
import { makeTeacher } from './teacher.factory';

export const makeCourse = (overrides: Partial<Course> = {}): Course => ({
  id: 1,
  title: 'Introduction to TypeScript',
  description: 'Learn TypeScript from the ground up.',
  price: 100,
  language: 'English',
  difficulty: Difficulty.Easy,
  duration: 6,
  durationUnit: DurationUnit.Week,
  requirements: null,
  deadline: null,
  createdAt: FROZEN_NOW,
  updatedAt: FROZEN_NOW,
  teacher: makeTeacher(),
  topics: [],
  enrollments: [],
  rooms: [],
  chat: null,
  file: null,
  ...overrides,
});
