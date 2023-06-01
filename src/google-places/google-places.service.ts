import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GooglePlacesService {
  private readonly apiKey = process.env.GOOGLE_API_KEY;  // Make sure to set this environment variable

  async getPlaceAutocomplete(input: string) {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
    
    const params = {
      input,
      key: this.apiKey,
    };

    try {
      const { data } = await axios.get(url, { params });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
