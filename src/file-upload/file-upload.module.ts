import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';

@Module({
  providers: [FileUploadService],
  controllers: [FileUploadController],
  exports: [FileUploadService] // export it, in case you want to use it in other modules
})
export class FileUploadModule {}
