import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthCode } from './authcode.entity';
import { AuthCodeService } from './authcode.service';
import { User } from '../user/graphql/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthCodeController } from './authcode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthCode, User])],
  providers: [AuthCodeService, UsersService],
  controllers: [AuthCodeController],
  exports: [AuthCodeService],
})
export class AuthCodeModule {}
