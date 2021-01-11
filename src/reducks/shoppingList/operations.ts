import { Action, Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  AddRegularShoppingListItemReq,
  AddRegularShoppingListItemRes,
  AddShoppingListItemReq,
  AddShoppingListItemRes,
  DeleteRegularShoppingListItemRes,
  DeleteShoppingListItemRes,
  FetchExpiredShoppingListRes,
  FetchMonthlyShoppingListByCategoriesRes,
  FetchMonthlyShoppingListRes,
  FetchTodayShoppingListByCategoriesRes,
  FetchTodayShoppingListRes,
  RegularShoppingList,
  RegularShoppingListItem,
  ShoppingList,
  ShoppingListByCategories,
  ShoppingListItem,
  ShoppingListItemByCategories,
} from './types';
import {
  addRegularShoppingListItemAction,
  addShoppingListItemAction,
  cancelAddRegularShoppingListItemAction,
  cancelAddShoppingListItemAction,
  cancelDeleteRegularShoppingListItemAction,
  cancelDeleteShoppingListItemAction,
  cancelFetchExpiredShoppingListAction,
  cancelFetchMonthlyShoppingListAction,
  cancelFetchMonthlyShoppingListByCategoriesAction,
  cancelFetchTodayShoppingListAction,
  cancelFetchTodayShoppingListByCategoriesAction,
  deleteRegularShoppingListItemAction,
  deleteShoppingListItemAction,
  failedAddRegularShoppingListItemAction,
  failedAddShoppingListItemAction,
  failedDeleteRegularShoppingListItemAction,
  failedDeleteShoppingListItemAction,
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
  startFetchExpiredShoppingListAction,
  startFetchMonthlyShoppingListAction,
  startFetchMonthlyShoppingListByCategoriesAction,
  startFetchTodayShoppingListAction,
  startFetchTodayShoppingListByCategoriesAction,
} from './actions';
import { State } from '../store/types';
import { dateStringToMonthString, dateToDateString } from '../../lib/date';
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
  today: Date | null,
  expectedPurchaseDate: Date | null,
  purchase: string,
  shop: string | null,
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

    const data: AddShoppingListItemReq = {
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

      const nextTodayShoppingList: ShoppingList = todayShoppingList();
      const nextTodayShoppingListByCategories: ShoppingListByCategories = todayShoppingListByCategories();
      const nextMonthlyShoppingList: ShoppingList = monthlyShoppingList();
      const nextMonthlyShoppingListByCategories: ShoppingListByCategories = monthlyShoppingListByCategories();

      dispatch(
        addShoppingListItemAction(
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelAddShoppingListItemAction());
      } else {
        dispatch(
          failedAddShoppingListItemAction(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const deleteShoppingListItem = (
  shoppingListItemId: number,
  bigCategoryName: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    dispatch(startDeleteShoppingListItemAction());

    try {
      const result = await axios.delete<DeleteShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${shoppingListItemId}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const prevExpiredShoppingList: ShoppingList = getState().shoppingList.expiredShoppingList;
      const prevTodayShoppingList: ShoppingList = getState().shoppingList.todayShoppingList;
      const prevTodayShoppingListByCategories: ShoppingListByCategories = getState().shoppingList
        .todayShoppingListByCategories;
      const prevMonthlyShoppingList: ShoppingList = getState().shoppingList.monthlyShoppingList;
      const prevMonthlyShoppingListByCategories: ShoppingListByCategories = getState().shoppingList
        .monthlyShoppingListByCategories;
      const message = result.data.message;

      const nextShoppingList = (prevShoppingList: ShoppingList) => {
        return prevShoppingList.filter((listItem) => {
          return listItem.id !== shoppingListItemId;
        });
      };

      const nextShoppingListByCategories = (
        prevShoppingListByCategories: ShoppingListByCategories
      ) => {
        const NOT_FOUND = -1;
        const idx = prevShoppingListByCategories.findIndex(
          (listItem) => listItem.big_category_name === bigCategoryName
        );

        if (idx === NOT_FOUND) {
          return prevShoppingListByCategories;
        }
        const nextShoppingListItemByCategories: ShoppingListItemByCategories = {
          big_category_name: bigCategoryName,
          shopping_list: nextShoppingList(prevShoppingListByCategories[idx].shopping_list),
        };

        if (!nextShoppingListItemByCategories.shopping_list.length) {
          prevShoppingListByCategories.splice(idx, 1);
          return prevShoppingListByCategories.concat();
        }
        prevShoppingListByCategories.splice(idx, 1, nextShoppingListItemByCategories);
        return prevShoppingListByCategories.concat();
      };

      const nextExpiredShoppingList = nextShoppingList(prevExpiredShoppingList);
      const nextTodayShoppingList = nextShoppingList(prevTodayShoppingList);
      const nextTodayShoppingListByCategories = nextShoppingListByCategories(
        prevTodayShoppingListByCategories
      );
      const nextMonthlyShoppingList = nextShoppingList(prevMonthlyShoppingList);
      const nextMonthlyShoppingListByCategories = nextShoppingListByCategories(
        prevMonthlyShoppingListByCategories
      );

      dispatch(
        deleteShoppingListItemAction(
          nextExpiredShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
      dispatch(openTextModalAction(message));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelDeleteShoppingListItemAction());
      } else {
        dispatch(
          failedDeleteShoppingListItemAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const addRegularShoppingListItem = (
  today: Date | null,
  currentYearMonth: string,
  expectedPurchaseDate: Date | null,
  cycleType: 'daily' | 'weekly' | 'monthly' | 'custom',
  cycle: number | null,
  purchase: string,
  shop: string | null,
  amount: number | null,
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
    if (cycle === 0) {
      return;
    }
    dispatch(startAddRegularShoppingListItemAction());

    const data: AddRegularShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      cycle_type: cycleType,
      cycle: cycle,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      transaction_auto_add: transactionAutoAdd,
    };

    try {
      const result = await axios.post<AddRegularShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/regular`,
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
      const newRegularShoppingListItem: RegularShoppingListItem = result.data.regular_shopping_item;
      const newShoppingList: ShoppingList = result.data.shopping_list;

      const prevRegularShoppingList: RegularShoppingList = getState().shoppingList
        .regularShoppingList;
      const prevTodayShoppingList: ShoppingList = getState().shoppingList.todayShoppingList;
      const prevTodayShoppingListByCategories: ShoppingListByCategories = getState().shoppingList
        .todayShoppingListByCategories;
      const prevMonthlyShoppingList: ShoppingList = getState().shoppingList.monthlyShoppingList;
      const prevMonthlyShoppingListByCategories: ShoppingListByCategories = getState().shoppingList
        .monthlyShoppingListByCategories;

      const NOT_FOUND = -1;
      const NOT_EXIST_ARRAY_LENGTH = 0;
      const INCLUDES_TODAY_ITEM = 2;

      const addResponseShoppingListItem = (
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

      const addResponseShoppingList = (prevShoppingList: ShoppingList) => {
        let nextShoppingList: ShoppingList = [];
        for (const newItem of newShoppingList) {
          if (currentYearMonth === dateStringToMonthString(newItem.expected_purchase_date)) {
            const idx = prevShoppingList.findIndex((prevItem) => {
              if (prevItem.expected_purchase_date === newItem.expected_purchase_date) {
                return prevItem.id > newItem.id;
              }
              return prevItem.expected_purchase_date > newItem.expected_purchase_date;
            });

            nextShoppingList = addResponseShoppingListItem(idx, prevShoppingList, newItem);
          }
        }
        return nextShoppingList;
      };

      const addResponseShoppingListItemByCategories = (
        pushCategoryIdx: number,
        prevShoppingListByCategories: ShoppingListByCategories,
        newShoppingListItemByCategories: ShoppingListItemByCategories
      ) => {
        if (pushCategoryIdx === NOT_FOUND) {
          return prevShoppingListByCategories.concat(newShoppingListItemByCategories);
        }
        prevShoppingListByCategories.splice(pushCategoryIdx, 0, newShoppingListItemByCategories);
        return prevShoppingListByCategories.concat();
      };

      const todayShoppingList = () => {
        if (newShoppingList.length === INCLUDES_TODAY_ITEM) {
          return [newShoppingList[0]].concat(prevTodayShoppingList);
        }
        return prevTodayShoppingList;
      };

      const todayShoppingListByCategories = () => {
        if (newShoppingList.length === INCLUDES_TODAY_ITEM) {
          const newShoppingListItem = newShoppingList[0];
          const prevCategoriesIdx = prevTodayShoppingListByCategories.findIndex(
            (item) => item.big_category_name === newShoppingListItem.big_category_name
          );
          const pushCategoryIdx = prevTodayShoppingListByCategories.findIndex(
            (item) => item.shopping_list[0].big_category_id > newShoppingListItem.big_category_id
          );

          if (prevCategoriesIdx === NOT_FOUND) {
            const newShoppingListItemByCategories: ShoppingListItemByCategories = {
              big_category_name: newShoppingListItem.big_category_name,
              shopping_list: [newShoppingListItem],
            };

            return addResponseShoppingListItemByCategories(
              pushCategoryIdx,
              prevTodayShoppingListByCategories,
              newShoppingListItemByCategories
            );
          }
          const newShoppingListItemByCategories: ShoppingListItemByCategories = {
            big_category_name:
              prevTodayShoppingListByCategories[prevCategoriesIdx].big_category_name,
            shopping_list: [newShoppingListItem].concat(
              prevTodayShoppingListByCategories[prevCategoriesIdx].shopping_list
            ),
          };

          prevTodayShoppingListByCategories.splice(
            prevCategoriesIdx,
            1,
            newShoppingListItemByCategories
          );

          return prevTodayShoppingListByCategories.concat();
        }
        return prevTodayShoppingListByCategories;
      };

      const monthlyShoppingList = () => {
        if (prevMonthlyShoppingList.length === NOT_EXIST_ARRAY_LENGTH) {
          return newShoppingList.filter((newItem) => {
            if (dateStringToMonthString(newItem.expected_purchase_date) === currentYearMonth) {
              return newItem;
            }
          });
        }
        return addResponseShoppingList(prevMonthlyShoppingList);
      };

      const monthlyShoppingListByCategories = () => {
        const prevCategoriesIdx = prevMonthlyShoppingListByCategories.findIndex(
          (item) => item.big_category_name === newRegularShoppingListItem.big_category_name
        );

        const pushCategoryItemIdx = prevMonthlyShoppingListByCategories.findIndex(
          (item) =>
            item.shopping_list[0].big_category_id > newRegularShoppingListItem.big_category_id
        );

        if (prevCategoriesIdx === NOT_FOUND) {
          const nextShoppingList: ShoppingList = newShoppingList.filter((newItem) => {
            if (dateStringToMonthString(newItem.expected_purchase_date) === currentYearMonth) {
              return newItem;
            }
          });

          if (nextShoppingList.length === NOT_EXIST_ARRAY_LENGTH) {
            return prevMonthlyShoppingListByCategories;
          }

          const newShoppingListItemByCategories: ShoppingListItemByCategories = {
            big_category_name: newRegularShoppingListItem.big_category_name,
            shopping_list: nextShoppingList,
          };

          return addResponseShoppingListItemByCategories(
            pushCategoryItemIdx,
            prevMonthlyShoppingListByCategories,
            newShoppingListItemByCategories
          );
        }

        const nextShoppingList = addResponseShoppingList(
          prevMonthlyShoppingListByCategories[prevCategoriesIdx].shopping_list
        );
        const newShoppingListItemByCategories: ShoppingListItemByCategories = {
          big_category_name:
            prevMonthlyShoppingListByCategories[prevCategoriesIdx].big_category_name,
          shopping_list: nextShoppingList,
        };
        prevMonthlyShoppingListByCategories.splice(
          prevCategoriesIdx,
          1,
          newShoppingListItemByCategories
        );
        return prevMonthlyShoppingListByCategories;
      };

      const nextRegularShoppingList: RegularShoppingList = prevRegularShoppingList.concat(
        newRegularShoppingListItem
      );
      const nextTodayShoppingList: ShoppingList = todayShoppingList();
      const nextTodayShoppingListByCategories: ShoppingListByCategories = todayShoppingListByCategories();
      const nextMonthlyShoppingList: ShoppingList = monthlyShoppingList();
      const nextMonthlyShoppingListByCategories: ShoppingListByCategories = monthlyShoppingListByCategories();

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
      if (axios.isCancel(error)) {
        dispatch(cancelAddRegularShoppingListItemAction());
      } else {
        dispatch(
          failedAddRegularShoppingListItemAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const deleteRegularShoppingListItem = (
  regularShoppingListItemId: number,
  bigCategoryName: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    dispatch(startDeleteRegularShoppingListItemAction());

    try {
      const result = await axios.delete<DeleteRegularShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/regular/${regularShoppingListItemId}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const prevRegularShoppingList: RegularShoppingList = getState().shoppingList
        .regularShoppingList;
      const prevExpiredShoppingList: ShoppingList = getState().shoppingList.expiredShoppingList;
      const prevTodayShoppingList: ShoppingList = getState().shoppingList.todayShoppingList;
      const prevTodayShoppingListByCategories: ShoppingListByCategories = getState().shoppingList
        .todayShoppingListByCategories;
      const prevMonthlyShoppingList: ShoppingList = getState().shoppingList.monthlyShoppingList;
      const prevMonthlyShoppingListByCategories: ShoppingListByCategories = getState().shoppingList
        .monthlyShoppingListByCategories;

      const nextRegularShoppingList: RegularShoppingList = prevRegularShoppingList.filter(
        (listItem) => listItem.id !== regularShoppingListItemId
      );

      const nextExpiredShoppingList: ShoppingList = prevExpiredShoppingList.filter(
        (listItem) => listItem.regular_shopping_list_id !== regularShoppingListItemId
      );

      const nextShoppingList = (prevShoppingList: ShoppingList) => {
        return prevShoppingList.filter((listItem) => {
          return (
            listItem.regular_shopping_list_id !== regularShoppingListItemId ||
            (listItem.regular_shopping_list_id === regularShoppingListItemId &&
              listItem.complete_flag)
          );
        });
      };

      const nextShoppingListByCategories = (
        prevShoppingListByCategories: ShoppingListByCategories
      ) => {
        const NOT_FOUND = -1;
        const NOT_EXIST_ARRAY_LENGTH = 0;
        const idx = prevShoppingListByCategories.findIndex(
          (listItem) => listItem.big_category_name === bigCategoryName
        );

        if (idx === NOT_FOUND) {
          return prevShoppingListByCategories;
        }

        const newShoppingList = nextShoppingList(prevShoppingListByCategories[idx].shopping_list);

        if (newShoppingList.length === NOT_EXIST_ARRAY_LENGTH) {
          prevShoppingListByCategories.splice(idx, 1);
          return prevShoppingListByCategories.concat();
        }

        const nextShoppingListItemByCategories: ShoppingListItemByCategories = {
          big_category_name: bigCategoryName,
          shopping_list: newShoppingList,
        };
        prevShoppingListByCategories.splice(idx, 1, nextShoppingListItemByCategories);
        return prevShoppingListByCategories.concat();
      };

      const nextTodayShoppingList = nextShoppingList(prevTodayShoppingList);
      const nextTodayShoppingListByCategories = nextShoppingListByCategories(
        prevTodayShoppingListByCategories
      );
      const nextMonthlyShoppingList = nextShoppingList(prevMonthlyShoppingList);
      const nextMonthlyShoppingListByCategories = nextShoppingListByCategories(
        prevMonthlyShoppingListByCategories
      );

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
      dispatch(openTextModalAction(result.data.message));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelDeleteRegularShoppingListItemAction());
      } else {
        dispatch(
          failedDeleteRegularShoppingListItemAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};
