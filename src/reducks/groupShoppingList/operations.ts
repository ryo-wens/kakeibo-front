import { Action, Dispatch } from 'redux';
import {
  addGroupRegularShoppingListItemAction,
  addGroupShoppingListItemAction,
  cancelAddGroupRegularShoppingListItemAction,
  cancelAddGroupShoppingListItemAction,
  cancelDeleteGroupShoppingListItemAction,
  cancelEditGroupShoppingListItemAction,
  cancelFetchGroupExpiredShoppingListAction,
  cancelFetchGroupMonthlyShoppingListAction,
  cancelFetchGroupMonthlyShoppingListByCategoriesAction,
  cancelFetchGroupTodayShoppingListAction,
  cancelFetchGroupTodayShoppingListByCategoriesAction,
  deleteGroupShoppingListItemAction,
  editGroupShoppingListItemAction,
  failedAddGroupRegularShoppingListItemAction,
  failedAddGroupShoppingListItemAction,
  failedDeleteGroupShoppingListItemAction,
  failedEditGroupShoppingListItemAction,
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
  startAddGroupRegularShoppingListItemAction,
  startAddGroupShoppingListItemAction,
  startDeleteGroupShoppingListItemAction,
  startEditGroupShoppingListItemAction,
  startFetchGroupExpiredShoppingListAction,
  startFetchGroupMonthlyShoppingListAction,
  startFetchGroupMonthlyShoppingListByCategoriesAction,
  startFetchGroupTodayShoppingListAction,
  startFetchGroupTodayShoppingListByCategoriesAction,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import {
  AddGroupRegularShoppingListItemReq,
  AddGroupRegularShoppingListItemRes,
  AddGroupShoppingListItemReq,
  DeleteGroupShoppingListItemRes,
  EditGroupShoppingListItemReq,
  FetchGroupExpiredShoppingListRes,
  FetchGroupMonthlyShoppingListByCategoriesRes,
  FetchGroupMonthlyShoppingListRes,
  FetchGroupTodayShoppingListByCategoriesRes,
  FetchGroupTodayShoppingListRes,
  GroupRegularShoppingList,
  GroupRegularShoppingListItem,
  GroupRelatedTransactionData,
  GroupShoppingList,
  GroupShoppingListByCategories,
  GroupShoppingListItem,
  GroupShoppingListItemByCategories,
} from './types';
import { State } from '../store/types';
import moment from 'moment';
import { dateStringToMonthString, dateToDateString } from '../../lib/date';
import { openTextModalAction } from '../modal/actions';

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

export const addGroupShoppingListItem = (
  groupId: number,
  today: Date | null,
  currentYearMonth: string,
  expectedPurchaseDate: Date | null,
  purchase: string,
  shop: string | null,
  amount: number | null,
  bigCategoryId: number,
  mediumCategoryId: number | null,
  customCategoryId: number | null,
  paymentUserId: string | null,
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
    dispatch(startAddGroupShoppingListItemAction());

    const data: AddGroupShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      payment_user_id: paymentUserId,
      transaction_auto_add: transactionAutoAdd,
    };

    try {
      const result = await axios.post<GroupShoppingListItem>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list`,
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

      const prevTodayShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupTodayShoppingList;
      const prevTodayShoppingListByCategories: GroupShoppingListByCategories = getState()
        .groupShoppingList.groupTodayShoppingListByCategories;
      const prevMonthlyShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupMonthlyShoppingList;
      const prevMonthlyShoppingListByCategories: GroupShoppingListByCategories = getState()
        .groupShoppingList.groupMonthlyShoppingListByCategories;

      const resShoppingListItem: GroupShoppingListItem = result.data;

      const NOT_FOUND = -1;

      const pushResponseShoppingListItem = (
        idx: number,
        prevShoppingList: GroupShoppingList,
        nextShoppingListItem: GroupShoppingListItem
      ) => {
        if (idx === NOT_FOUND) {
          return prevShoppingList.concat(nextShoppingListItem);
        }
        prevShoppingList.splice(idx, 0, nextShoppingListItem);
        return prevShoppingList.concat();
      };

      const pushResponseShoppingListItemByCategories = (
        prevCategoryIdx: number,
        prevShoppingListByCategories: GroupShoppingListByCategories,
        newShoppingListItemByCategories: GroupShoppingListItemByCategories
      ) => {
        if (prevCategoryIdx === NOT_FOUND) {
          return prevShoppingListByCategories.concat(newShoppingListItemByCategories);
        }

        prevShoppingListByCategories.splice(prevCategoryIdx, 1, newShoppingListItemByCategories);
        return prevShoppingListByCategories.concat();
      };

      const todayShoppingList = (
        prevShoppingList: GroupShoppingList,
        shoppingListItem: GroupShoppingListItem
      ) => {
        if (dateToDateString(today) === shoppingListItem.expected_purchase_date) {
          return prevShoppingList.concat(shoppingListItem);
        }
        return prevShoppingList;
      };

      const todayShoppingListByCategories = (
        prevShoppingListByCategories: GroupShoppingListByCategories,
        shoppingListItem: GroupShoppingListItem
      ) => {
        if (dateToDateString(today) === shoppingListItem.expected_purchase_date) {
          const prevCategoriesIdx = prevShoppingListByCategories.findIndex(
            (item) => item.big_category_name === shoppingListItem.big_category_name
          );

          if (prevCategoriesIdx === NOT_FOUND) {
            const addCategoryIdx = prevShoppingListByCategories.findIndex(
              (item) => item.shopping_list[0].big_category_id > shoppingListItem.big_category_id
            );

            const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
              big_category_name: shoppingListItem.big_category_name,
              shopping_list: [shoppingListItem],
            };

            prevShoppingListByCategories.splice(addCategoryIdx, 0, newShoppingListItemByCategories);
            return prevShoppingListByCategories.concat();
          }

          const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
            big_category_name: prevShoppingListByCategories[prevCategoriesIdx].big_category_name,
            shopping_list: prevShoppingListByCategories[prevCategoriesIdx].shopping_list.concat(
              shoppingListItem
            ),
          };

          return pushResponseShoppingListItemByCategories(
            prevCategoriesIdx,
            prevShoppingListByCategories,
            newShoppingListItemByCategories
          );
        }
        return prevShoppingListByCategories;
      };

      const monthlyShoppingList = (
        prevShoppingList: GroupShoppingList,
        shoppingListItem: GroupShoppingListItem
      ) => {
        if (currentYearMonth === dateStringToMonthString(shoppingListItem.expected_purchase_date)) {
          const idx = prevShoppingList.findIndex((item) => {
            if (item.expected_purchase_date === shoppingListItem.expected_purchase_date) {
              return item.id > shoppingListItem.id;
            }
            return item.expected_purchase_date > shoppingListItem.expected_purchase_date;
          });

          return pushResponseShoppingListItem(idx, prevShoppingList, result.data);
        }
        return prevShoppingList;
      };

      const monthlyShoppingListByCategories = (
        prevShoppingListByCategories: GroupShoppingListByCategories,
        shoppingListItem: GroupShoppingListItem
      ) => {
        if (currentYearMonth === dateStringToMonthString(shoppingListItem.expected_purchase_date)) {
          const prevCategoriesIdx = prevShoppingListByCategories.findIndex(
            (item) => item.big_category_name === result.data.big_category_name
          );

          if (prevCategoriesIdx === NOT_FOUND) {
            const addCategoryIdx = prevShoppingListByCategories.findIndex(
              (item) => item.shopping_list[0].big_category_id > shoppingListItem.big_category_id
            );

            const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
              big_category_name: shoppingListItem.big_category_name,
              shopping_list: [shoppingListItem],
            };

            prevShoppingListByCategories.splice(addCategoryIdx, 0, newShoppingListItemByCategories);
            return prevShoppingListByCategories.concat();
          }

          const idx = prevShoppingListByCategories[prevCategoriesIdx].shopping_list.findIndex(
            (item) => {
              if (item.expected_purchase_date === shoppingListItem.expected_purchase_date) {
                return item.id > shoppingListItem.id;
              }
              return item.expected_purchase_date > resShoppingListItem.expected_purchase_date;
            }
          );

          const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
            big_category_name: prevShoppingListByCategories[prevCategoriesIdx].big_category_name,
            shopping_list: pushResponseShoppingListItem(
              idx,
              prevShoppingListByCategories[prevCategoriesIdx].shopping_list,
              shoppingListItem
            ),
          };

          return pushResponseShoppingListItemByCategories(
            prevCategoriesIdx,
            prevShoppingListByCategories,
            newShoppingListItemByCategories
          );
        }
        return prevShoppingListByCategories;
      };

      const nextTodayShoppingList: GroupShoppingList = todayShoppingList(
        prevTodayShoppingList,
        resShoppingListItem
      );
      const nextTodayShoppingListByCategories: GroupShoppingListByCategories = todayShoppingListByCategories(
        prevTodayShoppingListByCategories,
        resShoppingListItem
      );

      const nextMonthlyShoppingList: GroupShoppingList = monthlyShoppingList(
        prevMonthlyShoppingList,
        resShoppingListItem
      );

      const nextMonthlyShoppingListByCategories: GroupShoppingListByCategories = monthlyShoppingListByCategories(
        prevMonthlyShoppingListByCategories,
        resShoppingListItem
      );

      dispatch(
        addGroupShoppingListItemAction(
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelAddGroupShoppingListItemAction());
      } else {
        dispatch(
          failedAddGroupShoppingListItemAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const editGroupShoppingListItem = (
  groupId: number,
  today: Date,
  currentYearMonth: string,
  shoppingListItemId: number,
  expectedPurchaseDate: Date | null,
  completeFlag: boolean,
  purchase: string,
  shop: string | null,
  amount: number | null,
  bigCategoryId: number,
  mediumCategoryId: number | null,
  customCategoryId: number | null,
  regularShoppingListId: number | null,
  paymentUserId: string | null,
  transactionAutoAdd: boolean,
  relatedTransactionData: GroupRelatedTransactionData | null,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    if (expectedPurchaseDate === null) {
      return;
    }
    dispatch(startEditGroupShoppingListItemAction());

    const data: EditGroupShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      complete_flag: completeFlag,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      regular_shopping_list_id: regularShoppingListId,
      payment_user_id: paymentUserId,
      transaction_auto_add: transactionAutoAdd,
      related_transaction_data: relatedTransactionData,
    };
    try {
      const result = await axios.put<GroupShoppingListItem>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${shoppingListItemId}`,
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

      const prevExpiredShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupExpiredShoppingList;
      const prevTodayShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupTodayShoppingList;
      const prevTodayShoppingListByCategories: GroupShoppingListByCategories = getState()
        .groupShoppingList.groupTodayShoppingListByCategories;
      const prevMonthlyShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupMonthlyShoppingList;
      const prevMonthlyShoppingListByCategories: GroupShoppingListByCategories = getState()
        .groupShoppingList.groupMonthlyShoppingListByCategories;

      const resShoppingListItem: GroupShoppingListItem = result.data;

      const NOT_FOUND = -1;
      const NOT_EXIST_ARRAY_LENGTH = 0;

      const addResponseShoppingListItem = (
        idx: number,
        prevShoppingList: GroupShoppingList,
        nextShoppingListItem: GroupShoppingListItem
      ) => {
        if (idx === NOT_FOUND) {
          return prevShoppingList.concat(nextShoppingListItem);
        }

        prevShoppingList.splice(idx, 0, nextShoppingListItem);

        return prevShoppingList;
      };

      const addResponseShoppingListItemByCategories = (
        prevCategoryIdx: number,
        prevShoppingListByCategories: GroupShoppingListByCategories,
        newShoppingListItemByCategories: GroupShoppingListItemByCategories
      ) => {
        if (prevCategoryIdx === NOT_FOUND) {
          return prevShoppingListByCategories.concat(newShoppingListItemByCategories);
        }

        prevShoppingListByCategories.splice(prevCategoryIdx, 1, newShoppingListItemByCategories);
        return prevShoppingListByCategories;
      };

      const removePrevShoppingListItem = (prevShoppingList: GroupShoppingList) => {
        return prevShoppingList.filter((listItem) => {
          return listItem.id !== shoppingListItemId;
        });
      };

      const removeShoppingListItemByCategories = (
        prevShoppingListByCategories: GroupShoppingListByCategories,
        shoppingListItem: GroupShoppingListItem
      ) => {
        for (let i = 0; i < prevShoppingListByCategories.length; i++) {
          const prevItemIdx = prevShoppingListByCategories[i].shopping_list.findIndex(
            (item) => item.id === shoppingListItem.id
          );

          if (prevItemIdx !== NOT_FOUND) {
            const removeItemFromList = prevShoppingListByCategories[i].shopping_list.filter(
              (item) => item.id !== shoppingListItem.id
            );

            prevShoppingListByCategories[i].shopping_list = removeItemFromList;

            if (removeItemFromList.length === NOT_EXIST_ARRAY_LENGTH) {
              prevShoppingListByCategories.splice(i, 1);
            }

            break;
          }
        }

        return prevShoppingListByCategories;
      };

      const generateExpiredShoppingList = (
        prevShoppingList: GroupShoppingList,
        shoppingListItem: GroupShoppingListItem
      ) => {
        const removePrevItemFromPrevList: GroupShoppingList = removePrevShoppingListItem(
          prevShoppingList
        );

        if (
          dateToDateString(today) > resShoppingListItem.expected_purchase_date &&
          !resShoppingListItem.complete_flag
        ) {
          const idx = removePrevItemFromPrevList.findIndex((listItem) => {
            if (listItem.expected_purchase_date === shoppingListItem.expected_purchase_date) {
              return listItem.id > shoppingListItem.id;
            }

            return listItem.expected_purchase_date > shoppingListItem.expected_purchase_date;
          });

          return addResponseShoppingListItem(idx, removePrevItemFromPrevList, resShoppingListItem);
        }

        return removePrevItemFromPrevList;
      };

      const generateTodayShoppingList = (
        prevShoppingList: GroupShoppingList,
        shoppingListItem: GroupShoppingListItem
      ) => {
        const removePrevItemFromPrevList: GroupShoppingList = removePrevShoppingListItem(
          prevShoppingList
        );

        if (dateToDateString(today) === shoppingListItem.expected_purchase_date) {
          const idx = removePrevItemFromPrevList.findIndex(
            (listItem) => listItem.id > shoppingListItem.id
          );

          return addResponseShoppingListItem(idx, removePrevItemFromPrevList, shoppingListItem);
        }

        return removePrevItemFromPrevList;
      };

      const generateMonthlyShoppingList = (
        prevShoppingList: GroupShoppingList,
        shoppingListItem: GroupShoppingListItem
      ) => {
        const removePrevItemFromPrevList: GroupShoppingList = removePrevShoppingListItem(
          prevShoppingList
        );

        if (dateStringToMonthString(shoppingListItem.expected_purchase_date) === currentYearMonth) {
          const idx = removePrevItemFromPrevList.findIndex((listItem) => {
            if (listItem.expected_purchase_date === shoppingListItem.expected_purchase_date) {
              return listItem.id > shoppingListItem.id;
            }

            return listItem.expected_purchase_date > shoppingListItem.expected_purchase_date;
          });

          return addResponseShoppingListItem(idx, removePrevItemFromPrevList, shoppingListItem);
        }

        return removePrevItemFromPrevList;
      };

      const generateTodayShoppingListByCategories = (
        prevShoppingListByCategories: GroupShoppingListByCategories,
        bigCategoryId: number,
        shoppingListItem: GroupShoppingListItem
      ) => {
        const removePrevItemFromPrevList: GroupShoppingListByCategories = removeShoppingListItemByCategories(
          prevShoppingListByCategories,
          shoppingListItem
        );

        const prevCategoriesIdx = removePrevItemFromPrevList.findIndex(
          (item) => item.big_category_name === shoppingListItem.big_category_name
        );

        if (dateToDateString(today) === shoppingListItem.expected_purchase_date) {
          if (prevCategoriesIdx === NOT_FOUND) {
            const addCategoryItemIdx = removePrevItemFromPrevList.findIndex(
              (item) => item.shopping_list[0].big_category_id > shoppingListItem.big_category_id
            );

            const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
              big_category_name: shoppingListItem.big_category_name,
              shopping_list: [shoppingListItem],
            };

            if (addCategoryItemIdx === NOT_FOUND) {
              return removePrevItemFromPrevList.concat(newShoppingListItemByCategories);
            }

            removePrevItemFromPrevList.splice(
              addCategoryItemIdx,
              0,
              newShoppingListItemByCategories
            );

            return removePrevItemFromPrevList;
          }

          const prevShoppingListItemIdx = removePrevItemFromPrevList[
            prevCategoriesIdx
          ].shopping_list.findIndex((item) => item.id > shoppingListItem.id);

          const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
            big_category_name: removePrevItemFromPrevList[prevCategoriesIdx].big_category_name,
            shopping_list: addResponseShoppingListItem(
              prevShoppingListItemIdx,
              removePrevItemFromPrevList[prevCategoriesIdx].shopping_list,
              shoppingListItem
            ),
          };

          const newShoppingListByCategories = addResponseShoppingListItemByCategories(
            prevCategoriesIdx,
            removePrevItemFromPrevList,
            newShoppingListItemByCategories
          );

          return newShoppingListByCategories;
        }
        return removePrevItemFromPrevList;
      };

      const generateMonthlyShoppingListByCategories = (
        prevShoppingListByCategories: GroupShoppingListByCategories,
        bigCategoryId: number,
        shoppingListItem: GroupShoppingListItem
      ) => {
        const removePrevItemFromPrevList: GroupShoppingListByCategories = removeShoppingListItemByCategories(
          prevShoppingListByCategories,
          shoppingListItem
        );

        const prevCategoriesIdx = removePrevItemFromPrevList.findIndex(
          (item) => item.big_category_name === shoppingListItem.big_category_name
        );

        if (dateStringToMonthString(shoppingListItem.expected_purchase_date) === currentYearMonth) {
          if (prevCategoriesIdx === NOT_FOUND) {
            const addCategoryItemIdx = removePrevItemFromPrevList.findIndex(
              (item) => item.shopping_list[0].big_category_id > shoppingListItem.big_category_id
            );

            const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
              big_category_name: shoppingListItem.big_category_name,
              shopping_list: [shoppingListItem],
            };

            if (addCategoryItemIdx === NOT_FOUND) {
              return removePrevItemFromPrevList.concat(newShoppingListItemByCategories);
            }

            removePrevItemFromPrevList.splice(
              addCategoryItemIdx,
              0,
              newShoppingListItemByCategories
            );

            return removePrevItemFromPrevList;
          }

          const idx = removePrevItemFromPrevList[prevCategoriesIdx].shopping_list.findIndex(
            (listItem) => {
              if (listItem.expected_purchase_date === shoppingListItem.expected_purchase_date) {
                return listItem.id > shoppingListItem.id;
              }
              return listItem.expected_purchase_date > shoppingListItem.expected_purchase_date;
            }
          );

          const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
            big_category_name: removePrevItemFromPrevList[prevCategoriesIdx].big_category_name,
            shopping_list: addResponseShoppingListItem(
              idx,
              removePrevItemFromPrevList[prevCategoriesIdx].shopping_list,
              shoppingListItem
            ),
          };

          return addResponseShoppingListItemByCategories(
            prevCategoriesIdx,
            removePrevItemFromPrevList,
            newShoppingListItemByCategories
          );
        }
        return removePrevItemFromPrevList;
      };

      const nextExpiredShoppingList: GroupShoppingList = generateExpiredShoppingList(
        prevExpiredShoppingList,
        resShoppingListItem
      ).concat();

      const nextTodayShoppingList: GroupShoppingList = generateTodayShoppingList(
        prevTodayShoppingList,
        resShoppingListItem
      ).concat();

      const nextTodayShoppingListByCategories: GroupShoppingListByCategories = generateTodayShoppingListByCategories(
        prevTodayShoppingListByCategories,
        bigCategoryId,
        resShoppingListItem
      ).concat();

      const nextMonthlyShoppingList: GroupShoppingList = generateMonthlyShoppingList(
        prevMonthlyShoppingList,
        resShoppingListItem
      ).concat();

      const nextMonthlyShoppingListByCategories: GroupShoppingListByCategories = generateMonthlyShoppingListByCategories(
        prevMonthlyShoppingListByCategories,
        bigCategoryId,
        resShoppingListItem
      ).concat();

      dispatch(
        editGroupShoppingListItemAction(
          nextExpiredShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelEditGroupShoppingListItemAction());
      } else {
        dispatch(
          failedEditGroupShoppingListItemAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const deleteGroupShoppingListItem = (
  groupId: number,
  shoppingListItemId: number,
  bigCategoryName: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State) => {
    dispatch(startDeleteGroupShoppingListItemAction());

    try {
      const result = await axios.delete<DeleteGroupShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${shoppingListItemId}`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const prevExpiredShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupExpiredShoppingList;
      const prevTodayShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupTodayShoppingList;
      const prevTodayShoppingListByCategories: GroupShoppingListByCategories = getState()
        .groupShoppingList.groupTodayShoppingListByCategories;
      const prevMonthlyShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupMonthlyShoppingList;
      const prevMonthlyShoppingListByCategories: GroupShoppingListByCategories = getState()
        .groupShoppingList.groupMonthlyShoppingListByCategories;

      const message = result.data.message;

      const generateShoppingList = (prevShoppingList: GroupShoppingList) => {
        return prevShoppingList.filter((listItem) => {
          return listItem.id !== shoppingListItemId;
        });
      };

      const generateShoppingListByCategories = (
        prevShoppingListByCategories: GroupShoppingListByCategories
      ) => {
        const NOT_FOUND = -1;
        const idx = prevShoppingListByCategories.findIndex(
          (listItem) => listItem.big_category_name === bigCategoryName
        );

        if (idx === NOT_FOUND) {
          return prevShoppingListByCategories;
        }
        const nextShoppingListItemByCategories: GroupShoppingListItemByCategories = {
          big_category_name: bigCategoryName,
          shopping_list: generateShoppingList(prevShoppingListByCategories[idx].shopping_list),
        };

        if (!nextShoppingListItemByCategories.shopping_list.length) {
          prevShoppingListByCategories.splice(idx, 1);
          return prevShoppingListByCategories;
        }
        prevShoppingListByCategories.splice(idx, 1, nextShoppingListItemByCategories);
        return prevShoppingListByCategories;
      };

      const nextExpiredShoppingList = generateShoppingList(prevExpiredShoppingList).concat();
      const nextTodayShoppingList = generateShoppingList(prevTodayShoppingList).concat();
      const nextTodayShoppingListByCategories = generateShoppingListByCategories(
        prevTodayShoppingListByCategories
      ).concat();
      const nextMonthlyShoppingList = generateShoppingList(prevMonthlyShoppingList).concat();
      const nextMonthlyShoppingListByCategories = generateShoppingListByCategories(
        prevMonthlyShoppingListByCategories
      ).concat();

      dispatch(
        deleteGroupShoppingListItemAction(
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
        dispatch(cancelDeleteGroupShoppingListItemAction());
      } else {
        dispatch(
          failedDeleteGroupShoppingListItemAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};

export const addGroupRegularShoppingListItem = (
  groupId: number,
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
  paymentUserId: string | null,
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
    dispatch(startAddGroupRegularShoppingListItemAction());

    const data: AddGroupRegularShoppingListItemReq = {
      expected_purchase_date: expectedPurchaseDate,
      cycle_type: cycleType,
      cycle: cycle,
      purchase: purchase,
      shop: shop,
      amount: amount,
      big_category_id: bigCategoryId,
      medium_category_id: mediumCategoryId,
      custom_category_id: customCategoryId,
      payment_user_id: paymentUserId,
      transaction_auto_add: transactionAutoAdd,
    };

    try {
      const result = await axios.post<AddGroupRegularShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/regular`,
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

      const prevRegularShoppingList: GroupRegularShoppingList = getState().groupShoppingList
        .groupRegularShoppingList;
      const prevTodayShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupTodayShoppingList;
      const prevTodayShoppingListByCategories: GroupShoppingListByCategories = getState()
        .groupShoppingList.groupTodayShoppingListByCategories;
      const prevMonthlyShoppingList: GroupShoppingList = getState().groupShoppingList
        .groupMonthlyShoppingList;
      const prevMonthlyShoppingListByCategories: GroupShoppingListByCategories = getState()
        .groupShoppingList.groupMonthlyShoppingListByCategories;

      const resRegularShoppingListItem: GroupRegularShoppingListItem =
        result.data.regular_shopping_item;
      const resShoppingList: GroupShoppingList = result.data.shopping_list;

      const NOT_FOUND = -1;
      const NOT_EXIST_ARRAY_LENGTH = 0;
      const INCLUDES_TODAY_ITEM = 2;

      const addResponseShoppingListItem = (
        idx: number,
        prevShoppingList: GroupShoppingList,
        nextShoppingListItem: GroupShoppingListItem
      ) => {
        if (idx === NOT_FOUND) {
          return prevShoppingList.concat(nextShoppingListItem);
        }
        prevShoppingList.splice(idx, 0, nextShoppingListItem);
        return prevShoppingList;
      };

      const addResponseShoppingList = (
        prevShoppingList: GroupShoppingList,
        shoppingList: GroupShoppingList
      ) => {
        let nextShoppingList: GroupShoppingList = [];
        for (const listItem of shoppingList) {
          if (currentYearMonth === dateStringToMonthString(listItem.expected_purchase_date)) {
            const idx = prevShoppingList.findIndex((prevItem) => {
              if (prevItem.expected_purchase_date === listItem.expected_purchase_date) {
                return prevItem.id > listItem.id;
              }
              return prevItem.expected_purchase_date > listItem.expected_purchase_date;
            });

            nextShoppingList = addResponseShoppingListItem(idx, prevShoppingList, listItem);
          }
        }
        return nextShoppingList;
      };

      const addResponseShoppingListItemByCategories = (
        addCategoryIdx: number,
        prevShoppingListByCategories: GroupShoppingListByCategories,
        newShoppingListItemByCategories: GroupShoppingListItemByCategories
      ) => {
        if (addCategoryIdx === NOT_FOUND) {
          return prevShoppingListByCategories.concat(newShoppingListItemByCategories);
        }
        prevShoppingListByCategories.splice(addCategoryIdx, 0, newShoppingListItemByCategories);
        return prevShoppingListByCategories;
      };

      const generateTodayShoppingList = (
        prevShoppingList: GroupShoppingList,
        shoppingList: GroupShoppingList
      ) => {
        if (shoppingList.length === INCLUDES_TODAY_ITEM) {
          return prevShoppingList.concat(shoppingList[0]);
        }
        return prevShoppingList;
      };

      const generateTodayShoppingListByCategories = (
        prevShoppingListByCategories: GroupShoppingListByCategories,
        shoppingList: GroupShoppingList
      ) => {
        if (shoppingList.length === INCLUDES_TODAY_ITEM) {
          const shoppingListItem = shoppingList[0];

          const prevCategoriesIdx = prevShoppingListByCategories.findIndex(
            (item) => item.big_category_name === shoppingListItem.big_category_name
          );
          const addCategoryIdx = prevShoppingListByCategories.findIndex(
            (item) => item.shopping_list[0].big_category_id > shoppingListItem.big_category_id
          );

          if (prevCategoriesIdx === NOT_FOUND) {
            const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
              big_category_name: shoppingListItem.big_category_name,
              shopping_list: [shoppingListItem],
            };

            return addResponseShoppingListItemByCategories(
              addCategoryIdx,
              prevShoppingListByCategories,
              newShoppingListItemByCategories
            );
          }

          const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
            big_category_name: prevShoppingListByCategories[prevCategoriesIdx].big_category_name,
            shopping_list: prevShoppingListByCategories[prevCategoriesIdx].shopping_list.concat(
              shoppingListItem
            ),
          };

          prevShoppingListByCategories.splice(
            prevCategoriesIdx,
            1,
            newShoppingListItemByCategories
          );

          return prevShoppingListByCategories;
        }
        return prevShoppingListByCategories;
      };

      const generateMonthlyShoppingList = (
        prevShoppingList: GroupShoppingList,
        shoppingList: GroupShoppingList
      ) => {
        if (prevShoppingList.length === NOT_EXIST_ARRAY_LENGTH) {
          return shoppingList.filter((listItem) => {
            if (dateStringToMonthString(listItem.expected_purchase_date) === currentYearMonth) {
              return listItem;
            }
          });
        }
        return addResponseShoppingList(prevShoppingList, shoppingList);
      };

      const generateMonthlyShoppingListByCategories = (
        prevShoppingListByCategories: GroupShoppingListByCategories,
        shoppingList: GroupShoppingList,
        regularShoppingListItem: GroupRegularShoppingListItem
      ) => {
        const prevCategoriesIdx = prevShoppingListByCategories.findIndex(
          (item) => item.big_category_name === regularShoppingListItem.big_category_name
        );

        const pushCategoryItemIdx = prevShoppingListByCategories.findIndex(
          (item) => item.shopping_list[0].big_category_id > regularShoppingListItem.big_category_id
        );

        if (prevCategoriesIdx === NOT_FOUND) {
          const nextShoppingList: GroupShoppingList = shoppingList.filter((listItem) => {
            if (dateStringToMonthString(listItem.expected_purchase_date) === currentYearMonth) {
              return listItem;
            }
          });

          if (nextShoppingList.length === NOT_EXIST_ARRAY_LENGTH) {
            return prevShoppingListByCategories;
          }

          const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
            big_category_name: regularShoppingListItem.big_category_name,
            shopping_list: nextShoppingList,
          };

          return addResponseShoppingListItemByCategories(
            pushCategoryItemIdx,
            prevShoppingListByCategories,
            newShoppingListItemByCategories
          );
        }

        const nextShoppingList = addResponseShoppingList(
          prevShoppingListByCategories[prevCategoriesIdx].shopping_list,
          shoppingList
        );

        const newShoppingListItemByCategories: GroupShoppingListItemByCategories = {
          big_category_name: prevShoppingListByCategories[prevCategoriesIdx].big_category_name,
          shopping_list: nextShoppingList,
        };
        prevShoppingListByCategories.splice(prevCategoriesIdx, 1, newShoppingListItemByCategories);
        return prevShoppingListByCategories;
      };

      const nextRegularShoppingList: GroupRegularShoppingList = prevRegularShoppingList.concat(
        resRegularShoppingListItem
      );
      const nextTodayShoppingList: GroupShoppingList = generateTodayShoppingList(
        prevTodayShoppingList,
        resShoppingList
      ).concat();
      const nextTodayShoppingListByCategories: GroupShoppingListByCategories = generateTodayShoppingListByCategories(
        prevTodayShoppingListByCategories,
        resShoppingList
      ).concat();
      const nextMonthlyShoppingList: GroupShoppingList = generateMonthlyShoppingList(
        prevMonthlyShoppingList,
        resShoppingList
      ).concat();
      const nextMonthlyShoppingListByCategories: GroupShoppingListByCategories = generateMonthlyShoppingListByCategories(
        prevMonthlyShoppingListByCategories,
        resShoppingList,
        resRegularShoppingListItem
      ).concat();

      dispatch(
        addGroupRegularShoppingListItemAction(
          nextRegularShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelAddGroupRegularShoppingListItemAction());
      } else {
        dispatch(
          failedAddGroupRegularShoppingListItemAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};
