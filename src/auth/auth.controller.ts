import {
  BadRequestException,
  Body,
  Query,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens, TokensAndInfo } from './models/Tokens';
import { RefreshArgs } from './args/RefreshArgs';
import { UsersService } from 'src/users/users.service';
import { RegisterAdminArgs, RegisterArgs } from './args/RegisterArgs';
import { LoginArgs } from './args/LoginArgs';
import { UserRole } from 'src/users/types';
import { AuthGuard } from '@nestjs/passport';
import { ResetPasswordArgs } from './args/ResetPasswordArgs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @Post('login')
  async login(@Body() args: LoginArgs): Promise<TokensAndInfo> {
    const user = await this.authService.validateUser(args.email, args.password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const tokens = await this.authService.generateTokens(user);

    return {
      ...tokens,
      role: user.role,
      id: user.id.toString(),
    };
  }

  @Post('signup')
  async signup(@Body() args: RegisterArgs): Promise<TokensAndInfo> {
    const check = await this.userService.findByUsername(args.email);
    if (check) {
      throw new BadRequestException('User with this email already exist!');
    }
    const user = await this.userService.create(args);
    if (!user) {
      throw new BadRequestException();
    }
    const tokens = await this.authService.generateTokens(user);

    return {
      ...tokens,
      role: UserRole.USER,
      id: user.id.toString(),
    };
  }

  @Post('register')
  async register(@Body() args: RegisterAdminArgs): Promise<TokensAndInfo> {
    const check = await this.userService.findByUsername(args.email);
    if (check) {
      throw new BadRequestException('User with this email already exist!');
    }
    const user = await this.userService.create(args);
    if (!user) {
      throw new BadRequestException();
    }
    const tokens = await this.authService.generateTokens(user);

    return {
      ...tokens,
      role: user.role,
      id: user.id.toString(),
    };
  }

  @Post('refresh')
  async refresh(@Body() args: RefreshArgs): Promise<Tokens> {
    const user = await this.userService.findByRefreshToken(args.token);

    if (!user) {
      throw new BadRequestException();
    }

    await this.authService.checkRefreshToken(args.token);

    const tokens = await this.authService.generateTokens(user);

    return tokens;
  }
  @Get('check')
  async check(@Req() request: any): Promise<any> {
    return request.user;
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async google() {
    console.log('req Google');
  }

  @UseGuards(AuthGuard('google'))
  @Get('callback/google')
  async googleCallback(@Req() req: any, @Res() res: Response) {
    const jwt = await this.authService.generateTokens(req.user);
    return { ...jwt, role: req.user.role, id: req.user.id.toString() };
  }

  @Post('resetPasswordfromOld')
    async resetPasswordfromOld(
      @Body() args: ResetPasswordArgs,
    ){
      return await this.authService.resetPasswordFromOld(
        args.email,
        args.oldpassword,
        args.newpassword,
      );
    }
}
