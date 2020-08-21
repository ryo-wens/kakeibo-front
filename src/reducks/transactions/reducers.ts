import * as Actions from './actions'
import {transactionsActions} from './actions'
import initialState from '../store/initialState';

export const transactionsReducers = (
  state = initialState.transactions,
  action : transactionsActions
) => {
  switch (action.type) {
    case Actions.ADD_TRANSACTIONS:
      return {
        ...state,
        ...action.payload
      }
  }
}
