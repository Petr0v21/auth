import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private readonly s3: S3;
  accessKeyId = process.env.LOCAL_AWS_ACCESS_KEY;
  secretAccessKey = process.env.LOCAL_AWS_SECRET_KEY;
  region = process.env.AWS_BUCKET_REGION;
  bucketName = process.env.AWS_BUCKET_NAME;
  constructor() {
    this.s3 = new S3({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    }); // Create an instance of the S3 service
  }

  async uploadFile(fileName: string, fileStream: Readable | Buffer) {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: uuidv4() + '_' + fileName,
      Body: fileStream,
    };

    return await this.s3.upload(uploadParams).promise();
  }

  async deleteFile(fileName: string) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    return await this.s3.deleteObject(deleteParams).promise();
  }
  // Implement other file operations as per your requirements
}
