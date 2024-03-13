import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Session } from './session.entity';

@Entity({ name: 'student_sessions' })
export class StudentSession {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinDate: Date;

  @Column({ type: 'timestamp' })
  leaveDate: Date;

  @ManyToOne(() => Student, (student) => student.joinedSessions)
  student: Student;

  @ManyToOne(() => Session, (session) => session.studentSession)
  session: Session;
}
