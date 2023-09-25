import { Module } from '@nestjs/common';
import { MessagesApiController } from './messagesApi.controller';
import { RoomsService } from './rooms.service';
import { ChatGateway } from './messagesSocket.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MessagesService',
        transport: Transport.GRPC,
        options: {
          package: 'aka_messages',
          protoPath: join(__dirname, '../../core/proto/messages.proto'),
          url: 'localhost:3003',
        },
      },
    ]),
  ],
  controllers: [MessagesApiController],
  providers: [RoomsService, ChatGateway],
})
export class MessagesApi {}
