import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CoberturasService {
  private apiUrl = 'https://testservices.wschilexpress.com/georeference/api/v1.0';

  async searchStreets(countyName: string, streetName: string): Promise<any> {
    const requestData = {
      countyName,
      streetName,
      pointsOfInterestEnabled: true,
      streetNameEnabled: true,
      roadType: 0
    };

    try {
      const response = await axios.post(`${this.apiUrl}/streets/search`, requestData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to search streets.');
    }
  }
}
