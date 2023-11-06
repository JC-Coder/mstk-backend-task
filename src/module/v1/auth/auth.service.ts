import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../user/user.schema';
import { LoginDto } from './auth.dto';
import { CreateUserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDto): Promise<UserDocument & { token: string }> {
    const { email, password } = payload;

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    delete user['_doc'].password;
    return {
      ...user['_doc'],
      token: this.jwtService.sign({ id: user._id }),
    };
  }

  async signup(payload: CreateUserDto): Promise<UserDocument> {
    return await this.userService.createUser(payload);
  }
}
