import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guard/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './guard/google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY ?? 'your_secret_key_offer_wall', // Замени на свой секретный ключ
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [JwtStrategy, GoogleStrategy, AuthService, UsersService],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
