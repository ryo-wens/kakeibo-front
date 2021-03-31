import {
  startFetchGroupStandardBudgetsActions,
  fetchGroupStandardBudgetsActions,
  cancelFetchGroupStandardBudgetsActions,
  failedFetchGroupStandardBudgetsActions,
  startEditGroupStandardBudgetsActions,
  editGroupStandardBudgetsActions,
  failedEditGroupStandardBudgetsActions,
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
import { accountServiceInstance } from '../axiosConfig';
import { Action, Dispatch } from 'redux';
import {
  GroupStandardBudgetsListRes,
  GroupCustomBudgetsListRes,
  GroupBudgetsReq,
  GroupYearlyBudgetsList,
  DeleteGroupCustomBudgetsRes,
} from './types';
import { isValidBudgetFormat } from '../../lib/validation';

export const fetchGroupStandardBudgets = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startFetchGroupStandardBudgetsActions());

    try {
      const result = await accountServiceInstance.get<GroupStandardBudgetsListRes>(
        `/groups/${groupId}/standard-budgets`,
        { cancelToken: signal.token }
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

export const editGroupStandardBudgets = (groupId: number, groupBudgets: GroupBudgetsReq) => {
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
      await accountServiceInstance.put<GroupStandardBudgetsListRes>(
        `/groups/${groupId}/standard-budgets`,
        JSON.stringify(data)
      );

      const fetchResult = accountServiceInstance.get<GroupStandardBudgetsListRes>(
        `/groups/${groupId}/standard-budgets`
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
      const result = await accountServiceInstance.get<GroupYearlyBudgetsList>(
        `/groups/${groupId}/budgets/${year}`,
        { cancelToken: signal.token }
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

export const fetchGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  groupId: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startFetchGroupCustomBudgetsActions());

    try {
      const result = await accountServiceInstance.get<GroupCustomBudgetsListRes>(
        `/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        { cancelToken: signal.token }
      );

      const groupCustomBudgets =
        result.data.custom_budgets === null ? [] : result.data.custom_budgets;

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
      await accountServiceInstance.post<GroupCustomBudgetsListRes>(
        `/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data)
      );

      const fetchCustomResult = accountServiceInstance.get<GroupCustomBudgetsListRes>(
        `/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`
      );

      const fetchYearlyResult = accountServiceInstance.get<GroupYearlyBudgetsList>(
        `/groups/${groupId}/budgets/${selectYear}`
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
      await accountServiceInstance.put<GroupCustomBudgetsListRes>(
        `/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data)
      );

      const fetchCustomResult = accountServiceInstance.get<GroupCustomBudgetsListRes>(
        `/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`
      );

      const fetchYearlyResult = accountServiceInstance.get<GroupYearlyBudgetsList>(
        `/groups/${groupId}/budgets/${selectYear}`
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
  groupId: number
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startDeleteGroupCustomBudgetsActions());

    try {
      await accountServiceInstance.delete<DeleteGroupCustomBudgetsRes>(
        `/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`
      );

      const fetchYearlyResult = accountServiceInstance.get<GroupYearlyBudgetsList>(
        `/groups/${groupId}/budgets/${selectYear}`
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
