import { Module } from '@nestjs/common';
import { MessagesApiController } from './messagesApi.controller';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [MessagesApiController],
  providers: [RoomsService],
})
export class MessagesApi {}
