import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity({ name: 'teachers' })
export class Teacher {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  biography: string;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];
}
