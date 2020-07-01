import { UserState } from './types';

export type UserActions = ReturnType<
  typeof signUpAction | typeof signInAction | typeof signOutAction
>;

export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (
  userId: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return {
    type: SIGN_UP,
    payload: {
      userId: userId,
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    },
  };
};

export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState: UserState) => {
  return {
    type: SIGN_IN,
    payload: userState,
  };
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => {
  return {
    type: SIGN_OUT,
    payload: null,
  };
};
