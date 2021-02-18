export interface UserState {
  id: string;
  name: string;
  email: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

export interface SignupReq {
  user_id: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface UserRes {
  user_id: string;
  name: string;
  email: string;
}

export interface LogoutRes {
  message: string;
}

export interface ConflictMessage {
  id: string;
  email: string;
}
