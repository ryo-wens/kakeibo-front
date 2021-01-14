import { GroupShoppingListActions } from './actions';
import initialState from '../store/initialState';
import * as Actions from './actions';

export const groupShoppingListReducers = (
  state = initialState.groupShoppingList,
  action: GroupShoppingListActions
) => {
  switch (action.type) {
    case Actions.START_FETCH_GROUP_EXPIRED_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_EXPIRED_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_EXPIRED_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_EXPIRED_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_TODAY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_TODAY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_MONTHLY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_MONTHLY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_MONTHLY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_MONTHLY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_GROUP_MONTHLY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
