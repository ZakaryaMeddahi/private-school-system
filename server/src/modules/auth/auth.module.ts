import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { StudentsService } from '../students/students.service';
import { Student } from 'src/shared/entities/student.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, StudentsService],
})
export class AuthModule {}
