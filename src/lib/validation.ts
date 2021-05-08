import React from 'react';

export const isValidBudgetFormat = (budget: number) => {
  const regex = /^([1-9]\d*|0)$/;
  return regex.test(String(budget));
};

export const isValidAmountFormat = (amount: string) => {
  const regex = /^([1-9]\d*|0)$/;
  return regex.test(amount);
};

export const isValidEmailFormat = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

export const isValidPasswordFormat = (password: string) => {
  const regex = /^([a-zA-Z0-9!-/:-@¥[-`{-~]{8,})$/;
  return regex.test(password);
};

export const isValidUserInfoFormat = (userId: string) => {
  const regex = /^.*\s/;
  return regex.test(userId);
};

export const isValidPreventBeginningZero = (value: number) => {
  const regexp = /^0/;
  return regexp.test(String(value));
};

export const totalStandardBudget = (standardBudget: number[]): number => {
  let total = 0;
  for (let i = 0; i < standardBudget.length; i++) {
    total += standardBudget[i];
  }

  return total;
};

export const totalCustomBudgets = (budgetList: number[]): number => {
  let total = 0;

  for (let i = 0; i < budgetList.length; i++) {
    total += budgetList[i];
  }

  return total;
};

export const onUserIdFocusOut = (
  userId: string,
  setUserIdMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!userId.length) {
    return '';
  } else if (isValidUserInfoFormat(userId)) {
    setUserIdMessage('空白を空けずに入力してください。');
  } else if (userId.length > 10) {
    setUserIdMessage('ユーザーIDは10文字以下で入力してください。');
  } else if (!isValidUserInfoFormat(userId)) {
    setUserIdMessage('');
  } else if (userId.length < 10) {
    setUserIdMessage('');
  }
};

export const onUserNameFocusOut = (
  userName: string,
  setUserNameMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!userName.length) {
    return '';
  } else if (isValidUserInfoFormat(userName)) {
    setUserNameMessage('空白を空けずに入力してください。');
  } else if (userName.length > 50) {
    setUserNameMessage('ユーザー名は50文字以下で入力してください。');
  } else if (!isValidUserInfoFormat(userName)) {
    setUserNameMessage('');
  } else if (userName.length < 50) {
    setUserNameMessage('');
  }
};

export const onEmailFocusOut = (
  email: string,
  setEmailMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!email.length) {
    return '';
  } else if (email.length < 5 || email.length > 50) {
    setEmailMessage('メールアドレスに誤りがあります。正しく入力してください。');
  } else if (!isValidEmailFormat(email)) {
    setEmailMessage('メールアドレス形式に誤りがあります。正しく入力し直してください。');
  } else if (isValidEmailFormat(email)) {
    setEmailMessage('');
  } else if (email.length > 5 || email.length < 50) {
    setEmailMessage('');
  }
};

export const onPasswordFocusOut = (
  password: string,
  setPassWordMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!password.length) {
    return '';
  } else if (password.length < 8) {
    setPassWordMessage('パスワードは8文字以上で入力してください。');
  } else if (password.length > 50) {
    setPassWordMessage('パスワードは50文字以下で入力してください。');
  } else if (password.length > 8) {
    setPassWordMessage('');
  } else if (password.length < 50) {
    setPassWordMessage('');
  }
};

export const onConfirmPasswordFocusOut = (
  password: string,
  confirmPassword: string,
  setConfirmPasswordMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (password !== confirmPassword) {
    setConfirmPasswordMessage('パスワードと確認パスワードが一致しません。入力し直してください。');
  } else if (password === confirmPassword) {
    setConfirmPasswordMessage('');
  }
};

export const passWordSubmit = (
  password: string,
  setPassWordMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!password.length) {
    return '';
  } else if (password.length < 8) {
    setPassWordMessage('パスワードは8文字以上で入力してください。');
  } else if (!isValidPasswordFormat(password)) {
    setPassWordMessage('パスワードに誤りがあります。パスワードを正しく入力してください。');
  } else if (password.length > 8) {
    setPassWordMessage('');
  } else if (isValidPasswordFormat(password)) {
    return '';
  } else if (password.length > 8) {
    setPassWordMessage('');
  }
};
