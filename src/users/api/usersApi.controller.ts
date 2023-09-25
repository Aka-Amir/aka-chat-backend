import {
  Body,
  Controller,
  ForbiddenException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
  Post,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, catchError } from 'rxjs';
import * as MSConstants from '../entities/users.constants';
import { ILogin, IUpdateUser, IUserService } from '../interfaces';
import { ICreateUser } from '../interfaces/ICreateUser';

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
  create(@Body() data: ICreateUser): Observable<ILogin.ILoginResponse> {
    return this.service.Create(data).pipe(
      catchError((e) => {
        if ((e.details as string).includes('E11000')) {
          throw new ForbiddenException('duplicated_userId');
        }
        throw new InternalServerErrorException();
      }),
    );
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
