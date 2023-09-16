import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFilesService {
  upload(assets: Express.Multer.File) {
    return assets;
  }
}
