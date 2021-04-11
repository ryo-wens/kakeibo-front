import * as Actions from './actions';
import { budgetsActions } from './actions';
import initialState from '../store/initialState';

export const budgetsReducer = (state = initialState.budgets, action: budgetsActions) => {
  switch (action.type) {
    case Actions.START_FETCH_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_YEARLY_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_YEARLY_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_YEARLY_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_YEARLY_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
