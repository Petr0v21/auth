import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordArgs {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    oldpassword: string;
  
    @IsNotEmpty()
    @IsString()
    newpassword: string;
  }