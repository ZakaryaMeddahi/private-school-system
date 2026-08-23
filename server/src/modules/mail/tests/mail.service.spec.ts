import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentStatus } from 'src/shared/enums';
import { makeUser } from 'src/shared/testing';
import { MailService } from '../mail.service';

describe('MailService', () => {
  let service: MailService;
  let mailerService: { sendMail: jest.Mock };

  beforeEach(async () => {
    mailerService = { sendMail: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: MailerService, useValue: mailerService },
      ],
    }).compile();

    service = module.get(MailService);
  });

  describe('sendUserRegistration', () => {
    // Sending the mail *is* the behaviour here — the method returns nothing, so
    // the call is the only observable effect worth asserting.
    it('should send the registration template to the user', async () => {
      const user = makeUser();

      await service.sendUserRegistration(user);

      expect(mailerService.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: user.email,
          template: './registration',
          context: { user },
        }),
      );
    });

    it('should throw when the mailer fails', async () => {
      mailerService.sendMail.mockRejectedValue(new Error('SMTP unavailable'));

      await expect(service.sendUserRegistration(makeUser())).rejects.toThrow(
        'Cannot send email',
      );
    });
  });

  describe('sendEnrollmentStatus', () => {
    it('should send the enrollment template with the status and course', async () => {
      const user = makeUser();
      const course = { id: 1, title: 'TypeScript' } as never;

      await service.sendEnrollmentStatus(
        user,
        EnrollmentStatus.APPROVED,
        course,
        'Congratulation, you are enrolled!',
      );

      expect(mailerService.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: user.email,
          subject: 'Congratulation, you are enrolled!',
          template: './enrollment-status',
          context: { user, status: EnrollmentStatus.APPROVED, course },
        }),
      );
    });

    it('should throw when the mailer fails', async () => {
      mailerService.sendMail.mockRejectedValue(new Error('SMTP unavailable'));

      await expect(
        service.sendEnrollmentStatus(
          makeUser(),
          EnrollmentStatus.REJECTED,
          null,
          'Your enrollment has been rejected.',
        ),
      ).rejects.toThrow('Cannot send email');
    });
  });
});
