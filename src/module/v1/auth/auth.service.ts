import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/user.schema';
import { LoginDto } from './auth.dto';
import { CreateUserDto } from '../user/user.dto';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    payload: LoginDto,
  ): Promise<{ _id: string; name: string; email: string; token: string }> {
    const { email, password } = payload;

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: this.jwtService.sign({ id: user._id }),
    };
  }

  async signup(payload: CreateUserDto): Promise<IUser> {
    return await this.userService.createUser(payload);
  }
}
