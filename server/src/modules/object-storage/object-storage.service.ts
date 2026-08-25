import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ObjectStorageService {
  constructor(private readonly configService: ConfigService) {
    this.initCloudinary();
  }

  private initCloudinary() {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  uploadFile(file: Express.Multer.File) {
    // TODO: BUG — `error` is accepted and then ignored; there is no `reject`
    // anywhere in this method. A failed upload therefore RESOLVES with
    // `undefined`, and the `.then()` below dereferences `uploadResult.url`,
    // turning a Cloudinary error into a TypeError. Should be:
    //   (error, uploadResult) =>
    //     error ? reject(error) : resolve(uploadResult)
    // with `reject` taken from the executor arguments.
    const uploader = new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream(
          { public_id: file.originalname.split('.')[0] },
          (error, uploadResult) => {
            return resolve(uploadResult);
          },
        )
        .end(file.buffer);
    });

    const result = uploader.then((uploadResult: any) => {
      console.log(
        `Buffer upload_stream wth promise success - ${uploadResult.url}`,
      );
      return uploadResult;
    });

    // cloudinary.uploader
    //   .upload_stream(
    //     { public_id: file.originalname.split('.')[0] },
    //     (error, uploadResult) => {
    //       console.log(uploadResult);
    //     },
    //   )
    //   .end(file.buffer);

    return result;
  }

  async getFile(fileId: string) {
    const result = await cloudinary.api.resource(fileId);

    return result;
  }

  async deleteFile(fileId: string) {
    const result = await cloudinary.uploader.destroy(fileId);

    return result;
  }
}
