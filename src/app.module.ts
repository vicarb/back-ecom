import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { TransactionModule } from './transaction/transaction.module';

import { ConfigModule } from '@nestjs/config';
import { GooglePlacesService } from './google-places/google-places.service';
import { GooglePlacesController } from './google-places/google-places.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProductsModule,
    FileUploadModule, // add the module here
    TransactionModule,
  ],
  controllers: [AppController, GooglePlacesController],
  providers: [AppService, GooglePlacesService],
})
export class AppModule {}
