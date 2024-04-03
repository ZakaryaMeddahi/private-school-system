import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user.entity';

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
}
