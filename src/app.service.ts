import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppService {
  AWS_S3_BUCKET = 'lister-dev';
  s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });

  async uploadFile(file: any) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file: any, bucket: any, name: any, mimetype: any) {
    const params = {
      Bucket: bucket,
      Key: String(`${Date.now()}-${name}`),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'eu-north-1',
      },
    };

    try {
      return this.s3.upload(params).promise();
    } catch (e) {
      console.log(e);
    }
  }
  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
