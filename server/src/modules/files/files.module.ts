import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/shared/entities/file.entity';
import { ObjectStorageModule } from '../object-storage/object-storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), ObjectStorageModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
