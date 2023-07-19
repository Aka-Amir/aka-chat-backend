import { Observable } from 'rxjs';
import { ICreateUser, ICreateUserResponse } from './ICreateUser';
import { ILoginRequest, ILoginResponse } from './ILogin';

export interface IUserService {
  Create(payload: ICreateUser): Observable<ICreateUserResponse>;
  Login(payload: ILoginRequest): Observable<ILoginResponse>;
}
