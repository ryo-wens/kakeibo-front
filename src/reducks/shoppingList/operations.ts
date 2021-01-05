import { Action, Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  addShoppingListItemReq,
  AddShoppingListItemRes,
  FetchExpiredShoppingListRes,
  FetchMonthlyShoppingListByCategoriesRes,
  FetchMonthlyShoppingListRes,
  FetchTodayShoppingListByCategoriesRes,
  FetchTodayShoppingListRes,
  RegularShoppingList,
  ShoppingList,
  ShoppingListByCategories,
  ShoppingListItem,
  ShoppingListItemByCategories,
} from './types';
import {
  addShoppingListItemAction,
  cancelFetchExpiredShoppingListAction,
  cancelFetchMonthlyShoppingListAction,
  cancelFetchMonthlyShoppingListByCategoriesAction,
  cancelFetchTodayShoppingListAction,
  cancelFetchTodayShoppingListByCategoriesAction,
  failedAddShoppingListItemAction,
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
  startAddShoppingListItemAction,
  startFetchExpiredShoppingListAction,
  startFetchMonthlyShoppingListAction,
  startFetchMonthlyShoppingListByCategoriesAction,
  startFetchTodayShoppingListAction,
  startFetchTodayShoppingListByCategoriesAction,
} from './actions';
import { State } from '../store/types';
import { dateStringToMonthString, dateToDateString } from '../../lib/date';
import moment from 'moment';

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
  today: Date | null,
  expectedPurchaseDate: Date | null,
  purchase: string,
  shop: string,
  amount: number,
  bigCategoryId: number,
  mediumCategoryId: number | null,
  customCategoryId: number | null,
  transactionAutoAdd: boolean,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (today === null) {
      return;
    }
    if (expectedPurchaseDate === null) {
      return;
    }
    dispatch(startAddShoppingListItemAction());

    const data: addShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      transaction_auto_add: transactionAutoAdd,
    };

    try {
      const result = await axios.post<AddShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list`,
        JSON.stringify(data, function (key, value) {
          if (key === 'expected_purchase_date') {
            return moment(new Date(value)).format();
          }
          return value;
        }),
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const newShoppingListItem: ShoppingListItem = result.data;
      const prevExpiredShoppingList: ShoppingList = getState().shoppingList.expiredShoppingList;
      const prevTodayShoppingList: ShoppingList = getState().shoppingList.todayShoppingList;
      const prevTodayShoppingListByCategories: ShoppingListByCategories = getState().shoppingList
        .todayShoppingListByCategories;
      const prevMonthlyShoppingList: ShoppingList = getState().shoppingList.monthlyShoppingList;
      const prevMonthlyShoppingListByCategories: ShoppingListByCategories = getState().shoppingList
        .monthlyShoppingListByCategories;
      const NOT_FOUND = -1;
      const responseExpectedPurchaseDate: string = result.data.expected_purchase_date;
      const prevMonth = prevMonthlyShoppingList.length
        ? dateStringToMonthString(prevMonthlyShoppingList[0].expected_purchase_date)
        : 'NOT_FOUND';
      const responseMonth = dateStringToMonthString(responseExpectedPurchaseDate);

      const pushResponseShoppingListItem = (
        idx: number,
        prevShoppingList: ShoppingList,
        nextShoppingListItem: ShoppingListItem
      ) => {
        if (idx === NOT_FOUND) {
          return prevShoppingList.concat(nextShoppingListItem);
        }
        prevShoppingList.splice(idx, 0, nextShoppingListItem);
        return prevShoppingList.concat();
      };

      const pushResponseShoppingListItemByCategories = (
        prevCategoryIdx: number,
        prevShoppingListByCategories: ShoppingListByCategories,
        newShoppingListItemByCategories: ShoppingListItemByCategories
      ) => {
        if (prevCategoryIdx === NOT_FOUND) {
          return prevShoppingListByCategories.concat(newShoppingListItemByCategories);
        }
        prevShoppingListByCategories.splice(prevCategoryIdx, 0, newShoppingListItemByCategories);
        return prevShoppingListByCategories.concat();
      };

      const expiredShoppingList = () => {
        if (dateToDateString(today) > responseExpectedPurchaseDate) {
          const idx = prevExpiredShoppingList.findIndex(
            (listItem) => listItem.expected_purchase_date >= responseExpectedPurchaseDate
          );
          return pushResponseShoppingListItem(idx, prevExpiredShoppingList, result.data);
        }
        return prevExpiredShoppingList;
      };

      const todayShoppingList = () => {
        if (dateToDateString(today) === responseExpectedPurchaseDate) {
          return [newShoppingListItem].concat(prevTodayShoppingList);
        }
        return prevTodayShoppingList;
      };

      const todayShoppingListByCategories = () => {
        if (dateToDateString(today) === responseExpectedPurchaseDate) {
          const prevListIdx = prevTodayShoppingListByCategories.findIndex(
            (item) => item.big_category_name === result.data.big_category_name
          );

          const pushItemIdx = prevMonthlyShoppingListByCategories.findIndex(
            (item) => item.shopping_list[0].big_category_id >= newShoppingListItem.big_category_id
          );

          if (prevListIdx === NOT_FOUND) {
            const newShoppingListItemByCategories: ShoppingListItemByCategories = {
              big_category_name: newShoppingListItem.big_category_name,
              shopping_list: [newShoppingListItem],
            };

            return pushResponseShoppingListItemByCategories(
              pushItemIdx,
              prevTodayShoppingListByCategories,
              newShoppingListItemByCategories
            );
          }
          const newShoppingListItemByCategories: ShoppingListItemByCategories = {
            big_category_name: prevTodayShoppingListByCategories[prevListIdx].big_category_name,
            shopping_list: [newShoppingListItem].concat(
              prevTodayShoppingListByCategories[prevListIdx].shopping_list
            ),
          };

          return pushResponseShoppingListItemByCategories(
            pushItemIdx,
            prevTodayShoppingListByCategories,
            newShoppingListItemByCategories
          );
        }
        return prevTodayShoppingListByCategories;
      };

      const monthlyShoppingList = () => {
        if (prevMonth === responseMonth || prevMonth === 'NOT_FOUND') {
          const idx = prevMonthlyShoppingList.findIndex(
            (listItem) => listItem.expected_purchase_date >= responseExpectedPurchaseDate
          );
          return pushResponseShoppingListItem(idx, prevMonthlyShoppingList, result.data);
        }
        return prevMonthlyShoppingList;
      };

      const monthlyShoppingListByCategories = () => {
        if (prevMonth === responseMonth || prevMonth === 'NOT_FOUND') {
          const prevListIdx = prevMonthlyShoppingListByCategories.findIndex(
            (item) => item.big_category_name === result.data.big_category_name
          );

          const pushItemIdx = prevMonthlyShoppingListByCategories.findIndex(
            (item) => item.shopping_list[0].big_category_id >= newShoppingListItem.big_category_id
          );

          if (prevListIdx === NOT_FOUND) {
            const newShoppingListItemByCategories: ShoppingListItemByCategories = {
              big_category_name: newShoppingListItem.big_category_name,
              shopping_list: [newShoppingListItem],
            };

            return pushResponseShoppingListItemByCategories(
              pushItemIdx,
              prevMonthlyShoppingListByCategories,
              newShoppingListItemByCategories
            );
          }
          const idx = prevMonthlyShoppingListByCategories[prevListIdx].shopping_list.findIndex(
            (item) => item.expected_purchase_date >= newShoppingListItem.expected_purchase_date
          );

          const newShoppingListItemByCategories: ShoppingListItemByCategories = {
            big_category_name: prevMonthlyShoppingListByCategories[prevListIdx].big_category_name,
            shopping_list: pushResponseShoppingListItem(
              idx,
              prevMonthlyShoppingListByCategories[prevListIdx].shopping_list,
              newShoppingListItem
            ),
          };
          return pushResponseShoppingListItemByCategories(
            pushItemIdx,
            prevMonthlyShoppingListByCategories,
            newShoppingListItemByCategories
          );
        }
        return prevMonthlyShoppingListByCategories;
      };

      const nextExpiredShoppingList: ShoppingList = expiredShoppingList();
      const nextTodayShoppingList: ShoppingList = todayShoppingList();
      const nextTodayShoppingListByCategories: ShoppingListByCategories = todayShoppingListByCategories();
      const nextMonthlyShoppingList: ShoppingList = monthlyShoppingList();
      const nextMonthlyShoppingListByCategories: ShoppingListByCategories = monthlyShoppingListByCategories();

      dispatch(
        addShoppingListItemAction(
          nextExpiredShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchMonthlyShoppingListByCategoriesAction());
      } else {
        dispatch(
          failedAddShoppingListItemAction(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};
