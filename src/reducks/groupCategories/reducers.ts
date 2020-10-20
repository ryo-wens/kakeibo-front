import * as Actions from './actions';
import { groupCategoriesActions } from './actions';
import initialState from '../store/initialState';
import { GroupCategory } from './types';

export const groupCategoriesReducer = (
  state = initialState.groupCategories,
  action: groupCategoriesActions
):
  | {
      groupIncomeList: GroupCategory[];
      groupExpenseList: never[];
    }
  | {
      groupExpenseList: GroupCategory[];
      groupIncomeList: never[];
    } => {
  switch (action.type) {
    case Actions.UPDATE_GROUP_INCOME_CATEGORIES:
      return {
        ...state,
        groupIncomeList: [...action.payload],
      };
    case Actions.UPDATE_GROUP_EXPENSE_CATEGORIES:
      return {
        ...state,
        groupExpenseList: [...action.payload],
      };
    default:
      return state;
  }
};
