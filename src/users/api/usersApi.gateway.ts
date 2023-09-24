import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import * as MSConstants from '../entities/users.constants';
import { IUserService } from '../interfaces';

@WebSocketGateway(8000, {
  path: '/users',
})
export class UsersApiSocket implements OnModuleInit {
  private service: IUserService;

  constructor(@Inject(MSConstants.USERS_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<IUserService>(
      MSConstants.USERS_SERVICE,
    );
  }

  @SubscribeMessage('search')
  onUserSearch(
    @MessageBody() search: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const sub = this.service.Search({ userID: search }).subscribe({
      next: (v) => socket.emit('search', v.data),
    });
    socket.on('disconnect', () => {
      sub.unsubscribe();
    });
  }
}

