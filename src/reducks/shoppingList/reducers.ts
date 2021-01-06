import { ShoppingListActions } from './actions';
import * as Actions from './actions';
import initialState from '../store/initialState';

export const shoppingListReducers = (
  state = initialState.shoppingList,
  action: ShoppingListActions
) => {
  switch (action.type) {
    case Actions.START_FETCH_EXPIRED_SHOPPING_LIST:
      return {
        ...state,
        expiredShoppingList: { loading: action.payload },
      };
    case Actions.FETCH_EXPIRED_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_EXPIRED_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_EXPIRED_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_TODAY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_TODAY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_TODAY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_TODAY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_MONTHLY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_MONTHLY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_MONTHLY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_MONTHLY_SHOPPING_LIST:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_ADD_SHOPPING_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_SHOPPING_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_ADD_SHOPPING_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_ADD_SHOPPING_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.START_DELETE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.DELETE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.CANCEL_DELETE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FAILED_DELETE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
