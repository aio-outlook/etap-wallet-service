
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  isPhoneNumber
} from 'class-validator';

export class WalletDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty({required: true })
    currency: string;

  }