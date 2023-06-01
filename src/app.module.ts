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
import { CoberturasService } from './coberturas/coberturas.service';
import { CoberturasController } from './coberturas/coberturas.controller';
import { CoberturasModule } from './coberturas/coberturas.module';
import { CotizadorModule } from './cotizador/cotizador.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProductsModule,
    FileUploadModule, // add the module here
    TransactionModule,
    CoberturasModule,
    CotizadorModule,
    CartModule,
  ],
  controllers: [AppController, GooglePlacesController, CoberturasController],
  providers: [AppService, GooglePlacesService, CoberturasService],
})
export class AppModule {}
