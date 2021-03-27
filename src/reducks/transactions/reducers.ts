import * as Actions from './actions';
import { transactionActions } from './actions';
import initialState from '../store/initialState';

export const transactionsReducer = (
  state = initialState.transactions,
  action: transactionActions
) => {
  switch (action.type) {
    case Actions.START_FETCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_LATEST_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_LATEST_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_LATEST_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_LATEST_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_SEARCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
