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

  // {
  //   ETag: '"22f7d1c0bd7e50fcc628bb0d7d4ac02d"',
  //   ServerSideEncryption: 'AES256',
  //   Location: 'https://shakita-hookah.s3.eu-central-1.amazonaws.com/itachi_uchiha-scaled.jpg',
  //   key: 'itachi_uchiha-scaled.jpg',
  //   Key: 'itachi_uchiha-scaled.jpg',
  //   Bucket: 'shakita-hookah'
  // }
  // {
  //   ETag: '"078240ba84879b0247fbc3c3df9285c6"',
  //   ServerSideEncryption: 'AES256',
  //   Location: 'https://shakita-hookah.s3.eu-central-1.amazonaws.com/Buster_Keaton_%28%D0%B0%D0%BB%D1%8C%D0%B1%D0%BE%D0%BC%29.jpeg',
  //   key: 'Buster_Keaton_(альбом).jpeg',
  //   Key: 'Buster_Keaton_(альбом).jpeg',
  //   Bucket: 'shakita-hookah'
  // }

  async uploadFile(fileName: string, fileStream: Readable) {
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
