import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { ENVIRONMENT } from 'src/common/configs/environment';
import { IJwtPayload } from 'src/common/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENVIRONMENT.JWT.SECRET,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userService.getUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
