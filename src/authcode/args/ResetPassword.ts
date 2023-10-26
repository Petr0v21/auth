import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class ResetPassworEmailArgs {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}

export class ResetPassworCodedArgs {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}

export class ResetPasswordWithCodeArgs {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
