import { Observable } from 'rxjs';
import { ICreateUser, ICreateUserResponse } from './ICreateUser';
import { ILoginRequest, ILoginResponse } from './ILogin';
import { IUpdateUser } from './IUpdateUser';
import { IStatusResponse } from 'src/core/interfaces/GlobalResponses';

export interface IUserService {
  Create(payload: ICreateUser): Observable<ICreateUserResponse>;
  Login(payload: ILoginRequest): Observable<ILoginResponse>;
  Update(payload: IUpdateUser): Observable<IStatusResponse>;
}
