import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/shared/entities/teacher.entity';
import { User } from 'src/shared/entities/user.entity';
import { UsersService } from '../users/users.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, User]), MailModule],
  controllers: [TeachersController],
  providers: [TeachersService, UsersService],
})
export class TeachersModule {}
