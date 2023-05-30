import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { FileUploadModule } from './file-upload/file-upload.module'; // import the module here
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProductsModule,
    FileUploadModule, // add the module here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
