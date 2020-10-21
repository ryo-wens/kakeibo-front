import * as Actions from './actions';
import { groupBudgetsActions } from './actions';
import initialState from '../store/initialState';

export const groupBudgetsReducer = (
  state = initialState.groupBudgets,
  action: groupBudgetsActions
) => {
  switch (action.type) {
    case Actions.UPDATE_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        groupStandardBudgetsList: [...action.payload],
      };
    default:
      return state;
  }
};