import { signUpAction, signInAction } from './actions';
import { Dispatch, Action } from 'redux';

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
    if (userId.length > 10) {
      alert('ユーザーIDは10文字以下で入力してください。');
      return null;
    }
    if (userName.length > 50) {
      alert('ユーザー名は50文字以下で入力してください。');
      return null;
    }
    if (email.length < 5) {
      alert('メールアドレスは5文字以上で入力してください。');
      return null;
    }
    if (email.length > 50) {
      alert('メールアドレスは50文字以下で入力してください。');
      return null;
    }
    if (!isValidEmailFormat(email)) {
      alert(
        'メールアドレスの形式に誤りがあります。正しく入力し直してください。'
      );
      return null;
    }
    if (password.length < 8) {
      alert('パスワードは8文字以上で入力してください。');
      return null;
    }
    if (password.length > 50) {
      alert('パスワードは50文字以下で入力してください。');
      return null;
    }
    if (password !== confirmPassword) {
      alert(
        'パスワードと確認パスワードが一致しません。もう一度入力してください。'
      );
      return null;
    }
    dispatch(signUpAction(userId, userName, email, password, confirmPassword));
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    if (!isValidEmailFormat(email)) {
      alert(
        'メールアドレスの形式に誤りがあります。正しく入力し直してください。'
      );
      return null;
    }
    dispatch(signInAction(email, password));
  };
};
