import { Action, Dispatch } from 'redux';
import {
  cancelFetchGroupExpiredShoppingListAction,
  cancelFetchGroupTodayShoppingListAction,
  cancelFetchGroupTodayShoppingListByCategoriesAction,
  failedFetchGroupExpiredShoppingListAction,
  failedFetchGroupTodayShoppingListAction,
  failedFetchGroupTodayShoppingListByCategoriesAction,
  fetchGroupExpiredShoppingListAction,
  fetchGroupTodayShoppingListAction,
  fetchGroupTodayShoppingListByCategoriesAction,
  startFetchGroupExpiredShoppingListAction,
  startFetchGroupTodayShoppingListAction,
  startFetchGroupTodayShoppingListByCategoriesAction,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { RegularShoppingList, ShoppingList, ShoppingListByCategories } from '../shoppingList/types';
import {
  FetchGroupExpiredShoppingListRes,
  FetchGroupTodayShoppingListByCategoriesRes,
  FetchGroupTodayShoppingListRes,
} from './types';

export const fetchGroupExpiredShoppingList = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupExpiredShoppingListAction());

    try {
      const result = await axios.get<FetchGroupExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const resGroupExpiredShoppingList: ShoppingList = result.data.expired_shopping_list;

      dispatch(fetchGroupExpiredShoppingListAction(resGroupExpiredShoppingList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupExpiredShoppingListAction());
      } else {
        dispatch(
          failedFetchGroupExpiredShoppingListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchGroupTodayShoppingList = (
  groupId: number,
  year: string,
  month: string,
  date: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTodayShoppingListAction());

    try {
      const result = await axios.get<FetchGroupTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const resGroupRegularShoppingList: RegularShoppingList = result.data.regular_shopping_list;
      const resGroupTodayShoppingList: ShoppingList = result.data.shopping_list;

      dispatch(
        fetchGroupTodayShoppingListAction(resGroupRegularShoppingList, resGroupTodayShoppingList)
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupTodayShoppingListAction());
      } else {
        dispatch(
          failedFetchGroupTodayShoppingListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchGroupTodayShoppingListByCategories = (
  groupId: number,
  year: string,
  month: string,
  date: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTodayShoppingListByCategoriesAction());

    try {
      const result = await axios.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const resGroupRegularShoppingList: RegularShoppingList = result.data.regular_shopping_list;
      const resGroupTodayShoppingListByCategories: ShoppingListByCategories =
        result.data.shopping_list_by_categories;

      dispatch(
        fetchGroupTodayShoppingListByCategoriesAction(
          resGroupRegularShoppingList,
          resGroupTodayShoppingListByCategories
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupTodayShoppingListByCategoriesAction());
      } else {
        dispatch(
          failedFetchGroupTodayShoppingListByCategoriesAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};
