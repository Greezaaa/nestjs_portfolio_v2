import { Injectable } from '@nestjs/common';
import { PutObjectCommand, CopyObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
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

    async uploadImageTemporary(fileName: string, file: Buffer) {
        const tempFileName = `images/temp-${fileName}`;
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET'),
                Key: tempFileName,
                Body: file,
                ACL: 'public-read',
            }),
        );
    
        return {
            temporaryKey: tempFileName,
            url: `https://${this.configService.getOrThrow<string>('AWS_S3_BUCKET')}.s3.${this.configService.getOrThrow<string>('AWS_S3_REGION')}.amazonaws.com/${tempFileName}`,
        };
    }

    async moveImageToPermanent(fileName: string) {
        const tempFileName = `images/temp-${fileName}`;
        const permanentFileName = `images/${fileName}`;
    
        // Copy the file to the new location
        await this.s3Client.send(
            new CopyObjectCommand({
                Bucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET'),
                CopySource: `${this.configService.getOrThrow<string>('AWS_S3_BUCKET')}/${tempFileName}`,
                Key: permanentFileName,
            }),
        );
    
        // Delete the temporary file
        await this.s3Client.send(
            new DeleteObjectCommand({
                Bucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET'),
                Key: tempFileName,
            }),
        );
    
        return {
            permanentKey: permanentFileName,
            url: `https://${this.configService.getOrThrow<string>('AWS_S3_BUCKET')}.s3.amazonaws.com/${permanentFileName}`,
        };
    }
    

    async uploadedDocument(fileName: string, file: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.getOrThrow<string>('AWS_S3_BUCKET'),
                Key: fileName,
                Body: file,
            }),
        );
    }
}
