import * as Actions from './actions';
import { groupTransactionsAction } from './actions';
import initialState from '../store/initialState';

export const groupTransactionsReducer = (
  state = initialState.groupTransactions,
  action: groupTransactionsAction
) => {
  switch (action.type) {
    case Actions.START_FETCH_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_LATEST_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_LATEST_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_LATEST_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_LATEST_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_YEARLY_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_YEARLY_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_YEARLY_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_YEARLY_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_YEARLY_ACCOUNT_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_YEARLY_ACCOUNT_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_YEARLY_ACCOUNT_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_YEARLY_ACCOUNT_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_GROUP_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_SEARCH_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SEARCH_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_SEARCH_GROUP_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
