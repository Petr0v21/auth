import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { UserRole } from 'src/users/types';

export class RegisterArgs {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @IsString()
  number: string;

  role?: UserRole = UserRole.USER;

  login?: string;
}

export class RegisterAdminArgs {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  number?: string;

  role?: UserRole = UserRole.USER;

  login?: string;
}
