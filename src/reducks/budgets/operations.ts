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
  startFetchYearlyBudgetsActions,
  fetchYearlyBudgetsActions,
  cancelFetchYearlyBudgetsActions,
  failedFetchYearlyBudgetsActions,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { accountServiceInstance } from '../axiosConfig';
import { Action, Dispatch } from 'redux';
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
      const result = await accountServiceInstance.get<fetchStandardBudgetsRes>(
        '/standard-budgets',
        { cancelToken: signal.token }
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

export const editStandardBudgets = (budgets: BudgetsReq) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const validBudgets = budgets.every((budget) => isValidBudgetFormat(budget.budget));
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    dispatch(startEditStandardBudgetsAction());
    const data = { standard_budgets: budgets };

    try {
      await accountServiceInstance.put<StandardBudgetsListRes>(
        '/standard-budgets',
        JSON.stringify(data)
      );

      const fetchResult = accountServiceInstance.get<fetchStandardBudgetsRes>('/standard-budgets');

      const editedStandardBudgetsList = await fetchResult;

      dispatch(editStandardBudgetsActions(editedStandardBudgetsList.data.standard_budgets));
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
      const result = await accountServiceInstance.get<YearlyBudgetsList>(`/budgets/${year}`, {
        cancelToken: signal.token,
      });
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
      const result = await accountServiceInstance.get<fetchCustomBudgetsRes>(
        `/custom-budgets/${selectYear}-${selectMonth}`,
        { cancelToken: signal.token }
      );
      const customBudgetsList =
        result.data.custom_budgets === null ? [] : result.data.custom_budgets;

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

export const addCustomBudgets = (
  selectYear: string,
  selectMonth: string,
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
      await accountServiceInstance.post<CustomBudgetsRes>(
        `/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data)
      );

      const fetchCustomBudgetsResult = accountServiceInstance.get<fetchCustomBudgetsRes>(
        `/custom-budgets/${selectYear}-${selectMonth}`
      );

      const fetchYearlyBudgetsResult = accountServiceInstance.get<YearlyBudgetsList>(
        `/budgets/${selectYear}`
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
      await accountServiceInstance.put<CustomBudgetsRes>(
        `/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data)
      );

      const fetchCustomBudgetsResult = accountServiceInstance.get<fetchCustomBudgetsRes>(
        `/custom-budgets/${selectYear}-${selectMonth}`
      );

      const fetchYearlyBudgetsResult = accountServiceInstance.get<YearlyBudgetsList>(
        `/budgets/${selectYear}`
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

export const deleteCustomBudgets = (selectYear: string, selectMonth: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startDeleteCustomBudgetsActions());

    try {
      await accountServiceInstance.delete<DeleteCustomBudgetsRes>(
        `/custom-budgets/${selectYear}-${selectMonth}`
      );

      const fetchYearlyBudgetsResult = accountServiceInstance.get<YearlyBudgetsList>(
        `/budgets/${selectYear}`
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
