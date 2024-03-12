import { Difficulty, DurationUnit } from 'src/shared/enums';

export class createCourseDto {
  title: string;
  description: string;
  price: number;
  language: string;
  difficulty: Difficulty;
  enrollmentLimit: number;
  duration: number;
  durationUnit: DurationUnit;
  topics: [];
}
