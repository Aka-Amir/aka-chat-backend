import { ICreateChat, ICreateChatResponse } from './ICreateChat';
import { IGetChats, IGetChatsResponse } from './IGetChats';
import { Observable } from 'rxjs';
import { ISendMessage, ISendMessageResponse } from './ISendMessage';
import { IGetMessages, IGetMessagesResponse } from './IGetMessages';

export interface IMessagesService {
  FindChats(payload: IGetChats): Observable<IGetChatsResponse>;
  StartChat(payload: ICreateChat): Observable<ICreateChatResponse>;
  EmitMessage(payload: ISendMessage): Observable<ISendMessageResponse>;
  GetMessages(payload: IGetMessages): Observable<IGetMessagesResponse>;
}
