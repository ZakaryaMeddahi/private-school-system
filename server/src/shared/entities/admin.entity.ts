import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  // @Column({ nullable: true })
  // profilePicture: string;

  @OneToOne(() => User, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  user: User;
}
