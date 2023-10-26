import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtRoleGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token);

      if (payload) {
        req['user'] = payload;
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }
}
