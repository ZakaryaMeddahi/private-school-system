import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from 'src/shared/constants';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export function uploadFile(file: Express.Multer.File) {
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

export async function getFile(fileId: string) {
  const result = await cloudinary.api.resource(fileId);

  return result;
}

export async function deleteFile(fileId: string) {
  const result = await cloudinary.uploader.destroy(fileId);

  return result;
}
