import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

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
}
