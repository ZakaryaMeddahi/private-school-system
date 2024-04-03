import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/shared/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  controllers: [],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
