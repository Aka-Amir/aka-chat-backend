import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserModel, colUsers } from 'src/users/entities/user.entity';
import { Model, Schema as mongooseSchema } from 'mongoose';

@Schema()
export class Chats {
  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: colUsers.name }],
  })
  users: Omit<UserModel, 'password'>[];

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: [{ type: String }],
  })
  logs: string[];
}

export type ChatsDocument = Document & Chats;
export type ChatsModel = Model<ChatsDocument>;
export const colChats = {
  name: 'colChats',
  schema: SchemaFactory.createForClass(Chats),
};
