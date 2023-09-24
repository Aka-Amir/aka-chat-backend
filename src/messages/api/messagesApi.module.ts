import { Module } from '@nestjs/common';
import { MessagesApiController } from './messagesApi.controller';
import { RoomsService } from './rooms.service';
import { ChatGateway } from './messagesSocket.gateway';

@Module({
  controllers: [MessagesApiController],
  providers: [RoomsService, ChatGateway],
})
export class MessagesApi {}

