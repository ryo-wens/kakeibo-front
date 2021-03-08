import {
  startFetchStandardBudgetsAction,
  fetchStandardBudgetsActions,
  cancelFetchStandardBudgetsAction,
  failedFetchStandardBudgetsAction,
  startEditStandardBudgetsAction,
  editStandardBudgetsActions,
  failedEditStandardBudgetsAction,
  startFetchCustomBudgetsActions,
  fetchCustomBudgetsActions,
  cancelFetchCustomBudgetsActions,
  failedFetchCustomBudgetsActions,
  startAddCustomBudgetsActions,
  addCustomBudgetsActions,
  failedAddCustomBudgetsActions,
  startEditCustomBudgetsActions,
  editCustomBudgetsActions,
  failedEditCustomBudgetsActions,
  startDeleteCustomBudgetsActions,
  deleteCustomBudgetsActions,
  failedDeleteCustomBudgetsActions,
  copyStandardBudgetsActions,
  startFetchYearlyBudgetsActions,
  fetchYearlyBudgetsActions,
  cancelFetchYearlyBudgetsActions,
  failedFetchYearlyBudgetsActions,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { Action, Dispatch } from 'redux';
import { State } from '../store/types';
import { isValidBudgetFormat } from '../../lib/validation';
import {
  BudgetsReq,
  CustomBudgetsRes,
  DeleteCustomBudgetsRes,
  fetchCustomBudgetsRes,
  fetchStandardBudgetsRes,
  StandardBudgetsListRes,
  YearlyBudgetsList,
} from './types';

export const fetchStandardBudgets = (signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startFetchStandardBudgetsAction());

    try {
      const result = await axios.get<fetchStandardBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const standardBudgetsList = result.data.standard_budgets;

      dispatch(fetchStandardBudgetsActions(standardBudgetsList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchStandardBudgetsAction());
      } else {
        dispatch(
          failedFetchStandardBudgetsAction(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const editStandardBudgets = (budgets: BudgetsReq, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const validBudgets = budgets.every((budget) => isValidBudgetFormat(budget.budget));
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    dispatch(startEditStandardBudgetsAction());
    const data = { standard_budgets: budgets };

    try {
      await axios.put<StandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchResult = await axios.get<fetchStandardBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/standard-budgets`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const editedStandardBudgetsList = fetchResult.data.standard_budgets;

      dispatch(editStandardBudgetsActions(editedStandardBudgetsList));
    } catch (error) {
      dispatch(
        failedEditStandardBudgetsAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const fetchYearlyBudgets = (year: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startFetchYearlyBudgetsActions());

    try {
      const result = await axios.get<YearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${year}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const yearlyBudgetsList = result.data;

      dispatch(fetchYearlyBudgetsActions(yearlyBudgetsList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchYearlyBudgetsActions());
      } else {
        dispatch(
          failedFetchYearlyBudgetsActions(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const fetchCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startFetchCustomBudgetsActions());

    try {
      const result = await axios.get<fetchCustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const customBudgetsList = result.data.custom_budgets;

      dispatch(fetchCustomBudgetsActions(customBudgetsList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchCustomBudgetsActions());
        return;
      } else {
        dispatch(
          failedFetchCustomBudgetsActions(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const copyStandardBudgets = () => {
  return (dispatch: Dispatch<Action>, getState: () => State) => {
    const standardBudgets = getState().budgets.standard_budgets_list;
    const customBudgets = getState().budgets.custom_budgets_list;

    const nextBudgets = standardBudgets.map((standardBudget) => {
      customBudgets.map((customBudget) => {
        return (customBudget.budget = standardBudget.budget);
      });
      return standardBudget;
    });

    dispatch(copyStandardBudgetsActions(nextBudgets));
  };
};

export const addCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  signal: CancelTokenSource,
  customBudgets: BudgetsReq
) => {
  const data = { custom_budgets: customBudgets };

  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const validBudgets = customBudgets.every((budget) => isValidBudgetFormat(budget.budget));
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }
    dispatch(startAddCustomBudgetsActions());

    try {
      await axios.post<CustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchCustomBudgetsResult = axios.get<fetchCustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchYearlyBudgetsResult = axios.get<YearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${selectYear}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const addedCustomBudgetsList = await fetchCustomBudgetsResult;
      const addedYearlyBudgetsList = await fetchYearlyBudgetsResult;

      dispatch(
        addCustomBudgetsActions(
          addedCustomBudgetsList.data.custom_budgets,
          addedYearlyBudgetsList.data
        )
      );
    } catch (error) {
      dispatch(
        failedAddCustomBudgetsActions(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const editCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  signal: CancelTokenSource,
  customBudgets: BudgetsReq
) => {
  const data = { custom_budgets: customBudgets };

  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const validBudgets = customBudgets.every((budget) => isValidBudgetFormat(budget.budget));
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }
    dispatch(startEditCustomBudgetsActions());

    try {
      await axios.put<CustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchCustomBudgetsResult = axios.get<fetchCustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchYearlyBudgetsResult = axios.get<YearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${selectYear}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const editedCustomBudgetsList = await fetchCustomBudgetsResult;
      const editedYearlyBudgetsList = await fetchYearlyBudgetsResult;

      dispatch(
        editCustomBudgetsActions(
          editedCustomBudgetsList.data.custom_budgets,
          editedYearlyBudgetsList.data
        )
      );
    } catch (error) {
      dispatch(
        failedEditCustomBudgetsActions(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const deleteCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startDeleteCustomBudgetsActions());

    try {
      await axios.delete<DeleteCustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          withCredentials: true,
        }
      );

      const fetchYearlyBudgetsResult = axios.get<YearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/budgets/${selectYear}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const deletedYearlyBudgetsList = await fetchYearlyBudgetsResult;

      dispatch(deleteCustomBudgetsActions(deletedYearlyBudgetsList.data));
    } catch (error) {
      dispatch(
        failedDeleteCustomBudgetsActions(error.response.status, error.response.data.error.message)
      );
    }
  };
};
