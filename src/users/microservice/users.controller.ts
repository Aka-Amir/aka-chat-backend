import { Controller, NotFoundException, UseInterceptors } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, map, catchError } from 'rxjs';
import { UsersService } from './users.service';
import { ICreateUser, ICreateUserResponse } from '../interfaces/ICreateUser';
import { ILogin, IUpdateUser } from '../interfaces';
import * as MSConstants from '../entities/users.constants';
import { GrpcErrorHandlerInterceptor } from 'src/core/interceptors';

@UseInterceptors(GrpcErrorHandlerInterceptor)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(MSConstants.USERS_SERVICE, MSConstants.CREATE)
  createUser(data: ICreateUser): Observable<ICreateUserResponse> {
    return this.usersService.createUser(data).pipe(
      map(
        (user): ICreateUserResponse => ({
          ...data,
          ...user,
        }),
      ),
    );
  }

  @GrpcMethod(MSConstants.USERS_SERVICE, MSConstants.LOGIN)
  login(payload: ILogin.ILoginRequest): Observable<ILogin.ILoginResponse> {
    return this.usersService
      .findUserByPhoneNumber(payload.phoneNumber)
      .pipe(
        map((user): ILogin.ILoginResponse => {
          if (user.password !== payload.password) {
            throw new NotFoundException();
          }
          return {
            authToken: user.phoneNumber,
            refreshToken: user.password,
          };
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
