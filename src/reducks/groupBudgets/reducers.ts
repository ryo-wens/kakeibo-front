import * as Actions from './actions';
import { groupBudgetsActions } from './actions';
import initialState from '../store/initialState';

export const groupBudgetsReducer = (
  state = initialState.groupBudgets,
  action: groupBudgetsActions
) => {
  switch (action.type) {
    case Actions.START_FETCH_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_YEARLY_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_YEARLY_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_YEARLY_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_YEARLY_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.COPY_GROUP_STANDARD_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_GROUP_CUSTOM_BUDGETS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
