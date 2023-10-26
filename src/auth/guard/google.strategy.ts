import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID ?? '841575858060-4bcmvph8tmjsmtqpj7tqaie9ja5jla9e.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_SECRET ?? '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',
      callbackURL: process.env.GOOGLE_CALLBACK_URL ?? 'http://localhost:7070/auth/callback/google',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    if (!profile.emails[0].value) {
      throw new UnauthorizedException();
    }
    let user = await this.authService.validateUserEmail(
      profile.emails[0].value,
    );
    console.log('Validate');
    console.log(user);
    if (!user) {
      user = await this.userService.create({
        login: profile.displayName,
        email: profile.emails[0].value,
      });
    }
    return user || null;
  }
}
