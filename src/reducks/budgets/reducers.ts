import * as Actions from './actions';
import { budgetsActions } from './actions';
import initialState from '../store/initialState';

export const budgetsReducer = (state = initialState.budgets, action: budgetsActions) => {
  switch (action.type) {
    case Actions.FETCH_STANDARD_BUDGETS:
      return {
        ...state,
        standard_budgets_list: [...action.payload],
      };
    default:
      return state;
  }
};
