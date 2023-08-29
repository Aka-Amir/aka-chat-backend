import {
  Body,
  Controller,
  Inject,
  NotFoundException,
  OnModuleInit,
  Post,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, catchError } from 'rxjs';
import * as MSConstants from '../entities/users.constants';
import { ILogin, IUpdateUser } from '../interfaces';
import { ICreateUser, ICreateUserResponse } from '../interfaces/ICreateUser';
import { IUserService } from '../interfaces';

@Controller('users')
export class UsersApiController implements OnModuleInit {
  private service: IUserService;

  constructor(@Inject(MSConstants.USERS_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<IUserService>(
      MSConstants.USERS_SERVICE,
    );
  }

  @Post('create')
  create(@Body() data: ICreateUser): Observable<ICreateUserResponse> {
    return this.service.Create(data);
  }

  @Post('login')
  login(@Body() data: ILogin.ILoginRequest): Observable<ILogin.ILoginResponse> {
    return this.service.Login(data).pipe(
      catchError((e) => {
        console.log(e);
        throw new NotFoundException();
      }),
    );
  }

  @Put('update')
  update(
    payload: IUpdateUser.IUpdateUser,
  ): Observable<IUpdateUser.IStatusResponse> {
    return this.service.Update(payload);
  }
}
