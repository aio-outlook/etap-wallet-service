import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entity/wallet.entity';
import { PaystackService } from 'src/paystack/paystack.service';
import { WalletTransaction } from './entity/wallet.transaction.entity';

@Module({
  imports:[HttpModule, TypeOrmModule.forFeature([Wallet, WalletTransaction])],
  providers: [WalletsService, PaystackService],
  controllers: [WalletsController]
})
export class WalletsModule {}
