import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { Message } from './message.entity';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  type: string;

  @Column()
  format: string;

  @Column()
  size: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => Course, { onDelete: 'CASCADE' })
  course: Course;

  @OneToOne(() => Message, { onDelete: 'CASCADE' })
  message: Message;
}
