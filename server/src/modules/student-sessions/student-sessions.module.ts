import { Module } from '@nestjs/common';
import { StudentSessionsService } from './student-sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSession } from 'src/shared/entities/studentSession.entity';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSession]), StudentsModule],
  providers: [StudentSessionsService],
  exports: [StudentSessionsService],
})
export class StudentSessionsModule {}
