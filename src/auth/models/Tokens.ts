import { IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/users/types';

export class Tokens {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class TokensAndInfo {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  role: UserRole;
}
