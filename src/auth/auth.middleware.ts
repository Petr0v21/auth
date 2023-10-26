import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtGuard } from './guard/jwt.guard';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { UserRole } from 'src/users/types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtGuard: JwtGuard) {}
  private managerMethods: { method: string; url: string }[] = [
    { url: 'offerwall-users', method: 'POST' },
    { url: 'offerwall-users/', method: 'DELETE' },
    { url: 'offers', method: 'POST' },
    { url: 'offers/', method: 'PUT' },
    { url: 'offers/', method: 'DELETE' },
    // { url: 'auth/check', method: 'GET' },
  ];
  private superAdminMethods: { method: string; url: string }[] = [
    { url: 'offerwall-users', method: 'POST' },
  ];
  async use(req: Request, res: Response, next: NextFunction) {
    const context = new ExecutionContextHost([req, res, next]);
    await this.jwtGuard.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);

    if (
      this.superAdminMethods.find(
        (item) => req.baseUrl.includes(item.url) && req.method !== item.method,
      )
    ) {
      if (user.role !== UserRole.SUPERADMIN) {
        throw new UnauthorizedException();
      }
    }
    if (
      this.managerMethods.find(
        (item) => req.baseUrl.includes(item.url) && req.method !== item.method,
      )
    ) {
      if (user.role === UserRole.USER) {
        throw new UnauthorizedException();
      }
    }
    return next();
  }
}
