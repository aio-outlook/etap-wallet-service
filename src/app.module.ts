import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { PaystackModule } from './paystack/paystack.module';

@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot(configService.getTypeOrmConfig()), AuthModule, UsersModule, WalletsModule, PaystackModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
