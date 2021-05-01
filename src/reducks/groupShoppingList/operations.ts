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
import { todoServiceInstance } from '../axiosConfig';

export const fetchGroupExpiredShoppingList = (groupId: number, signal?: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupExpiredShoppingListAction());

    try {
      const result = await todoServiceInstance.get<FetchGroupExpiredShoppingListRes>(
        `/groups/${groupId}/shopping-list/expired`,
        { cancelToken: signal?.token }
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
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTodayShoppingListAction());

    try {
      const result = await todoServiceInstance.get<FetchGroupTodayShoppingListRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`,
        { cancelToken: signal?.token }
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
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupTodayShoppingListByCategoriesAction());

    try {
      const result = await todoServiceInstance.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`,
        { cancelToken: signal?.token }
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
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupMonthlyShoppingListAction());

    try {
      const result = await todoServiceInstance.get<FetchGroupMonthlyShoppingListRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}/daily`,
        { cancelToken: signal?.token }
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
  signal?: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupMonthlyShoppingListByCategoriesAction());

    try {
      const result = await todoServiceInstance.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}/categories`,
        { cancelToken: signal?.token }
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
  requestData: AddGroupShoppingListItemReq
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startAddGroupShoppingListItemAction());

    try {
      const res = await todoServiceInstance.post<GroupShoppingListItem>(
        `/groups/${groupId}/shopping-list`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      dispatch(addGroupShoppingListItemAction(res.data));
    } catch (error) {
      dispatch(
        failedAddGroupShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
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
      await todoServiceInstance.put<GroupShoppingListItem>(
        `/groups/${groupId}/shopping-list/${shoppingListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const fetchExpiredListResult = todoServiceInstance.get<FetchGroupExpiredShoppingListRes>(
        `/groups/${groupId}/shopping-list/expired`
      );

      const fetchTodayListResult = todoServiceInstance.get<FetchGroupTodayShoppingListRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`
      );

      const fetchTodayListByCategoriesResult = todoServiceInstance.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`
      );

      const fetchMonthlyListResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`
      );

      const fetchMonthlyListByCategoriesResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`
      );

      const expiredShoppingListResponse = await fetchExpiredListResult;
      const todayShoppingListResponse = await fetchTodayListResult;
      const todayShoppingListByCategoriesResponse = await fetchTodayListByCategoriesResult;
      const monthlyShoppingListResponse = await fetchMonthlyListResult;
      const monthlyShoppingListByCategoriesResponse = await fetchMonthlyListByCategoriesResult;

      dispatch(
        editGroupShoppingListItemAction(
          expiredShoppingListResponse.data.expired_shopping_list,
          todayShoppingListResponse.data.shopping_list,
          todayShoppingListByCategoriesResponse.data.shopping_list_by_categories,
          monthlyShoppingListResponse.data.shopping_list,
          monthlyShoppingListByCategoriesResponse.data.shopping_list_by_categories
        )
      );
    } catch (error) {
      dispatch(
        failedEditGroupShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
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
      const deleteShoppingListItemResult = await todoServiceInstance.delete<DeleteGroupShoppingListItemRes>(
        `/groups/${groupId}/shopping-list/${shoppingListItemId}`
      );
      const fetchExpiredListResult = todoServiceInstance.get<FetchGroupExpiredShoppingListRes>(
        `/groups/${groupId}/shopping-list/expired`
      );

      const fetchTodayListResult = todoServiceInstance.get<FetchGroupTodayShoppingListRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`
      );

      const fetchTodayListByCategoriesResult = todoServiceInstance.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`
      );

      const fetchMonthlyListResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`
      );

      const fetchMonthlyListByCategoriesResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`
      );

      const expiredShoppingListResponse = await fetchExpiredListResult;
      const todayShoppingListResponse = await fetchTodayListResult;
      const todayShoppingListByCategoriesResponse = await fetchTodayListByCategoriesResult;
      const monthlyShoppingListResponse = await fetchMonthlyListResult;
      const monthlyShoppingListByCategoriesResponse = await fetchMonthlyListByCategoriesResult;

      dispatch(
        deleteGroupShoppingListItemAction(
          expiredShoppingListResponse.data.expired_shopping_list,
          todayShoppingListResponse.data.shopping_list,
          todayShoppingListByCategoriesResponse.data.shopping_list_by_categories,
          monthlyShoppingListResponse.data.shopping_list,
          monthlyShoppingListByCategoriesResponse.data.shopping_list_by_categories
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
      throw error;
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
      await todoServiceInstance.post<AddGroupRegularShoppingListItemRes>(
        `/groups/${groupId}/shopping-list/regular`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const fetchTodayListResult = todoServiceInstance.get<FetchGroupTodayShoppingListRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`
      );

      const fetchTodayListByCategoriesResult = todoServiceInstance.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`
      );

      const fetchMonthlyListResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`
      );

      const fetchMonthlyListByCategoriesResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`
      );

      const todayShoppingListResponse = await fetchTodayListResult;
      const todayShoppingListByCategoriesResponse = await fetchTodayListByCategoriesResult;
      const monthlyShoppingListResponse = await fetchMonthlyListResult;
      const monthlyShoppingListByCategoriesResponse = await fetchMonthlyListByCategoriesResult;

      dispatch(
        addGroupRegularShoppingListItemAction(
          todayShoppingListResponse.data.regular_shopping_list,
          todayShoppingListResponse.data.shopping_list,
          todayShoppingListByCategoriesResponse.data.shopping_list_by_categories,
          monthlyShoppingListResponse.data.shopping_list,
          monthlyShoppingListByCategoriesResponse.data.shopping_list_by_categories
        )
      );
    } catch (error) {
      dispatch(
        failedAddGroupRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
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
      await todoServiceInstance.put<EditGroupRegularShoppingListItemRes>(
        `/groups/${groupId}/shopping-list/regular/${regularShoppingListItemId}`,
        JSON.stringify(requestData, function (key, value) {
          if (key === 'expected_purchase_date') {
            return dayjs(new Date(value)).format();
          }
          return value;
        })
      );

      const fetchExpiredListResult = todoServiceInstance.get<FetchGroupExpiredShoppingListRes>(
        `/groups/${groupId}/shopping-list/expired`
      );

      const fetchTodayListResult = todoServiceInstance.get<FetchGroupTodayShoppingListRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`
      );

      const fetchTodayListByCategoriesResult = todoServiceInstance.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`
      );

      const fetchMonthlyListResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`
      );

      const fetchMonthlyListByCategoriesResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`
      );

      const expiredShoppingListResponse = await fetchExpiredListResult;
      const todayShoppingListResponse = await fetchTodayListResult;
      const todayShoppingListByCategoriesResponse = await fetchTodayListByCategoriesResult;
      const monthlyShoppingListResponse = await fetchMonthlyListResult;
      const monthlyShoppingListByCategoriesResponse = await fetchMonthlyListByCategoriesResult;

      dispatch(
        editGroupRegularShoppingListItemAction(
          todayShoppingListResponse.data.regular_shopping_list,
          expiredShoppingListResponse.data.expired_shopping_list,
          todayShoppingListResponse.data.shopping_list,
          todayShoppingListByCategoriesResponse.data.shopping_list_by_categories,
          monthlyShoppingListResponse.data.shopping_list,
          monthlyShoppingListByCategoriesResponse.data.shopping_list_by_categories
        )
      );
    } catch (error) {
      dispatch(
        failedEditGroupRegularShoppingListItemAction(
          error.response.status,
          error.response.data.error.message
        )
      );
      throw error;
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
      const deleteRegularShoppingListItemResult = await todoServiceInstance.delete<DeleteGroupRegularShoppingListItemRes>(
        `/groups/${groupId}/shopping-list/regular/${regularShoppingListItemId}`
      );
      const fetchExpiredListResult = todoServiceInstance.get<FetchGroupExpiredShoppingListRes>(
        `/groups/${groupId}/shopping-list/expired`
      );

      const fetchTodayListResult = todoServiceInstance.get<FetchGroupTodayShoppingListRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/daily`
      );

      const fetchTodayListByCategoriesResult = todoServiceInstance.get<FetchGroupTodayShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${year}-${month}-${date}/categories`
      );

      const fetchMonthlyListResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/daily`
      );

      const fetchMonthlyListByCategoriesResult = todoServiceInstance.get<FetchGroupMonthlyShoppingListByCategoriesRes>(
        `/groups/${groupId}/shopping-list/${currentYear}-${currentMonth}/categories`
      );

      const expiredShoppingListResponse = await fetchExpiredListResult;
      const todayShoppingListResponse = await fetchTodayListResult;
      const todayShoppingListByCategoriesResponse = await fetchTodayListByCategoriesResult;
      const monthlyShoppingListResponse = await fetchMonthlyListResult;
      const monthlyShoppingListByCategoriesResponse = await fetchMonthlyListByCategoriesResult;

      dispatch(
        deleteGroupRegularShoppingListItemAction(
          todayShoppingListResponse.data.regular_shopping_list,
          expiredShoppingListResponse.data.expired_shopping_list,
          todayShoppingListResponse.data.shopping_list,
          todayShoppingListByCategoriesResponse.data.shopping_list_by_categories,
          monthlyShoppingListResponse.data.shopping_list,
          monthlyShoppingListByCategoriesResponse.data.shopping_list_by_categories
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
      throw error;
    }
  };
};
