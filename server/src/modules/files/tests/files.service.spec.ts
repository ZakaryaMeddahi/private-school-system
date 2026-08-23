import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectStorageService } from 'src/modules/object-storage/object-storage.service';
import { File } from 'src/shared/entities/file.entity';
import {
  createMockRepository,
  makeFile,
  makeUploadResult,
  MockRepository,
} from 'src/shared/testing';
import { CreateFileParams } from 'src/shared/types';
import { FilesService } from '../files.service';

describe('FilesService', () => {
  let service: FilesService;
  let repository: MockRepository<File>;
  let objectStorage: { uploadFile: jest.Mock };

  const upload = { originalname: 'lecture-notes.pdf' } as CreateFileParams;

  beforeEach(async () => {
    repository = createMockRepository<File>();
    objectStorage = { uploadFile: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        { provide: getRepositoryToken(File), useValue: repository },
        { provide: ObjectStorageService, useValue: objectStorage },
      ],
    }).compile();

    service = module.get(FilesService);
  });

  describe('create', () => {
    it('should return the saved file', async () => {
      const file = makeFile();
      objectStorage.uploadFile.mockResolvedValue(makeUploadResult());
      repository.create.mockReturnValue(file);
      repository.save.mockResolvedValue(file);

      await expect(service.create(upload)).resolves.toEqual(file);
    });

    // Translating Cloudinary's field names onto ours is the actual work this
    // method does, so it is worth pinning.
    it('should map the storage response onto the file columns', async () => {
      objectStorage.uploadFile.mockResolvedValue(
        makeUploadResult({
          public_id: 'slides',
          url: 'https://cdn.example.com/slides.pdf',
          resource_type: 'raw',
          format: 'pdf',
          bytes: 2048,
        }),
      );
      repository.create.mockReturnValue(makeFile());
      repository.save.mockResolvedValue(makeFile());

      await service.create(upload);

      expect(repository.create).toHaveBeenCalledWith({
        name: 'slides',
        url: 'https://cdn.example.com/slides.pdf',
        type: 'raw',
        format: 'pdf',
        size: 2048,
      });
    });

    it('should upload the file before persisting it', async () => {
      objectStorage.uploadFile.mockResolvedValue(makeUploadResult());
      repository.create.mockReturnValue(makeFile());
      repository.save.mockResolvedValue(makeFile());

      await service.create(upload);

      expect(objectStorage.uploadFile).toHaveBeenCalledWith(upload);
    });

    it('should return null when there is no file to upload', async () => {
      await expect(service.create(null)).resolves.toBeNull();
      expect(objectStorage.uploadFile).not.toHaveBeenCalled();
    });

    it('should throw when the upload fails', async () => {
      objectStorage.uploadFile.mockResolvedValue(null);

      await expect(service.create(upload)).rejects.toThrow(
        'Cannot upload file',
      );
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  // TODO: `find()` and `remove()` are unimplemented stubs returning the strings
  // 'Get file' / 'Delete file'. Write real tests once they do something.
  it.todo('find should return the requested file');
  it.todo('remove should delete the file from storage and the database');
});
