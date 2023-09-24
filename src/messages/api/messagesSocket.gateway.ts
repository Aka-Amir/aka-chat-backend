import { Logger } from '@nestjs/common';
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
import { ICreateChannel } from '../interfaces/ICreateChannel';

@WebSocketGateway(8000)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  handleDisconnect(client: any) {
    Logger.log('user disconnected !', client.id);
  }
  handleConnection(client: Socket, ...args: any[]) {
    Logger.log('user connected !', client.id);
  }

  @SubscribeMessage('createChannel')
  onMessage(@MessageBody() body: ICreateChannel) {}
}

