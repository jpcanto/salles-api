export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserIn {
  name: string;
  email: string;
  password: string;
}

export interface IPaginationUser {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: IUser[];
}

export interface IUpdateUserIn {
  id: string;
  name: string;
  email: string;
  password: string;
}
