import { Controller } from '@nestjs/common';

import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ICreateUser, ICreateUserResponse } from '../interfaces/ICreateUser';
import { Observable, map } from 'rxjs';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'Create')
  createUser(data: ICreateUser): Observable<ICreateUserResponse> {
    return this.usersService.createUser(data).pipe(
      map((user) => ({
        ...data,
        ...user,
      })),
    );
  }
}
