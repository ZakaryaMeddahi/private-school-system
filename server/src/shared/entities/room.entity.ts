import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { RoomStatus } from '../enums';
import { Session } from './session.entity';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  // @Column()
  // slug: string;

  @Column()
  status: RoomStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Course, (course) => course.rooms, { onDelete: 'CASCADE' })
  course: Course;

  @OneToMany(() => Session, (session) => session.room)
  sessions: Session[];
}
