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
    case Actions.UPDATE_LATEST_TRANSACTIONS:
      return {
        ...state,
        latestTransactionsList: [...action.payload],
      };
    case Actions.UPDATE_TRANSACTIONS:
      return {
        ...state,
        transactionsList: [...action.payload],
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
