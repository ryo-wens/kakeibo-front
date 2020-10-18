import { signUpAction, logInAction, logOutAction } from './actions';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import axios from 'axios';
import { SignupReq, SignupRes, LoginReq, LoginRes, LogoutRes } from './types';
import { isValidEmailFormat, isValidPasswordFormat } from '../../lib/validation';

export const signUp = (
  userId: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    const errorMessages: string[] = [];

    if (userId.length > 10) {
      errorMessages.push('ユーザーIDは10文字以下で入力してください。');
    }

    if (userName.length > 50) {
      errorMessages.push('ユーザー名は50文字以下で入力してください。');
    }

    if (email.length < 5) {
      errorMessages.push('メールアドレスは5文字以上で入力してください。');
    }

    if (email.length > 50) {
      errorMessages.push('メールアドレスは50文字以下で入力してください。');
    }

    if (!isValidEmailFormat(email)) {
      errorMessages.push('メールアドレスの形式に誤りがあります。正しく入力し直してください。');
    }

    if (password.length < 8) {
      errorMessages.push('パスワードは8文字以上で入力してください。');
    }

    if (password.length > 50) {
      errorMessages.push('パスワードは50文字以下で入力してください。');
    }

    if (password !== confirmPassword) {
      errorMessages.push('パスワードと確認パスワードが一致しません。もう一度入力してください。');
    }

    if (errorMessages.length > 0) {
      alert(errorMessages.join('\n'));
      return null;
    }

    const data: SignupReq = {
      id: userId,
      name: userName,
      email: email,
      password: password,
    };
    await axios
      .post<SignupRes>(`${process.env.REACT_APP_USER_API_HOST}/signup`, JSON.stringify(data), {
        withCredentials: true,
      })
      .then(() => {
        dispatch(signUpAction(userId, userName, email));
        dispatch(push('/login'));
      })
      .catch((error) => {
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
            alert(errorMessages.join('\n'));
          }
        }
        if (error.response.status === 409) {
          const errorMessages: string[] = [];

          if (error.response.data.error.id.length > 0) {
            errorMessages.push(error.response.data.error.id);
          }

          if (error.response.data.error.email.length > 0) {
            errorMessages.push(error.response.data.error.email);
          }

          if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
          }
        }

        if (error && error.response) {
          alert(error.response.data.error.message);
        } else {
          alert(error);
        }
      });
  };
};

export const logIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    if (!isValidEmailFormat(email)) {
      const alertMessage: string[] = [];
      alertMessage.push('メールアドレスの形式に誤りがあります。正しく入力し直してください。');
      if (!isValidPasswordFormat(password)) {
        alertMessage.push('パスワードを正しく入力してください。');
      }
      if (alertMessage.length > 0) {
        alert(alertMessage.join('\n'));
        return null;
      }
    }

    const data: LoginReq = { email: email, password: password };
    await axios
      .post<LoginRes>(`${process.env.REACT_APP_USER_API_HOST}/login`, JSON.stringify(data), {
        withCredentials: true,
      })
      .then(() => {
        dispatch(logInAction(email));
        dispatch(push('/'));
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const errorMessages: string[] = [];

          if (error.response.data.error.email) {
            errorMessages.push(error.response.data.error.email);
          }
          if (error.response.data.error.password) {
            errorMessages.push(error.response.data.error.password);
          }
          if (errorMessages) {
            alert(errorMessages.join('\n'));
          }
        } else if (error && error.response) {
          alert(error.response.data.error.message);
        } else {
          alert(error);
        }
      });
  };
};

export const logOut = () => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .delete<LogoutRes>(`${process.env.REACT_APP_USER_API_HOST}/logout`, {
        withCredentials: true,
      })
      .then(() => {
        dispatch(logOutAction());

        dispatch(push('/login'));
      })
      .catch((error) => {
        if (error && error.response) {
          alert(error.response.data.error.message);
        } else {
          alert(error);
        }
      });
  };
};
