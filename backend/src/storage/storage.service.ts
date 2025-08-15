import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly uploadDir = process.env.UPLOAD_DIR ?? 'uploads';
  ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir))
      fs.mkdirSync(this.uploadDir, { recursive: true });
  }
  getFilePath(filename: string) {
    return path.join(this.uploadDir, filename);
  }
  publicUrl(filename: string) {
    const base = process.env.STATIC_BASE_URL ?? '';
    return `${base}/${this.uploadDir}/${filename}`;
  }
}
