import { Field, ArgsType } from '@nestjs/graphql';
import { UserRole } from 'src/user/graphql/args/userRole.enum';

@ArgsType()
export class RegisterArgs {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ defaultValue: UserRole.USER, nullable: true })
  role: UserRole;
}
