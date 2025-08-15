import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesService } from './images.service';
import { StorageService } from '../storage/storage.service';

@Controller('images')
export class ImagesController {
  constructor(
    private images: ImagesService,
    private storage: StorageService,
  ) {
    this.storage.ensureUploadDir();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) =>
          cb(null, process.env.UPLOAD_DIR ?? 'uploads'),
        filename: (req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    const url = this.storage.publicUrl(file.filename);
    const image = await this.images.create(file.filename, url);
    return image;
  }
}
