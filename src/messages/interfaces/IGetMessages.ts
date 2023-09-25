import { Message } from '../entities/messages.entity';

export interface IGetMessages {
  chatId: string;
}

export interface IGetMessagesResponse {
  data: Message[];
}
