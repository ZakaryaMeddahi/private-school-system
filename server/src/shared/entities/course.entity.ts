import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Difficulty, DurationUnit } from '../enums';

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
}
