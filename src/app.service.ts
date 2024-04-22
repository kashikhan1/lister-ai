import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class AppService {
  s3 = new S3Client({
    region: process.env.BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  async uploadFile(file: any) {
    const { originalname, buffer, mimetype } = file;
    const params: any = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${Date.now()}_${originalname}`,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'public-read',
    };
    try {
      const data = await this.s3.send(new PutObjectCommand(params));

      return {
        ...data,
        url: `File uploaded successfully. File URL: https://${params.Bucket}.s3.amazonaws.com/${params.Key}`,
      };
    } catch (error) {
      throw Error(error);
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
