import { Action, Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  AddRegularShoppingListItemReq,
  AddRegularShoppingListItemRes,
  AddShoppingListItemReq,
  AddShoppingListItemRes,
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
import moment from 'moment';
import { openTextModalAction } from '../modal/actions';

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

export const addShoppingListItem = (
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: AddShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddShoppingListItemAction());

    try {
      await axios.post<AddShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<
        FetchTodayShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<
        FetchMonthlyShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/categories`,
        {
          withCredentials: true,
        }
      );

      const nextTodayShoppingList = fetchTodayListResult.data.shopping_list;
      const nextTodayShoppingListByCategories =
        fetchTodayListByCategoriesResult.data.shopping_list_by_categories;
      const nextMonthlyShoppingList = fetchMonthlyListResult.data.shopping_list;
      const nextMonthlyShoppingListByCategories =
        fetchMonthlyListByCategoriesResult.data.shopping_list_by_categories;

      dispatch(
        addShoppingListItemAction(
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      dispatch(
        failedAddShoppingListItemAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const editShoppingListItem = (
  shoppingListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: EditShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditShoppingListItemAction());

    try {
      await axios.put<ShoppingListItem>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${shoppingListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchExpiredListResult = await axios.get<FetchExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<
        FetchTodayShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<
        FetchMonthlyShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/categories`,
        {
          withCredentials: true,
        }
      );

      const nextExpiredShoppingList = fetchExpiredListResult.data.expired_shopping_list;
      const nextTodayShoppingList = fetchTodayListResult.data.shopping_list;
      const nextTodayShoppingListByCategories =
        fetchTodayListByCategoriesResult.data.shopping_list_by_categories;
      const nextMonthlyShoppingList = fetchMonthlyListResult.data.shopping_list;
      const nextMonthlyShoppingListByCategories =
        fetchMonthlyListByCategoriesResult.data.shopping_list_by_categories;

      dispatch(
        editShoppingListItemAction(
          nextExpiredShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      dispatch(
        failedEditShoppingListItemAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const deleteShoppingListItem = (
  shoppingListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteShoppingListItemAction());

    try {
      const deleteShoppingListItemResult = await axios.delete<DeleteShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${shoppingListItemId}`,
        {
          withCredentials: true,
        }
      );

      const fetchExpiredListResult = await axios.get<FetchExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<
        FetchTodayShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<
        FetchMonthlyShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/categories`,
        {
          withCredentials: true,
        }
      );

      const nextExpiredShoppingList = fetchExpiredListResult.data.expired_shopping_list;
      const nextTodayShoppingList = fetchTodayListResult.data.shopping_list;
      const nextTodayShoppingListByCategories =
        fetchTodayListByCategoriesResult.data.shopping_list_by_categories;
      const nextMonthlyShoppingList = fetchMonthlyListResult.data.shopping_list;
      const nextMonthlyShoppingListByCategories =
        fetchMonthlyListByCategoriesResult.data.shopping_list_by_categories;

      dispatch(
        deleteShoppingListItemAction(
          nextExpiredShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
      dispatch(openTextModalAction(deleteShoppingListItemResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteShoppingListItemAction(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const addRegularShoppingListItem = (
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: AddRegularShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddRegularShoppingListItemAction());

    try {
      await axios.post<AddRegularShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/regular`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<
        FetchTodayShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<
        FetchMonthlyShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/categories`,
        {
          withCredentials: true,
        }
      );

      const nextRegularShoppingList = fetchTodayListResult.data.regular_shopping_list;
      const nextTodayShoppingList = fetchTodayListResult.data.shopping_list;
      const nextTodayShoppingListByCategories =
        fetchTodayListByCategoriesResult.data.shopping_list_by_categories;
      const nextMonthlyShoppingList = fetchMonthlyListResult.data.shopping_list;
      const nextMonthlyShoppingListByCategories =
        fetchMonthlyListByCategoriesResult.data.shopping_list_by_categories;

      dispatch(
        addRegularShoppingListItemAction(
          nextRegularShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      dispatch(
        failedAddRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const editRegularShoppingListItem = (
  regularShoppingListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: EditRegularShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditRegularShoppingListItemAction());

    try {
      await axios.put<EditRegularShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/regular/${regularShoppingListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchExpiredListResult = await axios.get<FetchExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<
        FetchTodayShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<
        FetchMonthlyShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/categories`,
        {
          withCredentials: true,
        }
      );

      const nextExpiredShoppingList = fetchExpiredListResult.data.expired_shopping_list;
      const nextRegularShoppingList = fetchTodayListResult.data.regular_shopping_list;
      const nextTodayShoppingList = fetchTodayListResult.data.shopping_list;
      const nextTodayShoppingListByCategories =
        fetchTodayListByCategoriesResult.data.shopping_list_by_categories;
      const nextMonthlyShoppingList = fetchMonthlyListResult.data.shopping_list;
      const nextMonthlyShoppingListByCategories =
        fetchMonthlyListByCategoriesResult.data.shopping_list_by_categories;

      dispatch(
        editRegularShoppingListItemAction(
          nextRegularShoppingList,
          nextExpiredShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      dispatch(
        failedEditRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const deleteRegularShoppingListItem = (
  regularShoppingListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteRegularShoppingListItemAction());

    try {
      const deleteRegularShoppingListItemResult = await axios.delete<
        DeleteRegularShoppingListItemRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/regular/${regularShoppingListItemId}`,
        {
          withCredentials: true,
        }
      );

      const fetchExpiredListResult = await axios.get<FetchExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/expired`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<
        FetchTodayShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<
        FetchMonthlyShoppingListByCategoriesRes
      >(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${currentYear}-${currentMonth}/categories`,
        {
          withCredentials: true,
        }
      );

      const nextExpiredShoppingList = fetchExpiredListResult.data.expired_shopping_list;
      const nextRegularShoppingList = fetchTodayListResult.data.regular_shopping_list;
      const nextTodayShoppingList = fetchTodayListResult.data.shopping_list;
      const nextTodayShoppingListByCategories =
        fetchTodayListByCategoriesResult.data.shopping_list_by_categories;
      const nextMonthlyShoppingList = fetchMonthlyListResult.data.shopping_list;
      const nextMonthlyShoppingListByCategories =
        fetchMonthlyListByCategoriesResult.data.shopping_list_by_categories;

      dispatch(
        deleteRegularShoppingListItemAction(
          nextRegularShoppingList,
          nextExpiredShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
      dispatch(openTextModalAction(deleteRegularShoppingListItemResult.data.message));
    } catch (error) {
      dispatch(
        failedDeleteRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};
