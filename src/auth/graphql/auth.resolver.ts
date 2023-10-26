import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoginArgs } from './args/LoginArgs';
import { Tokens, TokensAndInfo } from './models/Tokens';
import { UserService } from 'src/user/user.service';
import { RefreshArgs } from './args/RefreshArgs';
import { UserRole } from 'src/user/graphql/args/userRole.enum';
import { RegisterArgs } from './args/RegisterArgs';
import { SuccessOutput } from 'src/graphql/dto/SuccessOutput.dto';
import { ResetPasswordArgs } from './args/ResetPasswordArgs';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Query(() => TokensAndInfo)
  async login(@Args() args: LoginArgs): Promise<TokensAndInfo> {
    const user = await this.authService.validateUser(args.email, args.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const tokens = await this.authService.generateTokens(user);

    return {
      ...tokens,
      user
    };
  }

  @Mutation(() => TokensAndInfo)
  async register(@Args() args: RegisterArgs): Promise<TokensAndInfo> {
    const user = await this.userService.create({...args, role: UserRole.USER});
    if (!user) {
      throw new BadRequestException('User with this email already exist!');
    }
    const tokens = await this.authService.generateTokens(user);

    return {
      ...tokens,
      user
    };
  }

  @Query(() => Tokens)
  async refresh(@Args() args: RefreshArgs): Promise<Tokens> {
    const user = await this.userService.findByRefreshToken(args.token);

    if (!user) {
      throw new BadRequestException();
    }

    await this.authService.checkRefreshToken(args.token);

    const tokens = await this.authService.generateTokens(user);

    return tokens;
  }

  @Mutation(() => SuccessOutput)
  async resetPasswordfromOld(
    @Args() args: ResetPasswordArgs,
  ): Promise<SuccessOutput> {
    return await this.authService.resetPasswordFromOld(
      args.email,
      args.oldpassword,
      args.newpassword,
    );
  }
}
