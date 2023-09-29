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
import { ICreateChat, ISendMessage } from '../interfaces';
import { IMessagesService } from '../interfaces/IMessagesService';

@WebSocketGateway(8000, {
  path: '/messages',
  cors: '*',
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

  handleDisconnect(client: Socket) {
    Logger.log('user disconnected !', client.id);
    const userID = client.handshake.query.id as string;
    if (!userID) {
      return;
    }
    client.leave(userID);
  }
  handleConnection(client: Socket) {
    const userID = client.handshake.query.id as string;
    console.log('connected', userID);
    if (!userID) {
      client.disconnect();
    }
    client.join(userID);
    console.log(this.server.sockets.adapter.rooms);
  }

  @SubscribeMessage('createChat')
  createChat(
    @MessageBody() body: ICreateChat,
    @ConnectedSocket() socket: Socket,
  ) {
    const sub = this.service.StartChat(body).subscribe({
      next: async (data) => {
        if (socket.disconnected) {
          sub.unsubscribe();
          return;
        }

        for (const user of [body.senderID, ...body.members]) {
          const ro = this.server.sockets.adapter.rooms.get(user);
          if (!ro) continue;
          const id = ro.values().next().value;
          const sock = await this.server.in(id).fetchSockets();
          sock[0].join(data.chatID);
          sock[0].emit('createChat', data);
        }
        Logger.log('Created new room');
      },
    });
  }

  @SubscribeMessage('message')
  message(
    @MessageBody() body: ISendMessage,
    @ConnectedSocket() socket: Socket,
  ) {
    if (socket.handshake.query.id !== body.userID) return;
    this.server.to(body.chatId).emit('message', body);
  }
}
