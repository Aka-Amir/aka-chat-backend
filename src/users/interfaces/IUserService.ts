import { Observable } from 'rxjs';
import { IStatusResponse } from 'src/core/interfaces/GlobalResponses';
import { ICreateUser } from './ICreateUser';
import { ILoginRequest, ILoginResponse } from './ILogin';
import { IUpdateUser } from './IUpdateUser';

export interface IUserService {
  Create(payload: ICreateUser): Observable<ILoginResponse>;
  Login(payload: ILoginRequest): Observable<ILoginResponse>;
  Update(payload: IUpdateUser): Observable<IStatusResponse>;
}
