import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ResetPasswordArgs {
  @Field()
  email: string;

  @Field()
  oldpassword: string;

  @Field()
  newpassword: string;
}