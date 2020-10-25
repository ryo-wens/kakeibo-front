import * as Actions from './actions';
import { groupTransactionsAction } from './actions';
import initialState from '../store/initialState';

export const groupTransactionsReducer = (
  state = initialState.groupTransactions,
  action: groupTransactionsAction
) => {
  switch (action.type) {
    case Actions.UPDATE_GROUP_TRANSACTIONS:
      return {
        ...state,
        groupTransactionsList: [...action.payload],
      };
    default:
      return state;
  }
};
