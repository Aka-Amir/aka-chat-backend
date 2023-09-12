import { Controller, NotFoundException, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, catchError, map } from 'rxjs';
import { GrpcErrorHandlerInterceptor } from 'src/core/interceptors';
import * as MSConstants from '../entities/users.constants';
import { ILogin, IUpdateUser } from '../interfaces';
import { ICreateUser } from '../interfaces/ICreateUser';
import { UsersService } from './users.service';

@UseInterceptors(GrpcErrorHandlerInterceptor)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(MSConstants.USERS_SERVICE, MSConstants.CREATE)
  createUser(data: ICreateUser): Observable<ILogin.ILoginResponse> {
    return this.usersService
      .createUser(data)
      .pipe(map((user) => this.usersService.signUser(user)));
  }

  @GrpcMethod(MSConstants.USERS_SERVICE, MSConstants.LOGIN)
  login(payload: ILogin.ILoginRequest): Observable<ILogin.ILoginResponse> {
    return this.usersService
      .findUserByUserID(payload.userId)
      .pipe(
        map((user): ILogin.ILoginResponse => {
          if (user.password !== payload.password) {
            throw new NotFoundException();
          }
          return this.usersService.signUser(user);
        }),
      )
      .pipe(
        catchError(() => {
          throw new NotFoundException();
        }),
      );
  }

  @GrpcMethod(MSConstants.USERS_SERVICE, MSConstants.UPDATE)
  updateUser(
    payload: IUpdateUser.IUpdateUser,
  ): Observable<IUpdateUser.IStatusResponse> {
    return this.usersService.updateUser(payload).pipe(
      map((data) => {
        return {
          status: data.acknowledged,
        };
      }),
    );
  }

  @GrpcMethod(MSConstants.USERS_SERVICE, MSConstants.AUTO_LOGIN)
  autoLogin(): Observable<ILogin.IAutoLoginResponse> {
    throw new Error('Not implemented yet !');
  }
}
