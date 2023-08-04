import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/register-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

    @Post('sign-up')
    async signUp(@Body() registerUserDto: RegisterUserDto) {
      return await this.usersService.create(registerUserDto);
    }

    @Post('sign-in')
    async signIn(@Body() signInDto: SignInDto) {
      return await this.authService.signIn(signInDto);
    }


}



