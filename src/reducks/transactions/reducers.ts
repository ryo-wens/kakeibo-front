import * as Actions from './actions';
import { transactionActions } from './actions';
import initialState from '../store/initialState';

export const transactionsReducer = (
  state = initialState.transactions,
  action: transactionActions
) => {
  switch (action.type) {
    case Actions.FETCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_LATEST_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
