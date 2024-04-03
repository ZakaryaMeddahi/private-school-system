import { Module } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import { SocialLinksController } from './social-links.controller';
import { SocialLinks } from 'src/shared/entities/socialLinks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialLinks]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Inject ConfigModule
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
        isGlobal: true,
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  providers: [SocialLinksService],
  exports: [SocialLinksService],
  controllers: [SocialLinksController],
})
export class SocialLinksModule {}
