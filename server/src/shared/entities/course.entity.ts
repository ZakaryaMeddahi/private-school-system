import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Difficulty, DurationUnit } from '../enums';
import { Topic } from './topic.entity';
import { Enrollment } from './enrollment.entity';
import { Room } from './room.entity';
import { Teacher } from './teacher.entity';
import { File } from './file.entity';
import { Chat } from './chat.entity';

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  language: string;

  @Column()
  difficulty: Difficulty;

  // @Column()
  // enrollmentsLimit: number;

  @Column()
  duration: number;

  @Column()
  durationUnit: DurationUnit;

  @Column({ nullable: true })
  requirements: string;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses, { onDelete: 'CASCADE' })
  teacher: Teacher;

  @OneToMany(() => Topic, (topic) => topic.course, { cascade: true })
  topics: Topic[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Room, (room) => room.course)
  rooms: Room[];

  @OneToOne(() => Chat)
  @JoinColumn()
  chat: Chat;

  @OneToOne(() => File)
  @JoinColumn()
  file: File;
}
