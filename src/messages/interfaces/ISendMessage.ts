export interface ISendMessage {
  payload: string;
  chatId: string;
  userID: string;
}

export interface ISendMessageResponse {
  id: string;
  sentAt: string;
}
