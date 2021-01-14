import { Action, Dispatch } from 'redux';
import {
  cancelFetchGroupExpiredShoppingListAction,
  cancelFetchGroupMonthlyShoppingListAction,
  cancelFetchGroupMonthlyShoppingListByCategoriesAction,
  cancelFetchGroupTodayShoppingListAction,
  cancelFetchGroupTodayShoppingListByCategoriesAction,
  failedFetchGroupExpiredShoppingListAction,
  failedFetchGroupMonthlyShoppingListAction,
  failedFetchGroupMonthlyShoppingListByCategoriesAction,
  failedFetchGroupTodayShoppingListAction,
  failedFetchGroupTodayShoppingListByCategoriesAction,
  fetchGroupExpiredShoppingListAction,
  fetchGroupMonthlyShoppingListAction,
  fetchGroupMonthlyShoppingListByCategoriesAction,
  fetchGroupTodayShoppingListAction,
  fetchGroupTodayShoppingListByCategoriesAction,
  startFetchGroupExpiredShoppingListAction,
  startFetchGroupMonthlyShoppingListAction,
  startFetchGroupMonthlyShoppingListByCategoriesAction,
  startFetchGroupTodayShoppingListAction,
  startFetchGroupTodayShoppingListByCategoriesAction,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import {
  FetchGroupExpiredShoppingListRes,
  FetchGroupMonthlyShoppingListByCategoriesRes,
  FetchGroupMonthlyShoppingListRes,
  FetchGroupTodayShoppingListByCategoriesRes,
  FetchGroupTodayShoppingListRes,
  GroupRegularShoppingList,
  GroupShoppingList,
  GroupShoppingListByCategories,
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

      const resGroupExpiredShoppingList: GroupShoppingList = result.data.expired_shopping_list;

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

      const resGroupRegularShoppingList: GroupRegularShoppingList =
        result.data.regular_shopping_list;
      const resGroupTodayShoppingList: GroupShoppingList = result.data.shopping_list;

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

      const resGroupRegularShoppingList: GroupRegularShoppingList =
        result.data.regular_shopping_list;
      const resGroupTodayShoppingListByCategories: GroupShoppingListByCategories =
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

export const fetchGroupMonthlyShoppingList = (
  groupId: number,
  year: string,
  month: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupMonthlyShoppingListAction());

    try {
      const result = await axios.get<FetchGroupMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}/daily`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const resGroupRegularShoppingList: GroupRegularShoppingList =
        result.data.regular_shopping_list;
      const resGroupMonthlyShoppingList: GroupShoppingList = result.data.shopping_list;

      dispatch(
        fetchGroupMonthlyShoppingListAction(
          resGroupRegularShoppingList,
          resGroupMonthlyShoppingList
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupMonthlyShoppingListAction());
      } else {
        dispatch(
          failedFetchGroupMonthlyShoppingListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const fetchGroupMonthlyShoppingListByCategories = (
  groupId: number,
  year: string,
  month: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupMonthlyShoppingListByCategoriesAction());

    try {
      const result = await axios.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const resGroupRegularShoppingList: GroupRegularShoppingList =
        result.data.regular_shopping_list;
      const resGroupMonthlyShoppingListByCategories: GroupShoppingListByCategories =
        result.data.shopping_list_by_categories;

      dispatch(
        fetchGroupMonthlyShoppingListByCategoriesAction(
          resGroupRegularShoppingList,
          resGroupMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupMonthlyShoppingListByCategoriesAction());
      } else {
        dispatch(
          failedFetchGroupMonthlyShoppingListByCategoriesAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};
