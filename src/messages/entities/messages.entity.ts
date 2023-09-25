import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserModel, colUsers } from 'src/users/entities/user.entity';
import { Model, Schema as mongooseSchema } from 'mongoose';
import { Chats, colChats } from './chats.entity';

@Schema()
export class Message {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: colUsers.name,
  })
  sender: Omit<UserModel, 'password'>;

  @Prop({
    type: Date,
    default: Date.now,
  })
  sentAt: string;

  @Prop({
    type: String,
    required: true,
  })
  payload: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: colChats.name,
  })
  chat: Chats | mongooseSchema.Types.ObjectId;
}

export type MessageDocument = Document & Message;
export type MessageModel = Model<MessageDocument>;
export const colMessage = {
  name: 'colMessage',
  schema: SchemaFactory.createForClass(Message),
};
