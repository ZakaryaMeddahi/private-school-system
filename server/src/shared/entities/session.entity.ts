import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentSession } from './studentSession.entity';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date;

  @Column({ type: 'timestamp', default: null })
  endTime: Date;

  // @Column()
  // roomId: number;

  @OneToMany(() => StudentSession, (studentSession) => studentSession.session)
  studentSessions: StudentSession[];
}
