import { push } from 'connected-react-router';
import { Action, Dispatch } from 'redux';

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

export const isValidPreventBeginningZero = (value: number) => {
  const regexp = /^0/;
  return regexp.test(String(value));
};

export const errorHandling = (
  dispatch: Dispatch<Action>,
  error: {
    response: { data: { error: { message: string } }; status: number };
  }
) => {
  if (error && error.response) {
    alert(error.response.data.error.message);
    if (error.response.status === 401) {
      dispatch(push('/login'));
    }
  } else {
    alert(error);
  }
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
