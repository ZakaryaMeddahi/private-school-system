import { Module } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import { SocialLinksController } from './social-links.controller';
import { SocialLinks } from 'src/shared/entities/socialLinks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SocialLinks])],
  providers: [SocialLinksService],
  exports: [SocialLinksService],
  controllers: [SocialLinksController],
})
export class SocialLinksModule {}
