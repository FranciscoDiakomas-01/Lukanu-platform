import { Controller, Post, Body, Patch, Delete, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/create-auth.dto';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
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

  @Delete('logout')
  @ApiOperation({
    summary: 'logout',
    description: 'logout account',
  })
  @ApiHeaders([
    {
      name: 'sub',
      explode: true,
    },
  ])
  logout(@Headers('sub') id: number) {
    return this.authService.logOut(id);
  }

  @Patch('refresh')
  @ApiOperation({
    summary: 'refresh',
    description: 'refresh account',
  })
  refresh(@Headers('sub') id: string) {
    return this.authService.refresh(+id);
  }
}
