import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as MsgConst from '../entities/messages.constants';
import { ICreateChat } from '../interfaces';
import { IMessagesService } from '../interfaces/IMessagesService';

@WebSocketGateway(8000, {
  path: '/messages',
})
export class ChatGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  private service: IMessagesService;

  constructor(@Inject(MsgConst.MESSAGES_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<IMessagesService>(
      MsgConst.MESSAGES_SERVICE,
    );
  }

  @WebSocketServer()
  private server: Server;

  handleDisconnect(client: any) {
    Logger.log('user disconnected !', client.id);
  }
  handleConnection(client: Socket) {
    Logger.log('user connected !', client.id);
  }

  @SubscribeMessage('createChat')
  createChat(
    @MessageBody() body: ICreateChat,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(body);
    const sub = this.service.StartChat(body).subscribe({
      next: (data) => {
        if (socket.disconnected) {
          sub.unsubscribe();
          return;
        }
        socket.emit('createChat', data);
      },
    });
  }
}
