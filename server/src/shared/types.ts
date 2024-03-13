import { Topic } from './entities/topic.entity';
import { Difficulty, DurationUnit } from './enums';

export type LoginUserParams = {
  email: string;
  password: string;
};

export type RegisterUserParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type CreateUserParams = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type CreateCourseParams = {
  title: string;
  description: string;
  price: number;
  language: string;
  difficulty: Difficulty;
  enrollmentLimit: number;
  duration: number;
  durationUnit: DurationUnit;
  topics: Topic[];
};

export type UpdateCourseParams = {
  title?: string;
  description?: string;
  price?: number;
  language?: string;
  difficulty?: Difficulty;
  enrollmentLimit?: number;
  duration?: number;
  durationUnit?: DurationUnit;
  topics?: Topic[];
};

export type CreateTopicParams = {
  title: string;
  startTime: Date;
};

export type UpdateTopicParams = {
  id?: number;
  title?: string;
  startTime?: Date;
  isDeleted?: boolean;
};

export type CreateChatParams = {
  name: string;
};

export type UpdateChatParams = {
  name?: string;
};

export type MessagesOptions = {
  courseId: number;
  chatId?: number;
  roomId?: number;
  page?: number;
  pageSize?: number;
};
