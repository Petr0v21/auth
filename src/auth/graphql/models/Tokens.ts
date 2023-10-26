import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/graphql/user.entity';

@ObjectType()
export class Tokens {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class TokensAndInfo extends Tokens {
  @Field()
  user: User
}
