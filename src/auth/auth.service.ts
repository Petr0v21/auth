import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async checkRefreshToken(token: string) {
    // TODO env
    const decodedToken = await jwt.verify(token, 'your_secret_key_offer_wall');
    const expirationDate = new Date((decodedToken as any).exp * 1000);
    const currentDate = new Date();
    if (expirationDate < currentDate) {
      throw new UnauthorizedException();
    }
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async validateUserById(userId: number): Promise<User | null> {
    return this.userService.findOneById(userId);
  }

  async validateUserEmail(email: string): Promise<User | null> {
    return this.userService.findByUsername(email);
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessTokenPayload = { userId: user.id, role: user.role };
    const refreshTokenPayload = {
      userId: user.id,
      role: user.role,
      tokenType: 'refresh',
    };

    const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
      //TODO on 5m
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      expiresIn: '7d',
    });

    await this.userService.update(user.id, { refreshToken });

    return { accessToken, refreshToken };
  }

  async resetPasswordFromOld(
    email: string,
    oldpassword: string,
    newpassword: string,
  ) {
    const user = await this.userService.findByUsername(email);
    if (user && user.password === oldpassword) {
      const result = await this.userService.update(user.id, {
        password: newpassword,
      });
      return { success: !!result };
    }
    return { success: false };
  }
}
