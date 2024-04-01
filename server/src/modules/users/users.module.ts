import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/shared/entities/user.entity';
import { SocialLinksModule } from '../social-links/social-links.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    SocialLinksModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
