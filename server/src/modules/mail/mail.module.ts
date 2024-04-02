import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: configService.get('MAILER_SERVICE'),
          auth: {
            user: configService.get('MAILER_USER'),
            pass: configService.get('MAILER_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get('MAILER_USER')}>`,
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     service: 'gmail',
    //     auth: {
    //       user: 'zakaryameddahi@gmail.com',
    //       pass: 'sntz mcab fdzx tvnu',
    //     },
    //   },
    //   defaults: {
    //     from: '"No Reply" <zakaryameddahi@gmail.com>',
    //   },
    //   template: {
    //     dir: __dirname + '/templates',
    //     adapter: new PugAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
