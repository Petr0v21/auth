import { Field, ArgsType } from '@nestjs/graphql';
import { UserRole } from './userRole.enum';

@ArgsType()
export class UpdateOneUserArgs {
  @Field()
  id: string;

  @Field({nullable: true})
  email: string;

  @Field({nullable: true})
  password: string;

  @Field(() => UserRole, { defaultValue: UserRole.USER, nullable: true})
  role?: UserRole;
}
