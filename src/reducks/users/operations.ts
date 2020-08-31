import { signUpAction, logInAction, logOutAction } from './actions';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import axios from 'axios';


export const isValidEmailFormat = (email: string) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

interface SignupReq {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface SignupRes {
  id: string;
  name: string;
  email: string;
}

interface LoginReq {
  email: string;
  password: string;
}

interface LoginRes {
  id: string;
  name: string;
  email: string;
}

interface LogoutRes {
  message: string;
}

export const signUp = (
  userId: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    let errorMessages: string[] = [];

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
      .post<SignupRes>('http://127.0.0.1:8080/signup', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(signUpAction(userId, userName, email, password, confirmPassword));
        dispatch(push('/login'));
      })
      .catch((error) => {
        if (error.response.status === 400) {
          let errorMessages: string[] = [];

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
          let errorMessages: string[] = [];

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

        if (error.response.status === 500) {
            alert(error.response.data.error.message);
        }
      });
  };
};

export const logIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式に誤りがあります。正しく入力し直してください。');
      return null;
    }
    const data: LoginReq = { email: email, password: password };
    await axios
      .post<LoginRes>('http://127.0.0.1:8080/login', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
          dispatch(logInAction(email, password))
          dispatch(push('/'));

      })
      .catch((error) => {
        if (error.response.status === 400) {
          let errorMessages: string[] = [];

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

        if (error.response.status === 401) {
            alert(error.response.data.error.message);
        }

        if (error.response.status === 500) {
            alert(error.response.data.error.message);
        }
      });
  };
};

export const logOut = () => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .delete<LogoutRes>('http://127.0.0.1:8080/logout', {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(logOutAction());

        dispatch(push('/login'));
      })
      .catch((error) => {
        if (error.response.status === 400) {
            alert(error.response.data.error.message);
        }

        if (error.response.status === 500) {
            alert(error.response.data.error.message);
        }
      });
  };
};
