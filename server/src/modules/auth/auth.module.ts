import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Student } from 'src/shared/entities/student.entity';
import { MailModule } from '../mail/mail.module';
import { StudentsModule } from '../students/students.module';
import { SocialLinksModule } from '../social-links/social-links.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Inject ConfigModule
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
        isGlobal: true,
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    StudentsModule,
    MailModule,
    SocialLinksModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  constructor(private readonly configService: ConfigService) {}
}
