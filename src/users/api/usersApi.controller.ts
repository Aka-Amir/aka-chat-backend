import {
  Controller,
  Inject,
  OnModuleInit,
  NotFoundException,
} from '@nestjs/common';
import { ClientGrpc, GrpcMethod, RpcException } from '@nestjs/microservices';
import { ICreateUser, ICreateUserResponse } from '../interfaces/ICreateUser';
import { IUserService } from '../interfaces/IUserService';
import { Observable, catchError } from 'rxjs';
import { ILogin, IUpdateUser } from '../interfaces';
import * as MSConstants from '../entities/users.constants';

@Controller()
export class UsersApiController implements OnModuleInit {
  private service: IUserService;
  constructor(@Inject(MSConstants.USERS_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.service = this.client.getService<IUserService>(
      MSConstants.USERS_SERVICE,
    );
  }

  @GrpcMethod(MSConstants.USERS_SERVICE, MSConstants.CREATE)
  create(data: ICreateUser): Observable<ICreateUserResponse> {
    return this.service.Create(data);
  }

  @GrpcMethod(MSConstants.USERS_SERVICE, MSConstants.LOGIN)
  login(data: ILogin.ILoginRequest): Observable<ILogin.ILoginResponse> {
    return this.service.Login(data).pipe(
      catchError((e) => {
        console.log(e);
        throw new RpcException(new NotFoundException());
      }),
    );
  }

  @GrpcMethod(MSConstants.USERS_SERVICE, MSConstants.UPDATE)
  update(
    payload: IUpdateUser.IUpdateUser,
  ): Observable<IUpdateUser.IStatusResponse> {
    return this.service.Update(payload);
  }
}
