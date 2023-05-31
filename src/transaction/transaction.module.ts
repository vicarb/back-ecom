import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [HttpModule],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
