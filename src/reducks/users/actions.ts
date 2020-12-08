import { UserInfo, ConflictMessage } from './types';
export type userActions = ReturnType<
  | typeof signUpAction
  | typeof logInAction
  | typeof logOutAction
  | typeof fetchUserInfoAction
  | typeof informErrorAction
  | typeof conflictMessageAction
>;

export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (user_id: string, user_name: string, email: string) => {
  return {
    type: SIGN_UP,
    payload: {
      user_id: user_id,
      user_name: user_name,
      email: email,
    },
  };
};

export const LOG_IN = 'LOG_IN';
export const logInAction = (email: string) => {
  return {
    type: LOG_IN,
    payload: {
      email: email,
    },
  };
};

export const LOG_OUT = 'LOG_OUT';
export const logOutAction = () => {
  return {
    type: LOG_OUT,
    payload: null,
  };
};

export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const fetchUserInfoAction = (userInfo: UserInfo) => {
  return {
    type: FETCH_USER_INFO,
    payload: userInfo,
  };
};

export const INFORM_ERROR = 'INFORM_ERROR';
export const informErrorAction = (errorMessage: string) => {
  return {
    type: INFORM_ERROR,
    payload: {
      errorMessage: errorMessage,
    },
  };
};

export const CONFLICT_MESSAGE = 'CONFLICT_MESSAGE';
export const conflictMessageAction = (conflictMessage: ConflictMessage) => {
  return {
    type: CONFLICT_MESSAGE,
    payload: {
      conflictMessage: conflictMessage,
    },
  };
};
