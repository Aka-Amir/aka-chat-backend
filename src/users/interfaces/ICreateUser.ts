export interface ICreateUser {
  username: string;
  phoneNumber: string;
}

export interface ICreateUserResponse extends ICreateUser {
  _id: string;
}
