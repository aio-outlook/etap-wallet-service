
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
export class RegisterUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({required: true })
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @ApiProperty({required: true })
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({required: true })
    password: string;
  }