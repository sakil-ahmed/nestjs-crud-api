import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { diskStorage } from 'multer';
import e from 'express';
import { Error } from 'mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('upload-files')
@ApiTags('assets')
@ApiSecurity('JWT-auth')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     required: ['assets'],
  //     properties: {
  //       assets: {
  //         type: 'array',
  //         items: {
  //           type: 'string',
  //           format: 'binary',
  //         },
  //       },
  //     },
  //   },
  // })
  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(
  //   FileInterceptor('assets', {
  //     storage: diskStorage({
  //       destination: './assets',
  //       filename(
  //         req: e.Request,
  //         file: Express.Multer.File,
  //         callback: (error: Error | null, filename: string) => void,
  //       ) {
  //         callback(null, `${file.originalname}`);
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(@UploadedFile() assets: Express.Multer.File) {
  //   return this.uploadFilesService.upload(assets);
  // }
}
