export interface UserState {
  user_id: string;
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface SignupReq {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface SignupRes {
  id: string;
  name: string;
  email: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  id: string;
  name: string;
  email: string;
}

export interface LogoutRes {
  message: string;
}
