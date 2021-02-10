import * as Actions from './actions';
import { categoriesActions } from './actions';
import initialState from '../store/initialState';

export const categoriesReducer = (state = initialState.categories, action: categoriesActions) => {
  switch (action.type) {
    case Actions.FETCH_INCOME_CATEGORIES:
      return {
        ...state,
        incomeList: [...action.payload],
      };
    case Actions.FETCH_EXPENSE_CATEGORIES:
      return {
        ...state,
        expenseList: [...action.payload],
      };
    case Actions.FAILED_FETCH_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_INCOME_CUSTOM_CATEGORY:
      return {
        ...state,
        incomeList: [...action.payload],
      };
    case Actions.ADD_EXPENSE_CUSTOM_CATEGORY:
      return {
        ...state,
        expenseList: [...action.payload],
      };
    case Actions.EDIT_INCOME_CUSTOM_CATEGORY:
      return {
        ...state,
        incomeList: [...action.payload],
      };
    case Actions.EDIT_EXPENSE_CUSTOM_CATEGORY:
      return {
        ...state,
        expenseList: [...action.payload],
      };
    case Actions.DELETE_INCOME_CUSTOM_CATEGORY:
      return {
        ...state,
        incomeList: [...action.payload],
      };
    case Actions.DELETE_EXPENSE_CUSTOM_CATEGORY:
      return {
        ...state,
        expenseList: [...action.payload],
      };
    default:
      return state;
  }
};
