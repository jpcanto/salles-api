import { IUser } from './IUser';

export interface ISessionIn {
  email: string;
  password: string;
}

export interface ISessionOut {
  user: IUser;
  token: string;
}
