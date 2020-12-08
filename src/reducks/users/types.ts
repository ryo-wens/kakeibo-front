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
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface UserRes {
  id: string;
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
