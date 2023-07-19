export interface ICreateUser {
  username: string;
  phoneNumber: string;
  password: string;
}

export interface ICreateUserResponse extends Omit<ICreateUser, 'password'> {
  _id: string;
}
