import { push } from 'connected-react-router';
import { Action, Dispatch } from 'redux';

export const isValidBudgetFormat = (budget: number) => {
  const regex = /^([1-9]\d*|0)$/;
  return regex.test(String(budget));
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
