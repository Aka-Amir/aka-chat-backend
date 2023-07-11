import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
export class Users {
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
  authToken: string;
}

export type UsersDocumentType = Document & Users;
export type UsersModelType = Model<UsersDocumentType>;
export const colUsers = {
  name: 'colUsers',
  schema: SchemaFactory.createForClass(Users),
};
