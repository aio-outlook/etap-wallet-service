
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

export class FundWalletDto {
    @IsString()
    @MinLength(5)
    @ApiProperty({required: true })
    poyment_reference: string

  }

