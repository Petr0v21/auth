import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtGuard } from './guard/jwt.guard';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { SelectionNode, parse, visit } from 'graphql';
import { UserRole } from 'src/user/graphql/args/userRole.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtGuard: JwtGuard) {}
  private publicMethods: string[] = ['login', 'refresh'];
  private supportMethods: string[] = ['__schema'];
  private userMethods: string[] = [
    'findOneUser',
    'updateOneUser',
  ];
  private managerMethods: string[] = [
    'findUsers',
  ];
  private adminMethods: string[] = [
    'deleteOneUser',
    'updateOneUser',
    'createOneUser',
  ];

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body?.query) {
      const ast = parse(req.body.query);

      let methodName: string | undefined;

      visit(ast, {
        OperationDefinition(node) {
          methodName = (
            node.selectionSet.selections[0] as SelectionNode & {
              name: { value: string };
            }
          ).name.value;
        },
      });

      if (!methodName) {
        throw new BadRequestException();
      }

      if (
        this.publicMethods.includes(methodName) ||
        this.supportMethods.includes(methodName)
      ) {
        return next();
      }

      const context = new ExecutionContextHost([req, res, next]);

      await this.jwtGuard.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if (user.role === UserRole.USER && !this.userMethods.includes(methodName)) {
        throw new UnauthorizedException();
      }

      if (user.role === UserRole.MANAGER && !this.userMethods.concat(this.managerMethods).includes(methodName) ) {
        throw new UnauthorizedException();
      }

      // if (user.role === UserRole.ADMIN && !this.userMethods.concat(this.managerMethods, this.adminMethods).includes(methodName)) {
      //   throw new UnauthorizedException();
      // }
      return next();
    }

    return next();
  }
}
