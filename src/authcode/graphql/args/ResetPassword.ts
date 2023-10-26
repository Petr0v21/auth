import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ResetPassworEmailArgs {
  @Field()
  email: string;
}

@ArgsType()
export class ResetPassworCodedArgs {
  @Field()
  code: string;

  @Field()
  email: string;
}

@ArgsType()
export class ResetPasswordWithCodeArgs {
  @Field()
  email: string;

  @Field()
  code: string;

  @Field()
  password: string;
}