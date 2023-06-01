import { Controller, Get, Query } from '@nestjs/common';
import { GooglePlacesService } from './google-places.service';

@Controller('googlePlaces')
export class GooglePlacesController {
  constructor(private readonly googlePlacesService: GooglePlacesService) {}

  @Get('autocomplete')
  getPlaceAutocomplete(@Query('input') input: string) {
    return this.googlePlacesService.getPlaceAutocomplete(input);
  }
}
