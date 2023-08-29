export interface ICreateUser {
  userId: string;
  username: string;
  password: string;
}

export interface ICreateUserResponse extends Omit<ICreateUser, 'password'> {
  _id: string;
}
