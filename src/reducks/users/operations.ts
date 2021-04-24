import {
  signUpAction,
  logInAction,
  logOutAction,
  fetchUserInfoAction,
  informErrorAction,
  conflictMessageAction,
} from './actions';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import { SignupReq, UserRes, LoginReq, LogoutRes, ConflictMessage, UserInfo } from './types';
import axios, { CancelTokenSource } from 'axios';

export const signUp = (
  userId: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const data: SignupReq = {
    user_id: userId,
    name: userName,
    email: email,
    password: password,
  };
  return async (dispatch: Dispatch<Action>) => {
    if (password !== confirmPassword) {
      return dispatch(
        informErrorAction('パスワードと確認パスワードが一致しません。もう一度入力してください。')
      );
    }

    try {
      await axios.post<UserRes>(
        `${process.env.REACT_APP_USER_API_HOST}/signup`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      const emptyMessage: ConflictMessage = { id: '', email: '' };

      dispatch(conflictMessageAction(emptyMessage));
      dispatch(signUpAction(userId, userName, email));
      dispatch(push('/login'));
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(informErrorAction(error.response.data.error));
      }

      if (error.response.status === 409) {
        dispatch(conflictMessageAction(error.response.data.error));
      }
    }
  };
};

export const logIn = (email: string, password: string) => {
  const data: LoginReq = { email: email, password: password };
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axios.post<UserRes>(
        `${process.env.REACT_APP_USER_API_HOST}/login`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      dispatch(informErrorAction(''));
      dispatch(logInAction(email));
      dispatch(push('/home'));
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(informErrorAction(error.response.data.error));
      }

      if (error.response) {
        dispatch(informErrorAction(error.response.data.error.message));
      }
    }
  };
};

export const logOut = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axios.delete<LogoutRes>(`${process.env.REACT_APP_USER_API_HOST}/logout`, {
        withCredentials: true,
      });
      dispatch(logOutAction());

      dispatch(push('/'));
    } catch (error) {
      if (error.response) {
        dispatch(informErrorAction(error.response.data.error.message));
      }
    }
  };
};

export const fetchUserInfo = (signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<UserInfo>(`${process.env.REACT_APP_USER_API_HOST}/user`, {
        cancelToken: signal.token,
        withCredentials: true,
      });
      const userInfo: UserInfo = result.data;

      dispatch(fetchUserInfoAction(userInfo));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        throw error;
      }
    }
  };
};
