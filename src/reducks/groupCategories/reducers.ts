import * as Actions from './actions';
import { groupCategoriesActions } from './actions';
import initialState from '../store/initialState';

export const groupCategoriesReducer = (
  state = initialState.groupCategories,
  action: groupCategoriesActions
) => {
  switch (action.type) {
    case Actions.FETCH_GROUP_INCOME_CATEGORIES:
      return {
        ...state,
        groupIncomeList: [...action.payload],
      };
    case Actions.FETCH_GROUP_EXPENSE_CATEGORIES:
      return {
        ...state,
        groupExpenseList: [...action.payload],
      };
    case Actions.ADD_GROUP_INCOME_CATEGORY:
      return {
        ...state,
        groupIncomeList: [...action.payload],
      };
    case Actions.ADD_GROUP_EXPENSE_CATEGORY:
      return {
        ...state,
        groupExpenseList: [...action.payload],
      };
    case Actions.EDIT_GROUP_INCOME_CATEGORY:
      return {
        ...state,
        groupIncomeList: [...action.payload],
      };
    case Actions.EDIT_GROUP_EXPENSE_CATEGORY:
      return {
        ...state,
        groupExpenseList: [...action.payload],
      };
    case Actions.DELETE_GROUP_INCOME_CATEGORY:
      return {
        ...state,
        groupIncomeList: [...action.payload],
      };
    case Actions.DELETE_GROUP_EXPENSE_CATEGORY:
      return {
        ...state,
        groupExpenseList: [...action.payload],
      };
    default:
      return state;
  }
};
