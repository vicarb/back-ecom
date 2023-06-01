import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CotizadorRequestDto } from './dto/cotizador-request.dto';

@Injectable()
export class CotizadorService {
  async getCourierRates(request: CotizadorRequestDto) {
    try {
      const response = await axios.post('https://testservices.wschilexpress.com/rating/api/v1.0/rates/courier', request);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get courier rates.');
    }
  }
}
