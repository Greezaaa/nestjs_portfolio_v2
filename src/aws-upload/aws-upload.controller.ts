import { ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AwsUploadService } from './aws-upload.service';
import { Throttle } from '@nestjs/throttler';
import { documentFileValidators, imageFileValidators } from './validators';

@Controller('aws-upload')

export class AwsUploadController {
    constructor(
        private configService: ConfigService, 
        private readonly awsUploadService: AwsUploadService
        ) {}

        @Post('upload-image')
        @UseInterceptors(FileInterceptor('file'))
        @Throttle({ 'default': { limit: 2, ttl: 60 } })
        async uploadImage(
          @UploadedFile(new ParseFilePipe({ validators: imageFileValidators }))
          file: Express.Multer.File,
        ) {
        if (file.size > +this.configService.get<number>('FILE_SIZE_LIMIT_2MB') ?? 1024 * 1024) {
            throw new Error('File is too large');
        }
        // console.log(file);
        await this.awsUploadService.UploadedImage(file.originalname, file.buffer);
    }

    
    @Post('upload-document')
    @UseInterceptors(FileInterceptor('file'))
    async uploadDocument(
      @UploadedFile(new ParseFilePipe({ validators: documentFileValidators }))
      file: Express.Multer.File,
    ) {
        if (file.size > +this.configService.get<number>('FILE_SIZE_LIMIT_2MB') ?? 1024 * 1024) {
            throw new Error('File is too large');
        }
        // console.log(file);
        await this.awsUploadService.UploadedDocument(file.originalname, file.buffer);
    }
}
