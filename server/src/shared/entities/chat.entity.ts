import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { Course } from './course.entity';
import { Room } from './room.entity';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => Course)
  @JoinColumn()
  course?: Course;

  @OneToOne(() => Room)
  @JoinColumn()
  room?: Room;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
