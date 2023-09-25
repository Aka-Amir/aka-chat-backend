import { Chats } from '../entities/chats.entity';

export interface IGetChats {
  userId: string;
}
export interface IGetChatsResponse {
  data: Chats[];
}
