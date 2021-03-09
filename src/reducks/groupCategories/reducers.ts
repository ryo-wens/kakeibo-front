import * as Actions from './actions';
import { groupCategoriesActions } from './actions';
import initialState from '../store/initialState';

export const groupCategoriesReducer = (
  state = initialState.groupCategories,
  action: groupCategoriesActions
) => {
  switch (action.type) {
    case Actions.START_FETCH_GROUP_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_INCOME_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_EXPENSE_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_GROUP_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_GROUP_INCOME_CATEGORY:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_GROUP_EXPENSE_CATEGORY:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_GROUP_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_EDIT_GROUP_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_GROUP_INCOME_CATEGORY:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.EDIT_GROUP_EXPENSE_CATEGORY:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_EDIT_GROUP_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_GROUP_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_GROUP_INCOME_CATEGORY:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_GROUP_EXPENSE_CATEGORY:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_GROUP_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.RESET_GROUP_CATEGORIES_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
