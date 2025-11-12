import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/create-auth.dto';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({
    summary: 'signin',
    description: 'Creating account',
  })
  signin(@Body() data: SignInDto) {
    return this.authService.signIn(data);
  }

  @ApiOperation({
    summary: 'login',
    description: 'Acess account',
  })
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
