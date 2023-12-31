
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  Min,
} from 'class-validator';

export class InitFundWalletDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({required: true })
  amount: number;

  @IsNumber()
  @Min(1)
  @ApiProperty({required: true })
  walletId: number

}

