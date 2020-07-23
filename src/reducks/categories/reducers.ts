import * as Actions from './actions';
import { categoriesActions } from './actions';
import initialState from '../store/initialState';

export const categoriesReducer = (
  state = initialState.categories,
  action: categoriesActions
) => {
  switch (action.type) {
    case Actions.GET_INCOME_CATEGORIES:
      return {
        ...state,
        incomeList: [...action.payload],
      };
    case Actions.GET_EXPENSE_CATEGORIES:
      return {
        ...state,
        expenseList: [...action.payload],
      };
    default:
      return state;
  }
};
