import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentSession } from './studentSession.entity';
import { Room } from './room.entity';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  agoraChannel: string;

  @Column({nullable: true})
  agoraToken: string;

  // @Column({ default: null })
  // recordedUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date;

  @Column({ type: 'timestamp', default: null })
  endTime: Date;

  @ManyToOne(() => Room, (room) => room.sessions)
  room: Room;

  @OneToMany(() => StudentSession, (studentSession) => studentSession.session)
  studentSessions: StudentSession[];
}
