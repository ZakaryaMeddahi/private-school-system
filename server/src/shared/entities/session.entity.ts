import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentSession } from './studentSessions.entity';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  agoraChannel: string;

  @Column()
  agoraToken: string;

  @Column({ default: null })
  recordedUrl: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  // @Column()
  // roomId: number;

  @OneToMany(() => StudentSession, (studentSession) => studentSession.session)
  studentSession: StudentSession[];
}
