import {
  startFetchGroupStandardBudgetsActions,
  fetchGroupStandardBudgetsActions,
  cancelFetchGroupStandardBudgetsActions,
  failedFetchGroupStandardBudgetsActions,
  startEditGroupStandardBudgetsActions,
  editGroupStandardBudgetsActions,
  failedEditGroupStandardBudgetsActions,
  copyGroupStandardBudgetsActions,
  startFetchGroupCustomBudgetsActions,
  fetchGroupCustomBudgetsActions,
  cancelFetchGroupCustomBudgetsActions,
  failedFetchGroupCustomBudgetsActions,
  startAddGroupCustomBudgetsActions,
  addGroupCustomBudgetsActions,
  failedAddGroupCustomBudgetsActions,
  startEditGroupCustomBudgetsActions,
  editGroupCustomBudgetsActions,
  failedEditGroupCustomBudgetsActions,
  startDeleteGroupCustomBudgetsActions,
  deleteGroupCustomBudgetsActions,
  failedDeleteGroupCustomBudgetsActions,
  startFetchGroupYearlyBudgetsActions,
  fetchGroupYearlyBudgetsActions,
  cancelFetchGroupYearlyBudgetsActions,
  failedFetchGroupYearlyBudgetsActions,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { Action, Dispatch } from 'redux';
import {
  GroupStandardBudgetsList,
  GroupCustomBudgetsList,
  GroupStandardBudgetsListRes,
  GroupCustomBudgetsListRes,
  GroupBudgetsReq,
  GroupYearlyBudgetsList,
  DeleteGroupCustomBudgetsRes,
} from './types';
import { isValidBudgetFormat } from '../../lib/validation';
import { State } from '../store/types';

export const fetchGroupStandardBudgets = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startFetchGroupStandardBudgetsActions());

    try {
      const result = await axios.get<GroupStandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const groupStandardBudgetsList = result.data.standard_budgets;
      dispatch(fetchGroupStandardBudgetsActions(groupStandardBudgetsList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupStandardBudgetsActions());
      } else {
        dispatch(
          failedFetchGroupStandardBudgetsActions(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const editGroupStandardBudgets = (
  groupId: number,
  signal: CancelTokenSource,
  groupBudgets: GroupBudgetsReq
) => {
  const data = { standard_budgets: groupBudgets };
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const validBudgets = groupBudgets.every((groupBudget) =>
      isValidBudgetFormat(groupBudget.budget)
    );

    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    dispatch(startEditGroupStandardBudgetsActions());

    try {
      await axios.put<GroupStandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchResult = axios.get<GroupStandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const editedGroupStandardBudgetsList = await fetchResult;

      dispatch(
        editGroupStandardBudgetsActions(editedGroupStandardBudgetsList.data.standard_budgets)
      );
    } catch (error) {
      dispatch(
        failedEditGroupStandardBudgetsActions(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const fetchGroupYearlyBudgets = (
  groupId: number,
  year: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startFetchGroupYearlyBudgetsActions());

    try {
      const result = await axios.get<GroupYearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${year}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const groupYearlyBudgetsList = result.data;
      dispatch(fetchGroupYearlyBudgetsActions(groupYearlyBudgetsList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupYearlyBudgetsActions());
      } else {
        dispatch(
          failedFetchGroupYearlyBudgetsActions(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const copyGroupStandardBudgets = () => {
  return (dispatch: Dispatch<Action>, getState: () => State) => {
    const groupStandardBudgets: GroupStandardBudgetsList = getState().groupBudgets
      .groupStandardBudgetsList;

    const groupCustomBudgets: GroupCustomBudgetsList = getState().groupBudgets
      .groupCustomBudgetsList;

    const nextGroupCustomBudgets = groupStandardBudgets.map((groupStandardBudget) => {
      groupCustomBudgets.map((groupCustomBudget) => {
        return (groupCustomBudget.budget = groupStandardBudget.budget);
      });

      return groupStandardBudget;
    });

    dispatch(copyGroupStandardBudgetsActions(nextGroupCustomBudgets));
  };
};

export const fetchGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  groupId: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startFetchGroupCustomBudgetsActions());

    try {
      const result = await axios.get<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const groupCustomBudgets = result.data.custom_budgets;

      dispatch(fetchGroupCustomBudgetsActions(groupCustomBudgets));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupCustomBudgetsActions());
      } else {
        dispatch(
          failedFetchGroupCustomBudgetsActions(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const addGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  groupId: number,
  signal: CancelTokenSource,
  groupCustomBudgets: GroupBudgetsReq
) => {
  const data = { custom_budgets: groupCustomBudgets };
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const validBudgets = groupCustomBudgets.every((groupCustomBudget) =>
      isValidBudgetFormat(groupCustomBudget.budget)
    );

    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    dispatch(startAddGroupCustomBudgetsActions());

    try {
      await axios.post<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchCustomResult = axios.get<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchYearlyResult = axios.get<GroupYearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${selectYear}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const addedGroupCustomBudgetsList = await fetchCustomResult;
      const addedGroupYearlyBudgetsList = await fetchYearlyResult;

      dispatch(
        addGroupCustomBudgetsActions(
          addedGroupCustomBudgetsList.data.custom_budgets,
          addedGroupYearlyBudgetsList.data
        )
      );
    } catch (error) {
      dispatch(
        failedAddGroupCustomBudgetsActions(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const editGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  groupId: number,
  signal: CancelTokenSource,
  groupCustomBudgets: GroupBudgetsReq
) => {
  const data = { custom_budgets: groupCustomBudgets };
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const validBudgets = groupCustomBudgets.every((groupCustomBudget) =>
      isValidBudgetFormat(groupCustomBudget.budget)
    );

    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    dispatch(startEditGroupCustomBudgetsActions());

    try {
      await axios.put<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchCustomResult = axios.get<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const fetchYearlyResult = axios.get<GroupYearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${selectYear}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const editedGroupCustomBudgetsList = await fetchCustomResult;
      const editedGroupYearlyBudgetsList = await fetchYearlyResult;

      dispatch(
        editGroupCustomBudgetsActions(
          editedGroupCustomBudgetsList.data.custom_budgets,
          editedGroupYearlyBudgetsList.data
        )
      );
    } catch (error) {
      dispatch(
        failedEditGroupCustomBudgetsActions(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const deleteGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  groupId: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startDeleteGroupCustomBudgetsActions());

    try {
      await axios.delete<DeleteGroupCustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          withCredentials: true,
        }
      );

      const fetchYearlyResult = axios.get<GroupYearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/budgets/${selectYear}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const deletedGroupYearlyBudgetsList = await fetchYearlyResult;

      dispatch(deleteGroupCustomBudgetsActions(deletedGroupYearlyBudgetsList.data));
    } catch (error) {
      dispatch(
        failedDeleteGroupCustomBudgetsActions(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};
