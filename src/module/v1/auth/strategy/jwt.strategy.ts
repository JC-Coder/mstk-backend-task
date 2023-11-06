import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../../user/user.service';
import { ENVIRONMENT } from 'src/common/configs/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENVIRONMENT.JWT.SECRET,
    });
  }

  async validate(payload) {
    const user = await this.userService.getUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
