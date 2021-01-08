import {
  fetchGroupStandardBudgetsActions,
  fetchGroupCustomBudgetsActions,
  fetchGroupYearlyBudgetsActions,
  addGroupCustomBudgetsActions,
  editGroupStandardBudgetsActions,
  editGroupCustomBudgetsActions,
  copyGroupStandardBudgetsActions,
  deleteGroupCustomBudgetsActions,
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
import { errorHandling, isValidBudgetFormat } from '../../lib/validation';
import { totalCustomBudgets } from '../../lib/validation';
import { State } from '../store/types';
import { customBudgetType, standardBudgetType } from '../../lib/constant';

export const fetchGroupStandardBudgets = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
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
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const editGroupStandardBudgets = (groupId: number, groupBudgets: GroupBudgetsReq) => {
  const data = { standard_budgets: groupBudgets };
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = groupBudgets.every((groupBudget) =>
      isValidBudgetFormat(groupBudget.budget)
    );

    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    try {
      const result = await axios.put<GroupStandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/standard-budgets`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      const editedGroupStandardBudgetsList: GroupStandardBudgetsList = result.data.standard_budgets;
      const groupStandardBudgetsList: GroupStandardBudgetsList = getState().groupBudgets
        .groupStandardBudgetsList;

      const nextGroupStandardBudgetsList = groupStandardBudgetsList.map((GroupStandardBudget) => {
        const editGroupStandardBudget = editedGroupStandardBudgetsList.find(
          (item: { big_category_id: number }) =>
            item.big_category_id === GroupStandardBudget.big_category_id
        );
        if (editGroupStandardBudget) {
          return editGroupStandardBudget;
        }
        return GroupStandardBudget;
      });

      dispatch(editGroupStandardBudgetsActions(nextGroupStandardBudgetsList));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const fetchGroupYearlyBudgets = (
  groupId: number,
  year: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
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
        return;
      } else {
        errorHandling(dispatch, error);
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
        return;
      } else {
        errorHandling(dispatch, error);
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
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = groupCustomBudgets.every((groupCustomBudget) =>
      isValidBudgetFormat(groupCustomBudget.budget)
    );

    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    try {
      const result = await axios.post<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      const addedGroupCustomBudgetsList: GroupCustomBudgetsList = result.data.custom_budgets;
      const groupYearlyBudgetsList: GroupYearlyBudgetsList = getState().groupBudgets
        .groupYearlyBudgetsList;

      const groupCustomBudgets: number[] = addedGroupCustomBudgetsList.map((groupCustomBudget) => {
        return groupCustomBudget.budget;
      });

      const prevGroupCustomBudgetsTotal =
        groupYearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1].monthly_total_budget;

      const nreTotalBudget = () => {
        if (totalCustomBudgets(groupCustomBudgets) < prevGroupCustomBudgetsTotal) {
          return (
            groupYearlyBudgetsList.yearly_total_budget -
            (prevGroupCustomBudgetsTotal - totalCustomBudgets(groupCustomBudgets))
          );
        } else {
          return (
            groupYearlyBudgetsList.yearly_total_budget +
            (totalCustomBudgets(groupCustomBudgets) - prevGroupCustomBudgetsTotal)
          );
        }
      };

      groupYearlyBudgetsList.yearly_total_budget = nreTotalBudget();

      groupYearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1] = {
        month: `${selectYear}年${selectMonth}月`,
        budget_type: customBudgetType,
        monthly_total_budget: totalCustomBudgets(groupCustomBudgets),
      };

      dispatch(addGroupCustomBudgetsActions(groupYearlyBudgetsList));
    } catch (error) {
      errorHandling(dispatch, error);
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
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = groupCustomBudgets.every((groupCustomBudget) =>
      isValidBudgetFormat(groupCustomBudget.budget)
    );

    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    try {
      const result = await axios.put<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );
      const editedGroupCustomBudgetsList: GroupCustomBudgetsList = result.data.custom_budgets;
      const groupYearlyBudgetsLis: GroupYearlyBudgetsList = getState().groupBudgets
        .groupYearlyBudgetsList;

      const prevGroupCustomBudgetTotal =
        groupYearlyBudgetsLis.monthly_budgets[Number(selectMonth) - 1].monthly_total_budget;

      const groupCustomBudget = editedGroupCustomBudgetsList.map((groupBudget) => {
        return groupBudget.budget;
      });

      const newTotalBudget = () => {
        if (totalCustomBudgets(groupCustomBudget) < prevGroupCustomBudgetTotal) {
          return (
            groupYearlyBudgetsLis.yearly_total_budget -
            (prevGroupCustomBudgetTotal - totalCustomBudgets(groupCustomBudget))
          );
        } else {
          return (
            groupYearlyBudgetsLis.yearly_total_budget +
            (totalCustomBudgets(groupCustomBudget) - prevGroupCustomBudgetTotal)
          );
        }
      };

      groupYearlyBudgetsLis.yearly_total_budget = newTotalBudget();

      groupYearlyBudgetsLis.monthly_budgets[Number(selectMonth) - 1] = {
        month: `${selectYear}年${selectMonth}月`,
        budget_type: customBudgetType,
        monthly_total_budget: totalCustomBudgets(groupCustomBudget),
      };

      dispatch(editGroupCustomBudgetsActions(groupYearlyBudgetsLis));
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const deleteGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
  groupId: number
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    try {
      const result = await axios.delete<DeleteGroupCustomBudgetsRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/custom-budgets/${selectYear}-${selectMonth}`,
        {
          withCredentials: true,
        }
      );
      const message = result.data.message;

      const groupStandardBudgetsList: GroupStandardBudgetsList = getState().groupBudgets
        .groupStandardBudgetsList;

      const groupYearlyBudgetsList: GroupYearlyBudgetsList = getState().groupBudgets
        .groupYearlyBudgetsList;

      const groupStandardBudgets = groupStandardBudgetsList.map((groupStandardBudget) => {
        return groupStandardBudget.budget;
      });

      const totalGroupStandardBudget = () => {
        let total = 0;

        for (let i = 0, len = groupStandardBudgets.length; i < len; i++) {
          total += groupStandardBudgets[i];
        }
        return total;
      };

      const newTotalBudget = () => {
        const deleteBudget =
          groupYearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1].monthly_total_budget;

        if (totalGroupStandardBudget() > deleteBudget) {
          return (
            groupYearlyBudgetsList.yearly_total_budget + (totalGroupStandardBudget() - deleteBudget)
          );
        } else {
          return (
            groupYearlyBudgetsList.yearly_total_budget - (deleteBudget - totalGroupStandardBudget())
          );
        }
      };

      groupYearlyBudgetsList.yearly_total_budget = newTotalBudget();

      groupYearlyBudgetsList.monthly_budgets[Number(selectMonth) - 1] = {
        month: `${selectYear}年${selectMonth}月`,
        budget_type: standardBudgetType,
        monthly_total_budget: totalGroupStandardBudget(),
      };

      dispatch(deleteGroupCustomBudgetsActions(groupYearlyBudgetsList));
      alert(message);
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
