import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
import { IUserService } from '../interfaces/IUserService';
import { ICreateUser } from '../interfaces/ICreateUser';
import { Observable, Subject } from 'rxjs';

@Controller()
export class UsersApiController implements OnModuleInit {
  private service: IUserService;
  constructor(@Inject('UsersService') private client: ClientGrpc) {}
  onModuleInit() {
    this.service = this.client.getService<IUserService>('UsersService');
  }

  @GrpcMethod('UsersService', 'Create')
  create(data: ICreateUser) {
    return this.service.Create(data);
  }

  @GrpcStreamMethod('UsersService', 'Message')
  message(message: Observable<{ message: string }>) {
    const sub = new Subject<{ message: string }>();
    message.subscribe({
      next: (data) => {
        console.log(data);
        sub.next(data);
      },
      complete: () => {
        sub.complete();
      },
    });

    return sub.asObservable();
  }
}
