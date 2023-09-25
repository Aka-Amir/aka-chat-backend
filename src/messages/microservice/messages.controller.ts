import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import * as MSGConst from '../entities/messages.constants';
import {
  ICreateChat,
  ICreateChatResponse,
  IGetChats,
  IGetChatsResponse,
  IGetMessages,
  IGetMessagesResponse,
  ISendMessage,
  ISendMessageResponse,
} from '../interfaces';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @GrpcMethod(MSGConst.MESSAGES_SERVICE, MSGConst.EMIT_MESSAGE)
  emitMessage(data: ISendMessage): Observable<ISendMessageResponse> {
    return this.messagesService.saveMessage(data);
  }

  @GrpcMethod(MSGConst.MESSAGES_SERVICE, MSGConst.FIND_CHATS)
  findChats(data: IGetChats): Observable<IGetChatsResponse> {
    return this.messagesService.getChats(data);
  }

  @GrpcMethod(MSGConst.MESSAGES_SERVICE, MSGConst.GET_MESSAGES)
  getMessages(data: IGetMessages): Observable<IGetMessagesResponse> {
    return this.messagesService.getMessages(data);
  }

  @GrpcMethod(MSGConst.MESSAGES_SERVICE, MSGConst.START_CHAT)
  startChat(data: ICreateChat): Observable<ICreateChatResponse> {
    console.log(data);
    return this.messagesService.createChat(data);
  }
}
