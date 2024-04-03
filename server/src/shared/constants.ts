import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

// Cloudinary
export const CLOUDINARY_CLOUD_NAME = configService.get('CLOUDINARY_CLOUD_NAME');
export const CLOUDINARY_API_KEY = configService.get('CLOUDINARY_API_KEY');
export const CLOUDINARY_API_SECRET = configService.get('CLOUDINARY_API_SECRET');