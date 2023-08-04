
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  isPhoneNumber,
  isNumber,
  IsNumber,
  Min,
  Max
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

