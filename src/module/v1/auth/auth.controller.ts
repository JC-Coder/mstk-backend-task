import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { sendAppResponse } from 'src/common/utils/helper';
import { Response } from 'express';
import { CreateUserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const user = await this.authService.login(payload);

    return sendAppResponse(res, 200, user, 'Login successful');
  }

  @Post('signup')
  async signup(@Body() payload: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.signup(payload);

    return sendAppResponse(res, 201, user, 'Signup successful');
  }
}
