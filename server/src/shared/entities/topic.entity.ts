import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Session } from './session.entity';
import { Course } from './course.entity';

@Entity({ name: 'topics' })
export class Topic {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // startTime: Date;

  // @OneToOne(() => Session)
  // @JoinColumn()
  // session: Session;

  @ManyToOne(() => Course, (course) => course.topics, { onDelete: 'CASCADE' })
  course: Course;
}
