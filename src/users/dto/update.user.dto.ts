import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../types';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  access_token?: string;

  @IsOptional()
  @IsString()
  refresh_token?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
