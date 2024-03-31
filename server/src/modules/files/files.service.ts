import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uploadFile } from 'src/helpers/object-storage';
import { File } from 'src/shared/entities/file.entity';
import { CreateFileParams } from 'src/shared/types';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  // TODO: Inject ObjectStorage
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  // Implement file service
  async create(file: CreateFileParams) {
    try {
      const result = await uploadFile(file);

      if (!result) throw new HttpException('Cannot upload file', 500);

      const {
        public_id: name,
        url,
        resource_type: type,
        format,
        bytes: size,
      } = result;

      const newFile = this.fileRepository.create({
        name,
        url,
        type,
        format,
        size,
      });

      const fileEntity = await this.fileRepository.save(newFile);

      return fileEntity;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create file', 500);
    }
  }

  async find() {
    return 'Get file';
  }

  async remove() {
    return 'Delete file';
  }
}
