// file-upload.service.ts
import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FileUploadService {
  private storage: Storage;
  private bucketName = 'ecom-bucket-22'; // Your bucket name

  constructor() {
    this.storage = new Storage({
      projectId: 'your-project-id', // Replace with your Google Cloud Project ID
      keyFilename: 'path-to-your-service-account-key-file.json', // Replace with path to your service account key file
    });
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const fileName = Date.now() + file.originalname;
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('error', err => {
        reject(err);
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  }
}
