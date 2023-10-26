import { AuthService } from '../auth.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SuccessOutput } from 'src/graphql/dto/SuccessOutput';
import {
  ResetPassworCodedArgs,
  ResetPassworEmailArgs,
  ResetPasswordWithCodeArgs,
} from './args/ResetPassword';

@Resolver()
export class AuthResolver {

  constructor(
    private readonly authService: AuthService,
  ) {}


  @Mutation(() => SuccessOutput)
  async emailAndCode(
    @Args() args: ResetPassworEmailArgs,
  ): Promise<SuccessOutput> {
    return await this.authService.codeCreateAndCheckEmail(args.email);
  }

  @Query(() => SuccessOutput)
  async checkCode(@Args() args: ResetPassworCodedArgs): Promise<SuccessOutput> {
    return await this.authService.codeCheck(args.code, args.email);
  }

  @Mutation(() => SuccessOutput)
  async resetPasswordCode(
    @Args() args: ResetPasswordWithCodeArgs,
  ): Promise<SuccessOutput> {
    return await this.authService.resetPassword(
      args.code,
      args.email,
      args.password,
    );
  }
}
