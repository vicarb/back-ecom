import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileUploadService {
  private readonly bucketName = 'ecom-bucket-222'; // Updated bucket name
  private readonly storage = new Storage({
    projectId: 'compostera-387703',
    keyFilename: './compostera-387703-5281b7918f7a.json',
  });

  async upload(file: Express.Multer.File): Promise<string> {
    const newName = `${uuidv4()}-${file.originalname}`;
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(newName);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('error', reject);
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
        resolve(publicUrl);
      });
      blobStream.end(file.buffer);
    });
  }
}
