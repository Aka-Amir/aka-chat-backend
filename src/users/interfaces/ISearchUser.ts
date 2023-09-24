import { UserModel } from '../entities/user.entity';

export interface ISearchUser {
  userID: string;
}
export interface ISearchUserResponse {
  data: Omit<UserModel, 'password'>[];
}

