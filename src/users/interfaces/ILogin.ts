export interface ILoginRequest {
  userId: string;
  password: string;
}

export interface ILoginResponse {
  authToken: string;
  refreshToken: string;
}

export interface IAutoLoginResponse {
  _id: string;
}
