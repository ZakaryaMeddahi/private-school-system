import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Difficulty, DurationUnit } from 'src/shared/enums';

export class createCourseDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsEnum(Difficulty, { message: 'Invalid difficulty Level' })
  difficulty: Difficulty;

  @IsNumber()
  enrollmentsLimit: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsEnum(DurationUnit, { message: 'Invalid duration unit' })
  durationUnit: DurationUnit;

  topics: [];
}
