import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
export class User {
  @Prop({
    type: String,
    default: '',
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export type UserDocument = Document & User;
export type UserModel = Model<UserDocument>;
export const colUsers = {
  name: 'colUsers',
  schema: SchemaFactory.createForClass(User),
};
