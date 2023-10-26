import {
    Body,
    Query,
    Controller,
    Get,
    Post,
  } from '@nestjs/common';
  import { AuthCodeService } from './authcode.service';
  import { ResetPassworCodedArgs, ResetPassworEmailArgs, ResetPassworWithoutCodedArgs, ResetPasswordWithCodeArgs } from './args/ResetPassword';
  
  @Controller('code')
  export class AuthCodeController {
    constructor(
      private readonly authCodeService: AuthCodeService,
    ) {}
  
    @Post()
    async emailAndCode(
      @Body() args: ResetPassworEmailArgs,
    ) {
      return await this.authCodeService.codeCreateAndCheckEmail(args.email);
    }
  
    @Get('check')
    async checkCode(@Query() args: ResetPassworCodedArgs) {
      return await this.authCodeService.codeCheck(args.code, args.email);
    }
  
    @Post('resetPasswordCode')
    async resetPasswordCode(
      @Body() args: ResetPasswordWithCodeArgs,
    ) {
      return await this.authCodeService.resetPassword(
        args.code,
        args.email,
        args.password,
      );
    }
  }
  