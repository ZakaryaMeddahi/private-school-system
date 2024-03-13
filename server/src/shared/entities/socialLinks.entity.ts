import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'social_links' })
export class SocialLinks {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  linkedIn: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  github: string;

  @Column({ nullable: true })
  youtube: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
