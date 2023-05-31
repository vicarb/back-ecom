import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly httpService: HttpService) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const headersRequest = {
      'Tbk-Api-Key-Id': '597055555532',
      'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
      'Content-Type': 'application/json',
    };

    const response = await this.httpService
      .post('https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions', createTransactionDto, { headers: headersRequest })
      .toPromise();

    return response.data;
  }
}
