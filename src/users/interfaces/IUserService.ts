import { ICreateUser, ICreateUserResponse } from './ICreateUser';

export interface IUserService {
  Create(payload: ICreateUser): ICreateUserResponse;
}
