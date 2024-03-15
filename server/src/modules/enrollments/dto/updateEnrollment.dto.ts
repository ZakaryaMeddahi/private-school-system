import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollmentDto } from './createEnrollment.dto';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {}
