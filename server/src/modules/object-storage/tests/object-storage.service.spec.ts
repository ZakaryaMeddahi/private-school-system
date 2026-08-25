import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { v2 as cloudinary } from 'cloudinary';
import { ObjectStorageService } from '../object-storage.service';
import { makeUploadResult } from 'src/shared/testing';

// HINT: `cloudinary` is a third-party module, not something Nest injects, so
// `getRepositoryToken` / `useValue` are no help here. Replace it at the module
// level the way `auth.service.spec.ts` replaces `src/helpers/bcrypt`:
//
//   jest.mock('cloudinary');
//
// then reach for the mocked members with `jest.mocked(...)`. Note the service
// imports it as `import { v2 as cloudinary } from 'cloudinary'`, so the shape
// you are mocking is the module's `v2` export.

jest.mock('cloudinary');

const mockedConfig = jest.mocked(cloudinary.config);
const mockedUploadStream = cloudinary.uploader.upload_stream as jest.Mock;
const mockedResource = jest.mocked(cloudinary.api.resource);
const mockedDestroy = jest.mocked(cloudinary.uploader.destroy);

describe('ObjectStorageService', () => {
  let service: ObjectStorageService;
  let configService: { get: jest.Mock };

  beforeEach(async () => {
    // Returning the key name back makes each config value distinguishable in
    // an assertion without inventing fake credentials.
    configService = { get: jest.fn((key: string) => `value-for-${key}`) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectStorageService,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get(ObjectStorageService);
  });

  describe('construction', () => {
    // HINT: this is the unusual one. `initCloudinary()` runs from the
    // constructor, so by the time `beforeEach` finishes the call has already
    // happened — you assert on it without invoking any method of the service.
    // The three values come from ConfigService: CLOUDINARY_CLOUD_NAME,
    // CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.
    it('should configure cloudinary from the environment on construction', () => {
      expect(mockedConfig).toHaveBeenCalledWith({
        cloud_name: 'value-for-CLOUDINARY_CLOUD_NAME',
        api_key: 'value-for-CLOUDINARY_API_KEY',
        api_secret: 'value-for-CLOUDINARY_API_SECRET',
      });
    });
  });

  describe('uploadFile', () => {
    const file = {
      originalname: 'lecture-notes.pdf',
      buffer: Buffer.from('file-contents'),
    } as Express.Multer.File;

    let end: jest.Mock;

    const arrangeUpload = (result = makeUploadResult()) => {
      end = jest.fn();
      mockedUploadStream.mockImplementation((_opts, cb) => {
        cb(null, result);
        return { end };
      });
      return result;
    };

    // HINT: the hard part. The service wraps a callback API in a Promise:
    //
    //   cloudinary.uploader
    //     .upload_stream({ public_id }, (error, uploadResult) => resolve(uploadResult))
    //     .end(file.buffer);
    //
    // Two things follow. Your `upload_stream` mock must RETURN an object with
    // an `.end()` method, or the chain throws before the promise exists. And
    // nothing resolves until you INVOKE the callback yourself — grab it from
    // the mock's arguments and call it with the result you want.
    //
    // Sketch:
    //   mockedCloudinary.uploader.upload_stream.mockImplementation((opts, cb) => {
    //     cb(null, makeUploadResult());     // <- this is what resolves the promise
    //     return { end: jest.fn() };
    //   });
    //
    // `makeUploadResult()` is already in src/shared/testing.
    it('should resolve with the upload result', async () => {
      const uploadResult = makeUploadResult();
      arrangeUpload(uploadResult);

      await expect(service.uploadFile(file)).resolves.toEqual(uploadResult);
    });

    // HINT: the public_id is derived — `file.originalname.split('.')[0]`, so
    // 'lecture-notes.pdf' becomes 'lecture-notes'. Assert on the options object
    // `upload_stream` was called with.
    it('should derive the public id from the file name', async () => {
      arrangeUpload(makeUploadResult());
      await service.uploadFile(file);
      expect(mockedUploadStream).toHaveBeenCalledWith(
        { public_id: 'lecture-notes' },
        expect.any(Function),
      );
    });

    // HINT: the buffer is handed over via `.end(file.buffer)`, not via
    // `upload_stream`. Keep a reference to the `end` mock you returned above so
    // you can assert what it received.
    it('should send the file buffer to the upload stream', async () => {
      arrangeUpload(makeUploadResult());
      await service.uploadFile(file);
      expect(end).toHaveBeenCalledWith(file.buffer);
    });

    // TODO: BUG — the callback ignores its `error` argument and always calls
    // `resolve`, so a failed upload resolves with `undefined` and the `.then()`
    // that reads `uploadResult.url` throws a TypeError instead. See the
    // matching TODO in object-storage.service.ts.
    //
    // These two tests pin the current behaviour. Once the callback rejects,
    // replace them with:
    //   await expect(service.uploadFile(file)).rejects.toThrow('upload failed');
    it('should currently ignore the error cloudinary reports', async () => {
      end = jest.fn();
      mockedUploadStream.mockImplementation((_opts, cb) => {
        cb(new Error('upload failed'), undefined);
        return { end };
      });

      await expect(service.uploadFile(file)).rejects.toThrow(TypeError);
    });

    it('should still send the buffer even though the upload will fail', async () => {
      end = jest.fn();
      mockedUploadStream.mockImplementation((_opts, cb) => {
        cb(new Error('upload failed'), undefined);
        return { end };
      });

      await expect(service.uploadFile(file)).rejects.toThrow();
      expect(end).toHaveBeenCalledWith(file.buffer);
    });
  });

  describe('getFile', () => {
    it('should return the resource for the given id', async () => {
      const resource = makeUploadResult();
      mockedResource.mockResolvedValue(resource as never);

      await expect(service.getFile('lecture-notes')).resolves.toEqual(resource);
      expect(mockedResource).toHaveBeenCalledWith('lecture-notes');
    });

    it('should propagate a failure from cloudinary', async () => {
      mockedResource.mockRejectedValue(new Error('not found') as never);

      await expect(service.getFile('missing')).rejects.toThrow('not found');
    });
  });

  describe('deleteFile', () => {
    it('should delete the resource for the given id', async () => {
      mockedDestroy.mockResolvedValue({ result: 'ok' } as never);

      await expect(service.deleteFile('lecture-notes')).resolves.toEqual({
        result: 'ok',
      });
      expect(mockedDestroy).toHaveBeenCalledWith('lecture-notes');
    });

    it('should propagate a failure from cloudinary', async () => {
      mockedDestroy.mockRejectedValue(new Error('destroy failed') as never);

      await expect(service.deleteFile('lecture-notes')).rejects.toThrow(
        'destroy failed',
      );
    });
  });
});
