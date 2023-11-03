// ./app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { AwsUploadService } from './aws-upload/aws-upload.service';
import { AwsUploadModule } from './aws-upload/aws-upload.module';
import * as Joi from 'joi';
@Module({
  imports: [
    MailModule,
    AwsUploadModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DOMAIN: Joi.string().required(),
  
        FILE_SIZE_LIMIT_1MB: Joi.number().integer().positive().required(),
        FILE_SIZE_LIMIT_2MB: Joi.number().integer().positive().required(),
        FILE_SIZE_LIMIT_3MB: Joi.number().integer().positive().required(),
        FILE_SIZE_LIMIT_5MB: Joi.number().integer().positive().required(),
        FILE_SIZE_LIMIT_10MB: Joi.number().integer().positive().required(),
  
        UPLOAD_RATE_TTL: Joi.number().integer().min(1).required(),
        UPLOAD_RATE_LIMIT: Joi.number().integer().min(1).required(), 
  
        MAILGUN_API_KEY: Joi.string().allow(''),
        MAILGUN_DOMAIN: Joi.string().allow(''),
        MAILGUN_WEBHOOK_SIGNING_KEY: Joi.string().allow(''),
  
        AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
        AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_S3_REGION: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [AwsUploadService],
})
export class AppModule { }
