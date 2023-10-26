import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guard/jwt.strategy';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/graphql/user.entity';
import { AuthResolver } from './graphql/auth.resolver';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY ?? 'your_secret_key', // Замени на свой секретный ключ
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [JwtStrategy, AuthService, UserService, AuthResolver],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
