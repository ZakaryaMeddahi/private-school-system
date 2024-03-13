import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { StudentSession } from './studentSessions.entity';
import { Enrollment } from './enrollment.entity';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  biography: string;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => StudentSession, (studentSession) => studentSession.student)
  joinedSessions: StudentSession[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
