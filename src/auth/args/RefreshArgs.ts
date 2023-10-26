import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshArgs {
  @IsNotEmpty()
  @IsString()
  token: string;
}
