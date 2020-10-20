import { updateGroupStandardBudgetsActions } from './actions';
import axios from 'axios';
import { Action, Dispatch } from 'redux';
import { GroupStandardBudgetsListRes } from './types';
import { errorHandling } from '../../lib/validation';

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
        const groupStandardBudgetsList = res.data.groupStandardBudgetsList;
        dispatch(updateGroupStandardBudgetsActions(groupStandardBudgetsList));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
