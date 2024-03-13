import { createCourseDto } from "./createCourse.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCourseDto extends PartialType(createCourseDto) {}