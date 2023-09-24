import { Observable } from 'rxjs';
import { IStatusResponse } from 'src/core/interfaces/GlobalResponses';
import { ICreateUser } from './ICreateUser';
import { ILoginRequest, ILoginResponse } from './ILogin';
import { IUpdateUser } from './IUpdateUser';
import { ISearchUser, ISearchUserResponse } from './ISearchUser';

export interface IUserService {
  Create(payload: ICreateUser): Observable<ILoginResponse>;
  Login(payload: ILoginRequest): Observable<ILoginResponse>;
  Update(payload: IUpdateUser): Observable<IStatusResponse>;
  Search(payload: ISearchUser): Observable<ISearchUserResponse>;
}

