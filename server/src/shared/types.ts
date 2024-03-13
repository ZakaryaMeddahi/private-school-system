import { Difficulty, DurationUnit } from "./enums";

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
  topics: []
}

export type UpdateCourseParams = {
  title?: string;
  description?: string;
  price?: number;
  language?: string;
  difficulty?: Difficulty;
  enrollmentLimit?: number;
  duration?: number;
  durationUnit?: DurationUnit;
  topics?: []
}