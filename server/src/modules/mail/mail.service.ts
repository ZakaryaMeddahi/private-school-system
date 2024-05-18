import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { Course } from 'src/shared/entities/course.entity';
import { User } from 'src/shared/entities/user.entity';
import { EnrollmentStatus } from 'src/shared/enums';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserRegistration(user: User) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to our platform!',
        template: './registration',
        context: {
          user,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot send email', 500);
    }
  }

  async sendEnrollmentStatus(
    user: User,
    status: EnrollmentStatus,
    course: Course,
    subject: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject,
        template: './enrollment-status',
        context: {
          user,
          status,
          course,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot send email', 500);
    }
  }
}
