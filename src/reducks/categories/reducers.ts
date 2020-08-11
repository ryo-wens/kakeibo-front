import * as Actions from './actions';
import { categoriesActions } from './actions';
import initialState from '../store/initialState';
import { Category } from './types';

export const categoriesReducer = (
  state = initialState.categories,
  action: categoriesActions
):
  | {
      incomeList: Category[];
      expenseList: never[];
    }
  | {
      expenseList: Category[];
      incomeList: never[];
    } => {
  switch (action.type) {
    case Actions.UPDATE_INCOME_CATEGORIES:
      return {
        ...state,
        incomeList: [...action.payload],
      };
    case Actions.UPDATE_EXPENSE_CATEGORIES:
      return {
        ...state,
        expenseList: [...action.payload],
      };
    default:
      return state;
  }
};
