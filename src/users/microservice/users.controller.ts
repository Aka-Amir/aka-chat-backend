import { Controller } from '@nestjs/common';

import { GrpcMethod } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { ICreateUser, ICreateUserResponse } from '../interfaces/ICreateUser';
import { UsersService } from './users.service';

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
