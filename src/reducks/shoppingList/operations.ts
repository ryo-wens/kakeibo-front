import { Action, Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  AddRegularShoppingListItemReq,
  AddRegularShoppingListItemRes,
  AddShoppingListItemReq,
  DeleteRegularShoppingListItemRes,
  DeleteShoppingListItemRes,
  EditRegularShoppingListItemReq,
  EditRegularShoppingListItemRes,
  EditShoppingListItemReq,
  FetchExpiredShoppingListRes,
  FetchMonthlyShoppingListByCategoriesRes,
  FetchMonthlyShoppingListRes,
  FetchTodayShoppingListByCategoriesRes,
  FetchTodayShoppingListRes,
  RegularShoppingList,
  ShoppingList,
  ShoppingListByCategories,
  ShoppingListItem,
} from './types';
import {
  addRegularShoppingListItemAction,
  addShoppingListItemAction,
  cancelFetchExpiredShoppingListAction,
  cancelFetchMonthlyShoppingListAction,
  cancelFetchMonthlyShoppingListByCategoriesAction,
  cancelFetchTodayShoppingListAction,
  cancelFetchTodayShoppingListByCategoriesAction,
  deleteRegularShoppingListItemAction,
  deleteShoppingListItemAction,
  editRegularShoppingListItemAction,
  editShoppingListItemAction,
  failedAddRegularShoppingListItemAction,
  failedAddShoppingListItemAction,
  failedDeleteRegularShoppingListItemAction,
  failedDeleteShoppingListItemAction,
  failedEditRegularShoppingListItemAction,
  failedEditShoppingListItemAction,
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
  startAddRegularShoppingListItemAction,
  startAddShoppingListItemAction,
  startDeleteRegularShoppingListItemAction,
  startDeleteShoppingListItemAction,
  startEditRegularShoppingListItemAction,
  startEditShoppingListItemAction,
  startFetchExpiredShoppingListAction,
  startFetchMonthlyShoppingListAction,
  startFetchMonthlyShoppingListByCategoriesAction,
  startFetchTodayShoppingListAction,
  startFetchTodayShoppingListByCategoriesAction,
} from './actions';
import dayjs from 'dayjs';
import { openTextModalAction } from '../modal/actions';
import { todoServiceInstance } from '../axiosConfig';

export const fetchExpiredShoppingList = (signal?: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchExpiredShoppingListAction());

    try {
      const result = await todoServiceInstance.get<FetchExpiredShoppingListRes>(
        `/shopping-list/expired`,
        { cancelToken: signal?.token }
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
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchTodayShoppingListAction());

    try {
      const result = await todoServiceInstance.get<FetchTodayShoppingListRes>(
        `/shopping-list/${year}-${month}-${date}/daily`,
        { cancelToken: signal?.token }
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
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchTodayShoppingListByCategoriesAction());

    try {
      const result = await todoServiceInstance.get<FetchTodayShoppingListByCategoriesRes>(
        `/shopping-list/${year}-${month}-${date}/categories`,
        { cancelToken: signal?.token }
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
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchMonthlyShoppingListAction());

    try {
      const result = await todoServiceInstance.get<FetchMonthlyShoppingListRes>(
        `/shopping-list/${year}-${month}/daily`,
        { cancelToken: signal?.token }
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
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchMonthlyShoppingListByCategoriesAction());

    try {
      const result = await todoServiceInstance.get<FetchMonthlyShoppingListByCategoriesRes>(
        `/shopping-list/${year}-${month}/categories`,
        { cancelToken: signal?.token }
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

export const addShoppingListItem = (requestData: AddShoppingListItemReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddShoppingListItemAction());

    try {
      const res = await todoServiceInstance.post<ShoppingListItem>(
        `/shopping-list`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(addShoppingListItemAction(res.data));
    } catch (error) {
      dispatch(
        failedAddShoppingListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const editShoppingListItem = (
  shoppingListItemId: number,
  requestData: EditShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditShoppingListItemAction());

    try {
      const res = await todoServiceInstance.put<ShoppingListItem>(
        `/shopping-list/${shoppingListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(editShoppingListItemAction(res.data));
    } catch (error) {
      dispatch(
        failedEditShoppingListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const deleteShoppingListItem = (shoppingListItemId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteShoppingListItemAction());

    try {
      const res = await todoServiceInstance.delete<DeleteShoppingListItemRes>(
        `/shopping-list/${shoppingListItemId}`
      );

      dispatch(deleteShoppingListItemAction());
      dispatch(openTextModalAction(res.data.message));
    } catch (error) {
      dispatch(
        failedDeleteShoppingListItemAction(error.response.status, error.response.data.error.message)
      );
      throw error;
    }
  };
};

export const addRegularShoppingListItem = (requestData: AddRegularShoppingListItemReq) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddRegularShoppingListItemAction());

    try {
      const res = await todoServiceInstance.post<AddRegularShoppingListItemRes>(
        `/shopping-list/regular`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(addRegularShoppingListItemAction(res.data.regular_shopping_item));
    } catch (error) {
      dispatch(
        failedAddRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
    }
  };
};

export const editRegularShoppingListItem = (
  regularShoppingListItemId: number,
  requestData: EditRegularShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditRegularShoppingListItemAction());

    try {
      const res = await todoServiceInstance.put<EditRegularShoppingListItemRes>(
        `/shopping-list/regular/${regularShoppingListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(editRegularShoppingListItemAction(res.data.regular_shopping_item));
    } catch (error) {
      dispatch(
        failedEditRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
    }
  };
};

export const deleteRegularShoppingListItem = (regularShoppingListItemId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteRegularShoppingListItemAction());

    try {
      const res = await todoServiceInstance.delete<DeleteRegularShoppingListItemRes>(
        `/shopping-list/regular/${regularShoppingListItemId}`
      );

      dispatch(deleteRegularShoppingListItemAction());
      dispatch(openTextModalAction(res.data.message));
    } catch (error) {
      dispatch(
        failedDeleteRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
    }
  };
};
