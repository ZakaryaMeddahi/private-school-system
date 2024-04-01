import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/shared/entities/teacher.entity';
import { User } from 'src/shared/entities/user.entity';
import { UsersService } from '../users/users.service';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { SocialLinksModule } from '../social-links/social-links.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Teacher, User]),
    SocialLinksModule,
    UsersModule,
    MailModule,
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
