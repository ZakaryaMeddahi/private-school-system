import { EnrollmentStatus } from 'src/shared/enums';

export class CreateEnrollmentDto {
  enrollmentStatus: EnrollmentStatus;
  progress: number;
  enrollmentDate: Date;
}
