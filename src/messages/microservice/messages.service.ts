import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatsModel, colChats } from '../entities/chats.entity';
import { MessageModel, colMessage } from '../entities/messages.entity';
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
import { Observable, from, map } from 'rxjs';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(colChats.name) private chatModel: ChatsModel,
    @InjectModel(colMessage.name) private messagesModel: MessageModel,
  ) {}

  createChat(data: ICreateChat): Observable<ICreateChatResponse> {
    return from(
      new this.chatModel({
        users: [data.senderID, ...data.members],
      }).save(),
    ).pipe(
      map((x) => ({
        chatID: x._id.toString(),
      })),
    );
  }

  saveMessage(data: ISendMessage): Observable<ISendMessageResponse> {
    const message = new this.messagesModel({
      sender: data.userID,
      payload: data.payload,
      chat: data.chatId,
    });

    return from(message.save()).pipe(
      map(({ _id, sentAt }) => ({
        id: _id.toString(),
        sentAt: sentAt.toString(),
      })),
    );
  }

  getChats(data: IGetChats): Observable<IGetChatsResponse> {
    return from(
      this.chatModel
        .find({
          users: data.userId,
        })
        .exec(),
    ).pipe(
      map((x) => ({
        data: x.map((i) => i.toObject()),
      })),
    );
  }

  getMessages(data: IGetMessages): Observable<IGetMessagesResponse> {
    return from(
      this.messagesModel
        .find({
          chat: data.chatId,
        })
        .exec(),
    ).pipe(map((x) => ({ data: x.map((i) => i.toObject()) })));
  }
}
