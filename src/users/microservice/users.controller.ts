import { Controller, NotFoundException } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import { Observable, map, catchError } from 'rxjs';

import { UsersService } from './users.service';

import { ICreateUser, ICreateUserResponse } from '../interfaces/ICreateUser';
import { ILogin } from '../interfaces';

import { AUTO_LOGIN, CREATE, LOGIN, USERS_SERVICE } from './users.constants';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod(USERS_SERVICE, CREATE)
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

  @GrpcMethod(USERS_SERVICE, LOGIN)
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

  @GrpcMethod(USERS_SERVICE, AUTO_LOGIN)
  autoLogin(): Observable<ILogin.IAutoLoginResponse> {
    throw new Error('Not implemented yet !');
  }
}
