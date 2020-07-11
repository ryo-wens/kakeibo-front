import { signUpAction, logInAction, logOutAction } from './actions';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import axios from 'axios';

export const isValidEmailFormat = (email: string) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

export const signUp = (
  userId: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    // Validations
    let errorList: string[] = [];
    if (userId.length > 10) {
      errorList.push('ユーザーIDは10文字以下で入力してください。');
    }
    if (userName.length > 50) {
      errorList.push('ユーザー名は50文字以下で入力してください。');
    }
    if (email.length < 5) {
      errorList.push('メールアドレスは5文字以上で入力してください。');
    }
    if (email.length > 50) {
      errorList.push('メールアドレスは50文字以下で入力してください。');
    }
    if (!isValidEmailFormat(email)) {
      errorList.push(
        'メールアドレスの形式に誤りがあります。正しく入力し直してください。'
      );
    }
    if (password.length < 8) {
      errorList.push('パスワードは8文字以上で入力してください。');
    }
    if (password.length > 50) {
      errorList.push('パスワードは50文字以下で入力してください。');
    }
    if (password !== confirmPassword) {
      errorList.push(
        'パスワードと確認パスワードが一致しません。もう一度入力してください。'
      );
    }
    if (errorList.length > 0) {
      alert(errorList.join('\n'));
      return null;
    }

    const data = {
      id: 'kohh20',
      name: '千葉雄喜',
      email: 'kohh@gmail.com',
      password: 'kohh+kohh0721',
    };
    const res = await axios.post(
      'http://127.0.0.1:8080/signup',
      JSON.stringify(data)
      // {
      //   headers: { "Content-Type": "application/json;charset=UTF-8" },
      // }
    );
    if (res.status === 200) {
      console.log(res.data);
      dispatch(
        signUpAction(userId, userName, email, password, confirmPassword)
      );
      dispatch(push('/login'));
    }
    if (res.status === 400) {
      console.log(res.data);
      const error = res.data.error;
      let errorTargets: string[] = [];
      if (error.id !== '') {
        errorTargets.push('ID');
      }
      if (error.name !== '') {
        errorTargets.push('名前');
      }
      if (error.email !== '') {
        errorTargets.push('メールアドレス');
      }
      if (error.password !== '') {
        errorTargets.push('パスワード');
      }
      if (errorTargets.length > 0) {
        alert(errorTargets.join('\n'));
        return null;
      }
    }
    if (res.status === 409) {
      console.log(res.data);
      const error = res.data.error;
      let errorTargets: string[] = [];
      if (error.id !== '') {
        errorTargets.push('ID');
      }
      if (error.email !== '') {
        errorTargets.push('メールアドレス');
      }
      if (errorTargets.length > 0) {
        alert(errorTargets.join('\n'));
      }
    }
    if (res.status === 500) {
      const error = res.data.error;
      alert(Object.values(error.message));
    }
  };
};

export const logIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    if (!isValidEmailFormat(email)) {
      alert(
        'メールアドレスの形式に誤りがあります。正しく入力し直してください。'
      );
      return null;
    }
    const data = { email: 'kohh@gmail.com', password: 'kohh+kohh0721' };
    const res = await axios.post(
      'http://127.0.0.1:8080/login',
      JSON.stringify(data)
    );
    if (res.status === 200) {
      console.log(res.data);
      dispatch(logInAction(email, password));
      dispatch(push('/'));
    }
    if (res.status === 400) {
      const error = res.data.error;
      let errorTargets: string[] = [];
      if (error.email !== '') {
        errorTargets.push('メールアドレス');
      }
      if (error.password !== '') {
        errorTargets.push('パスワード');
      }
      if (errorTargets.length > 0) {
        alert(errorTargets.join('\n'));
        return null;
      }
    }
    if (res.status === 401) {
      const error = res.data.error;
      alert(Object.values(error.message));
    }
    if (res.status === 500) {
      const error = res.data.error;
      alert(Object.values(error.message));
    }
  };
};

export const logOut = () => {
  return async (dispatch: Dispatch<Action>) => {
    const res = await axios.delete('http://127.0.0.1:8080/logout', {
      data: { foo: 'bar' },
    });
    console.log(res);
    if (res.status === 200) {
      console.log(res.data);
      dispatch(logOutAction());
      dispatch(push('/login'));
    }
    if (res.status === 400) {
      console.log(res.data);
      const error = res.data.error;
      if (error.message !== '') {
        alert(Object.values(error.message));
      }
    }

    if (res.status === 500) {
      const error = res.data.error;
      alert(Object.values(error.message));
    }
  };
};
