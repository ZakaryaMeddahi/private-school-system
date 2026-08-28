import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';
import { Role } from '../enums';

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

  // TODO: the column is nullable but the property is typed non-nullable, so
  // `address: null` only compiles because `strictNullChecks` is off. Type it
  // `string | null` — `CreateUserParams.address` is optional, and the mismatch
  // currently forces workarounds in test fixtures.
  @Column({ nullable: true })
  address: string;

  @Column()
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLogging: Date;

  // TODO: a column default only fires on INSERT, so `updatedAt` never changes
  // unless a service stamps it by hand (see `users.service.ts#update`).
  // Replace these with `@CreateDateColumn` / `@UpdateDateColumn` and let
  // TypeORM maintain them; that also removes the need to freeze the clock in
  // the unit tests. Applies to all 14 entities — sequence it before generating
  // the baseline migration, since it changes the schema.
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];
}
