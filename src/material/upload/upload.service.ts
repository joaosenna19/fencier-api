import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  async upload(fileName: string, file: Buffer) {
    const uploaded = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'fencierriofence',
        Key: fileName,
        Body: file,
        ContentType: 'image/png',
        ContentDisposition: 'inline; filename=filename.png',
      }),
    );
    return `https://fencierriofence.s3.amazonaws.com/${fileName}`;
  }

  async delete(fileName: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'fencierriofence',
        Key: fileName,
      }),
    );
    
  }

  
}
