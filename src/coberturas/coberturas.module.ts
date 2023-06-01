import { Module } from '@nestjs/common';
import { CoberturasController } from './coberturas.controller';
import { CoberturasService } from './coberturas.service';

@Module({
  controllers: [CoberturasController],
  providers: [CoberturasService],
})
export class CoberturasModule {}
