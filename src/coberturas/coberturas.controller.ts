import { Controller, Get, Query } from '@nestjs/common';
import { CoberturasService } from './coberturas.service';

@Controller('coberturas')
export class CoberturasController {
  constructor(private readonly coberturasService: CoberturasService) {}

  @Get('/streets')
  async searchStreets(
    @Query('countyName') countyName: string,
    @Query('streetName') streetName: string,
  ) {
    const streets = await this.coberturasService.searchStreets(countyName, streetName);
    return { streets };
  }
}
