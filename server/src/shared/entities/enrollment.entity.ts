import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Course } from './course.entity';
import { EnrollmentStatus } from '../enums';

@Entity({ name: 'enrollments' })
export class Enrollment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: EnrollmentStatus.PENDING })
  enrollmentStatus: EnrollmentStatus;

  @Column({ default: 0 })
  progress: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrollmentDate: Date;

  @ManyToOne(() => Student, (student) => student.enrollments, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments, {
    onDelete: 'SET NULL',
  })
  course: Course;
}
