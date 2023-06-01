import { Controller, Post, Body } from '@nestjs/common';
import { CotizadorService } from './cotizador.service';
import { CotizadorRequestDto } from './dto/cotizador-request.dto';
@Controller('cotizador')
export class CotizadorController {
  constructor(private cotizadorService: CotizadorService) {}

  @Post('rates')
  async getCourierRates(@Body() request: CotizadorRequestDto) {
    return this.cotizadorService.getCourierRates(request);
  }
}
