import { Action, Dispatch } from 'redux';
import {
  addGroupRegularShoppingListItemAction,
  addGroupShoppingListItemAction,
  cancelFetchGroupExpiredShoppingListAction,
  cancelFetchGroupMonthlyShoppingListAction,
  cancelFetchGroupMonthlyShoppingListByCategoriesAction,
  cancelFetchGroupTodayShoppingListAction,
  cancelFetchGroupTodayShoppingListByCategoriesAction,
  deleteGroupRegularShoppingListItemAction,
  deleteGroupShoppingListItemAction,
  editGroupRegularShoppingListItemAction,
  editGroupShoppingListItemAction,
  failedAddGroupRegularShoppingListItemAction,
  failedAddGroupShoppingListItemAction,
  failedDeleteGroupRegularShoppingListItemAction,
  failedDeleteGroupShoppingListItemAction,
  failedEditGroupRegularShoppingListItemAction,
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
  startDeleteGroupRegularShoppingListItemAction,
  startDeleteGroupShoppingListItemAction,
  startEditGroupRegularShoppingListItemAction,
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
  DeleteGroupRegularShoppingListItemRes,
  DeleteGroupShoppingListItemRes,
  EditGroupRegularShoppingListItemReq,
  EditGroupRegularShoppingListItemRes,
  EditGroupShoppingListItemReq,
  FetchGroupExpiredShoppingListRes,
  FetchGroupMonthlyShoppingListByCategoriesRes,
  FetchGroupMonthlyShoppingListRes,
  FetchGroupTodayShoppingListByCategoriesRes,
  FetchGroupTodayShoppingListRes,
  GroupRegularShoppingList,
  GroupShoppingList,
  GroupShoppingListByCategories,
  GroupShoppingListItem,
} from './types';
import dayjs from 'dayjs';
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
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: AddGroupShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddGroupShoppingListItemAction());

    try {
      await axios.post<GroupShoppingListItem>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchGroupTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchGroupMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`,
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
        addGroupShoppingListItemAction(
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      dispatch(
        failedAddGroupShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const editGroupShoppingListItem = (
  groupId: number,
  shoppingListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: EditGroupShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditGroupShoppingListItemAction());

    try {
      await axios.put<GroupShoppingListItem>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${shoppingListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchExpiredListResult = await axios.get<FetchGroupExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/expired`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchGroupTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchGroupMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`,
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
        editGroupShoppingListItemAction(
          nextExpiredShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      dispatch(
        failedEditGroupShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const deleteGroupShoppingListItem = (
  groupId: number,
  shoppingListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupShoppingListItemAction());

    try {
      const deleteShoppingListItemResult = await axios.delete<DeleteGroupShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${shoppingListItemId}`,
        {
          withCredentials: true,
        }
      );
      const fetchExpiredListResult = await axios.get<FetchGroupExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/expired`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchGroupTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchGroupMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`,
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
        deleteGroupShoppingListItemAction(
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
        failedDeleteGroupShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const addGroupRegularShoppingListItem = (
  groupId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: AddGroupRegularShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddGroupRegularShoppingListItemAction());

    try {
      await axios.post<AddGroupRegularShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/regular`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchGroupTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchGroupMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`,
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
        addGroupRegularShoppingListItemAction(
          nextRegularShoppingList,
          nextTodayShoppingList,
          nextTodayShoppingListByCategories,
          nextMonthlyShoppingList,
          nextMonthlyShoppingListByCategories
        )
      );
    } catch (error) {
      dispatch(
        failedAddGroupRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const editGroupRegularShoppingListItem = (
  groupId: number,
  regularShoppingListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string,
  requestData: EditGroupRegularShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startEditGroupRegularShoppingListItemAction());

    try {
      await axios.put<EditGroupRegularShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/regular/${regularShoppingListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        }),
        {
          withCredentials: true,
        }
      );

      const fetchExpiredListResult = await axios.get<FetchGroupExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/expired`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchGroupTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchGroupMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`,
        {
          withCredentials: true,
        }
      );

      const nextRegularShoppingList = fetchTodayListResult.data.regular_shopping_list;
      const nextExpiredShoppingList = fetchExpiredListResult.data.expired_shopping_list;
      const nextTodayShoppingList = fetchTodayListResult.data.shopping_list;
      const nextTodayShoppingListByCategories =
        fetchTodayListByCategoriesResult.data.shopping_list_by_categories;
      const nextMonthlyShoppingList = fetchMonthlyListResult.data.shopping_list;
      const nextMonthlyShoppingListByCategories =
        fetchMonthlyListByCategoriesResult.data.shopping_list_by_categories;

      dispatch(
        editGroupRegularShoppingListItemAction(
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
        failedEditGroupRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};

export const deleteGroupRegularShoppingListItem = (
  groupId: number,
  regularShoppingListItemId: number,
  year: string,
  month: string,
  date: string,
  currentYear: string,
  currentMonth: string
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startDeleteGroupRegularShoppingListItemAction());

    try {
      const deleteRegularShoppingListItemResult = await axios.delete<DeleteGroupRegularShoppingListItemRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/regular/${regularShoppingListItemId}`,
        {
          withCredentials: true,
        }
      );
      const fetchExpiredListResult = await axios.get<FetchGroupExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/expired`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListResult = await axios.get<FetchGroupTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchTodayListByCategoriesResult = await axios.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListResult = await axios.get<FetchGroupMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`,
        {
          withCredentials: true,
        }
      );

      const fetchMonthlyListByCategoriesResult = await axios.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`,
        {
          withCredentials: true,
        }
      );

      const nextRegularShoppingList = fetchTodayListResult.data.regular_shopping_list;
      const nextExpiredShoppingList = fetchExpiredListResult.data.expired_shopping_list;
      const nextTodayShoppingList = fetchTodayListResult.data.shopping_list;
      const nextTodayShoppingListByCategories =
        fetchTodayListByCategoriesResult.data.shopping_list_by_categories;
      const nextMonthlyShoppingList = fetchMonthlyListResult.data.shopping_list;
      const nextMonthlyShoppingListByCategories =
        fetchMonthlyListByCategoriesResult.data.shopping_list_by_categories;

      dispatch(
        deleteGroupRegularShoppingListItemAction(
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
        failedDeleteGroupRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
    }
  };
};
