import { IsEnum, IsNumber } from 'class-validator';
import { EnrollmentStatus } from 'src/shared/enums';

export class CreateEnrollmentDto {
  @IsEnum(EnrollmentStatus, { message: 'Invalid enrollment status' })
  enrollmentStatus: EnrollmentStatus;

  @IsNumber()
  progress: number;

  enrollmentDate: Date;
}
