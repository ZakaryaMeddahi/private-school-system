import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Difficulty, DurationUnit } from '../enums';
import { Topic } from './topic.entity';
import { Enrollment } from './enrollment.entity';
import { Room } from './room.entity';

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

  @Column()
  enrollmentLimit: number;

  @Column()
  duration: number;

  @Column()
  durationUnit: DurationUnit;

  @Column({ type: 'timestamp' })
  enrollmentDeadline: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Topic, (topic) => topic.course)
  topics: Topic[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Room, (room) => room.course)
  rooms: Room[];
}