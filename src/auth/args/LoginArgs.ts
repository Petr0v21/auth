import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginArgs {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
