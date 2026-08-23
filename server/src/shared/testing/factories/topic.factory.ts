import { Topic } from '../../entities/topic.entity';

export const makeTopic = (overrides: Partial<Topic> = {}): Topic => ({
  id: 1,
  title: 'Introduction to TypeScript',
  course: null,
  ...overrides,
});
