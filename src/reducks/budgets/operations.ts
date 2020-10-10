import { fetchYearlyBudgets, updateCustomBudgets, updateStandardBudgets } from './actions';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { State } from '../store/types';
import { isValidBudgetFormat } from '../../lib/constant';
import {
  editStandardBudgetsReq,
  fetchCustomBudgetsRes,
  fetchStandardBudgetsRes,
  FetchYearlyBudgetsList,
  StandardBudgetsList,
  StandardBudgetsListRes,
} from './types';

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
        } else if (error && error.response) {
          alert(error.response.data.error.message);
        }
      });
  };
};

export const editStandardBudgets = (budgets: editStandardBudgetsReq) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = budgets.every((budget) => isValidBudgetFormat(budget.budget));
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    const data = { standard_budgets: budgets };
    await axios
      .put<StandardBudgetsListRes>('http://127.0.0.1:8081/standard-budgets', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        const editStandardBudgetsList: StandardBudgetsList = res.data.standard_budgets;
        const standardBudgetsList: StandardBudgetsList = getState().budgets.standard_budgets_list;

        const nextStandardBudgetsList = standardBudgetsList.map((standardBudget) => {
          const editStandardBudget = editStandardBudgetsList.find(
            (item: { big_category_id: number }) =>
              item.big_category_id === standardBudget.big_category_id
          );
          if (editStandardBudget) {
            return editStandardBudget;
          }
          return standardBudget;
        });
        dispatch(updateStandardBudgets(nextStandardBudgetsList));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.data.error.message);
          dispatch(push('/login'));
        } else if (error && error.response) {
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
        } else if (error && error.response) {
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
        if (error.response.status === 401) {
          alert(error.response.data.error.message);
          dispatch(push('/login'));
        } else if (error && error.response) {
          alert(error.response.data.error.message);
        }
      });
  };
};
