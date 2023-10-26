import { Field, ArgsType } from '@nestjs/graphql';
import { UserRole } from './userRole.enum';

@ArgsType()
export class CreateOneUserArgs {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserRole, { defaultValue: UserRole.USER })
  role?: UserRole;
}
