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
import { ILogin } from '../interfaces';

@Controller()
export class UsersApiController implements OnModuleInit {
  private service: IUserService;
  constructor(@Inject('UsersService') private client: ClientGrpc) {}
  onModuleInit() {
    this.service = this.client.getService<IUserService>('UsersService');
  }

  @GrpcMethod('UsersService', 'Create')
  create(data: ICreateUser): Observable<ICreateUserResponse> {
    return this.service.Create(data);
  }

  @GrpcMethod('UsersService', 'Login')
  login(data: ILogin.ILoginRequest): Observable<ILogin.ILoginResponse> {
    return this.service.Login(data).pipe(
      catchError((e) => {
        console.log(e);
        throw new RpcException(new NotFoundException());
      }),
    );
  }
}
