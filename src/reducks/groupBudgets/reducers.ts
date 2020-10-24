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
    case Actions.FETCH_GROUP_YEARLY_BUDGETS:
      return {
        ...state,
        groupYearlyBudgetsList: action.payload,
      };
    case Actions.UPDATE_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        groupCustomBudgetsList: [...action.payload],
      };
    case Actions.COPY_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        groupCustomBudgetsList: [...action.payload],
      };
    case Actions.DELETE_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        groupYearlyBudgetsList: action.payload,
      };
    default:
      return state;
  }
};
