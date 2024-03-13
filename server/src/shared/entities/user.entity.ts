import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  lastLogging: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];
}
