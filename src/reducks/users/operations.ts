import {
  signUpAction,
  logInAction,
  logOutAction,
  fetchUserInfoAction,
  informErrorAction,
} from './actions';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import axios from 'axios';
import { SignupReq, UserRes, LoginReq, LogoutRes } from './types';
import { errorHandling } from '../../lib/validation';

export const signUp = (userId: string, userName: string, email: string, password: string) => {
  const data: SignupReq = {
    id: userId,
    name: userName,
    email: email,
    password: password,
  };
  return async (dispatch: Dispatch<Action>) => {
    try {
      await axios.post<UserRes>(
        `${process.env.REACT_APP_USER_API_HOST}/signup`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      dispatch(signUpAction(userId, userName, email));
      dispatch(push('/login'));
    } catch (error) {
      if (error.response.status === 400) {
        const errorMessages: string[] = [];

        if (error.response.data.error.id.length > 0) {
          errorMessages.push(error.response.data.error.id);
        }

        if (error.response.data.error.name.length > 0) {
          errorMessages.push(error.response.data.error.name);
        }

        if (error.response.data.error.email.length > 0) {
          errorMessages.push(error.response.data.error.email);
        }

        if (error.response.data.error.password.length > 0) {
          errorMessages.push(error.response.data.error.password);
        }

        if (errorMessages.length > 0) {
          dispatch(informErrorAction(errorMessages.join('\n')));
          return;
        }
      }

      if (error.response.status === 409) {
        const errorMessages: string[] = [];

        if (error.response.data.error.id) {
          errorMessages.push(error.response.data.error.id);
        }

        if (error.response.data.error.email) {
          errorMessages.push(error.response.data.error.email);
        }

        if (errorMessages.length > 0) {
          dispatch(informErrorAction(errorMessages.join('\n')));
          return;
        }
      }

      if (error.response) {
        dispatch(informErrorAction(error.response.data.error.message));
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
      dispatch(logInAction(email));
      dispatch(push('/'));
    } catch (error) {
      if (error.response.status === 400) {
        const errorMessages: string[] = [];

        if (error.response.data.error.email) {
          errorMessages.push(error.response.data.error.email);
        }
        if (error.response.data.error.password) {
          errorMessages.push(error.response.data.error.password);
        }
        if (errorMessages.length > 0) {
          dispatch(informErrorAction(errorMessages.join('\n')));
          return;
        }
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

      dispatch(push('/login'));
    } catch (error) {
      if (error.response) {
        dispatch(informErrorAction(error.response.data.error.message));
      }
    }
  };
};

export const fetchUserInfo = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<UserRes>(`${process.env.REACT_APP_USER_API_HOST}/user`, {
        withCredentials: true,
      });
      const userInfo: UserRes = result.data;

      dispatch(fetchUserInfoAction(userInfo));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
