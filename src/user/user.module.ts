import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './graphql/user.entity';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserResolver } from './graphql/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
