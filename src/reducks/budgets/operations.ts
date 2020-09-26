import { updateStandardBudgets, fetchYearlyBudgets, updateCustomBudgets } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { push } from 'connected-react-router';
import { FetchYearlyBudgetsList } from './types';

interface fetchStandardBudgetsRes {
  standard_budgets: [];
}

interface fetchCustomBudgetsRes {
  custom_budgets: [];
}

export const fetchStandardBudgets = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<fetchStandardBudgetsRes>('http://127.0.0.1:8081/standard-budgets', {
        withCredentials: true,
      })
      .then((res) => {
        const standardBudgetsList = res.data.standard_budgets;
        dispatch(updateStandardBudgets(standardBudgetsList));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.data.error.message);
          dispatch(push('/login'));
        }

        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};

export const getYearlyBudgets = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<FetchYearlyBudgetsList>('http://127.0.0.1:8081/budgets/2020', {
        withCredentials: true,
      })
      .then((res) => {
        const yearlyBudgetsList = res.data;
        dispatch(fetchYearlyBudgets(yearlyBudgetsList));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.data.error.message);
          dispatch(push('/login'));
        }

        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};

export const fetchCustomBudgets = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<fetchCustomBudgetsRes>('http://127.0.0.1:8081/custom-budgets/2020-07', {
        withCredentials: true,
      })
      .then((res) => {
        const customBudgets = res.data.custom_budgets;
        dispatch(updateCustomBudgets(customBudgets));
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.error.message);
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
