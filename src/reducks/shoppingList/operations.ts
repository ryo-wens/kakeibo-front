import { Action, Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  FetchExpiredShoppingListRes,
  FetchMonthlyShoppingListByCategoriesRes,
  FetchMonthlyShoppingListRes,
  FetchTodayShoppingListByCategoriesRes,
  FetchTodayShoppingListRes,
  RegularShoppingList,
  ShoppingList,
  ShoppingListByCategories,
} from './types';
import {
  cancelFetchExpiredShoppingListAction,
  cancelFetchMonthlyShoppingListAction,
  cancelFetchMonthlyShoppingListByCategoriesAction,
  cancelFetchTodayShoppingListAction,
  cancelFetchTodayShoppingListByCategoriesAction,
  failedFetchExpiredShoppingListAction,
  failedFetchMonthlyShoppingListAction,
  failedFetchMonthlyShoppingListByCategoriesAction,
  failedFetchTodayShoppingListAction,
  failedFetchTodayShoppingListByCategoriesAction,
  fetchExpiredShoppingListAction,
  fetchMonthlyShoppingListAction,
  fetchMonthlyShoppingListByCategoriesAction,
  fetchTodayShoppingListAction,
  fetchTodayShoppingListByCategoriesAction,
  startFetchExpiredShoppingListAction,
  startFetchMonthlyShoppingListAction,
  startFetchMonthlyShoppingListByCategoriesAction,
  startFetchTodayShoppingListAction,
  startFetchTodayShoppingListByCategoriesAction,
} from './actions';

export const fetchExpiredShoppingList = (signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchExpiredShoppingListAction());

    try {
      const result = await axios.get<FetchExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const expiredShoppingList: ShoppingList = result.data.expired_shopping_list;

      dispatch(fetchExpiredShoppingListAction(expiredShoppingList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchExpiredShoppingListAction());
      } else {
        dispatch(
          failedFetchExpiredShoppingListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchTodayShoppingList = (
  year: string,
  month: string,
  date: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchTodayShoppingListAction());

    try {
      const result = await axios.get<FetchTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const regularShoppingList: RegularShoppingList = result.data.regular_shopping_list;
      const todayShoppingList: ShoppingList = result.data.shopping_list;

      dispatch(fetchTodayShoppingListAction(regularShoppingList, todayShoppingList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchTodayShoppingListAction());
      } else {
        dispatch(
          failedFetchTodayShoppingListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchTodayShoppingListByCategories = (
  year: string,
  month: string,
  date: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchTodayShoppingListByCategoriesAction());

    try {
      const result = await axios.get<FetchTodayShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const regularShoppingList: RegularShoppingList = result.data.regular_shopping_list;
      const todayShoppingListByCategories: ShoppingListByCategories =
        result.data.shopping_list_by_categories;

      dispatch(
        fetchTodayShoppingListByCategoriesAction(regularShoppingList, todayShoppingListByCategories)
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchTodayShoppingListByCategoriesAction());
      } else {
        dispatch(
          failedFetchTodayShoppingListByCategoriesAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchMonthlyShoppingList = (
  year: string,
  month: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchMonthlyShoppingListAction());

    try {
      const result = await axios.get<FetchMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const regularShoppingList: RegularShoppingList = result.data.regular_shopping_list;
      const monthlyShoppingList: ShoppingList = result.data.shopping_list;

      dispatch(fetchMonthlyShoppingListAction(regularShoppingList, monthlyShoppingList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchMonthlyShoppingListAction());
      } else {
        dispatch(
          failedFetchMonthlyShoppingListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchMonthlyShoppingListByCategories = (
  year: string,
  month: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchMonthlyShoppingListByCategoriesAction());

    try {
      const result = await axios.get<FetchMonthlyShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const regularShoppingList: RegularShoppingList = result.data.regular_shopping_list;
      const monthlyShoppingListByCategories: ShoppingListByCategories =
        result.data.shopping_list_by_categories;

      dispatch(
        fetchMonthlyShoppingListByCategoriesAction(
          regularShoppingList,
          monthlyShoppingListByCategories
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchMonthlyShoppingListByCategoriesAction());
      } else {
        dispatch(
          failedFetchMonthlyShoppingListByCategoriesAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};
