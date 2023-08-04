import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entity/wallet.entity';

@Module({
  imports:[HttpModule, TypeOrmModule.forFeature([Wallet])],
  providers: [WalletsService],
  controllers: [WalletsController]
})
export class WalletsModule {}
