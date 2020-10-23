import {
  updateGroupStandardBudgetsActions,
  fetchGroupYearlyBudgetsActions,
  copyGroupStandardBudgetsActions,
  updateGroupCustomBudgetsActions,
} from './actions';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
import {
  GroupStandardBudgetsList,
  GroupCustomBudgetsList,
  GroupStandardBudgetsListRes,
  GroupCustomBudgetsListRes,
  GroupBudgetsReq,
  GroupYearlyBudgetsList,
} from './types';
import { errorHandling, isValidBudgetFormat } from '../../lib/validation';
import { State } from '../store/types';

export const fetchGroupStandardBudgets = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<GroupStandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/standard-budgets`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupStandardBudgetsList = res.data.standard_budgets;
        dispatch(updateGroupStandardBudgetsActions(groupStandardBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const editGroupStandardBudgets = (groupBudgets: GroupBudgetsReq) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const validBudgets = groupBudgets.every((groupBudget) =>
      isValidBudgetFormat(groupBudget.budget)
    );
    if (!validBudgets) {
      alert('予算は0以上の整数で入力してください。');
      return;
    }

    const data = { standard_budgets: groupBudgets };

    await axios
      .put<GroupStandardBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/standard-budgets`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const editedGroupStandardBudgetsList: GroupStandardBudgetsList = res.data.standard_budgets;
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

        dispatch(updateGroupStandardBudgetsActions(nextGroupStandardBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const fetchGroupYearlyBudgets = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<GroupYearlyBudgetsList>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/budgets/2020`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupYearlyBudgetsList = res.data;
        dispatch(fetchGroupYearlyBudgetsActions(groupYearlyBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
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

export const fetchGroupCustomBudgets = (selectYear: string, selectMonth: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/custom-budgets/${selectYear}-${selectMonth}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupCustomBudgets = res.data.custom_budgets;

        dispatch(updateGroupCustomBudgetsActions(groupCustomBudgets));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const addGroupCustomBudgets = (
  selectYear: string,
  selectMonth: string,
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

    await axios
      .post<GroupCustomBudgetsListRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/custom-budgets/${selectYear}-${selectMonth}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const addedGroupCustomBudgetsList: GroupCustomBudgetsList = res.data.custom_budgets;

        dispatch(updateGroupCustomBudgetsActions(addedGroupCustomBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
