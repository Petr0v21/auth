import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthCode } from './graphql/authcode.entity';
import { AuthCodeService } from './authcode.service';
import { User } from '../user/graphql/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthCode, User])],
  providers: [AuthCodeService],
  exports: [AuthCodeService],
})
export class AuthCodeModule {}
