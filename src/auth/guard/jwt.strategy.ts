import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO env
      secretOrKey: process.env.SECRET_KEY ?? 'your_secret_key_offer_wall',
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    const user = await this.authService.validateUserById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
