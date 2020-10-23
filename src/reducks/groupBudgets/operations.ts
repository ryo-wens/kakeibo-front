import { updateGroupStandardBudgetsActions } from './actions';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { GroupStandardBudgetsList, GroupStandardBudgetsListRes, GroupBudgetsReq } from './types';
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
