import * as Actions from './actions'
import {transactionActions} from './actions'
import initialState from '../store/initialState';

export const transactionsReducers = (
  state = initialState.transactions,
  action : transactionActions
) => {
  switch (action.type) {
    case Actions.ADD_TRANSACTIONS:
      return {
        ...state,
        ...action.payload
      }
  }
}
