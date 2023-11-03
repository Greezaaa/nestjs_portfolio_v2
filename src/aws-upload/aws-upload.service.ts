import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsUploadService {
    private readonly s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {
        this.s3Client = new S3Client({
            region: this.configService.getOrThrow<string>('AWS_S3_REGION'),
            credentials: {
                accessKeyId: this.configService.getOrThrow<string>('AWS_S3_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow<string>('AWS_S3_SECRET_ACCESS_KEY'),
            },
        });
    }

    async UploadedImage(fileName: string, file: Buffer) {
        const response = await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET'),
                Key: fileName,
                Body: file,
            }),
        );

        console.log(response);
    }

    async UploadedDocument(fileName: string, file: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET'),
                Key: fileName,
                Body: file,
            }),
        );
    }
}
