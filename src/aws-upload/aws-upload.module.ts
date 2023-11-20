import { Module } from '@nestjs/common';
import { AwsUploadController } from './aws-upload.controller';
import { AwsUploadService } from './aws-upload.service';

@Module({
  imports: [],
  controllers: [AwsUploadController],
  providers: [
    AwsUploadService
  ],
})
export class AwsUploadModule { }
