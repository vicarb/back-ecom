import { Module } from '@nestjs/common';
import { CotizadorService } from './cotizador.service';
import { CotizadorController } from './cotizador.controller';

@Module({
  providers: [CotizadorService],
  controllers: [CotizadorController],
})
export class CotizadorModule {}
