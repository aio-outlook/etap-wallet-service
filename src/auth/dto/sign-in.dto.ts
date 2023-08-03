
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
export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty({required: true })
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty({required: true })
    password: string;
  }