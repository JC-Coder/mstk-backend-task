import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { LoggedInUserDecorator } from '../../../common/decorators/logged-in-user.decorator';
import { ILoggedInUser } from '../../../common/interfaces/user.interface';
import { sendAppResponse } from '../../../common/utils/helper';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(
    @LoggedInUserDecorator() user: ILoggedInUser,
    @Res() res: Response,
  ) {
    return sendAppResponse(res, 200, user, 'User profile fetched successfully');
  }
}
