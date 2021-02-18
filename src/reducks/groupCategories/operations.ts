import {
  startFetchGroupCategoriesActions,
  fetchGroupIncomeCategoriesAction,
  fetchGroupExpenseCategoriesAction,
  cancelFetchGroupCategoriesActions,
  failedFetchGroupCategories,
  startAddGroupCategoriesActions,
  addGroupIncomeCategory,
  addGroupExpenseCategory,
  failedAddGroupCategoriesActions,
  startEditGroupCategoriesActions,
  editGroupIncomeCategory,
  editGroupExpenseCategory,
  failedEditGroupCategories,
  startDeleteGroupCategoriesActions,
  deleteIncomeCategory,
  deleteExpenseCategory,
  failedDeleteGroupCategories,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { Dispatch, Action } from 'redux';
import {
  fetchGroupCategoriesRes,
  operationCategoriesReq,
  operationCategoriesRes,
  deleteGroupCustomCategoriesRes,
} from './types';

export const fetchGroupCategories = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startFetchGroupCategoriesActions());

    try {
      const fetchResult = await axios.get<fetchGroupCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const groupIncomeCategories = fetchResult.data.income_categories_list;
      const groupExpenseCategories = fetchResult.data.expense_categories_list;

      dispatch(fetchGroupIncomeCategoriesAction(groupIncomeCategories));
      dispatch(fetchGroupExpenseCategoriesAction(groupExpenseCategories));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupCategoriesActions());
      } else {
        dispatch(
          failedFetchGroupCategories(error.response.status, error.response.data.error.message)
        );
      }
    }
  };
};

export const addGroupCustomCategories = (
  name: string,
  bigCategoryId: number,
  groupId: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const data: operationCategoriesReq = {
      name: name,
      big_category_id: bigCategoryId,
    };

    dispatch(startAddGroupCategoriesActions());

    try {
      await axios.post<operationCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchResult = await axios.get<fetchGroupCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const addedGroupIncomeCategoriesList = fetchResult.data.income_categories_list;
      const addedGroupExpenseCategoriesList = fetchResult.data.expense_categories_list;

      // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
      if (bigCategoryId === 1) {
        dispatch(addGroupIncomeCategory(addedGroupIncomeCategoriesList));
      } else {
        dispatch(addGroupExpenseCategory(addedGroupExpenseCategoriesList));
      }
    } catch (error) {
      dispatch(
        failedAddGroupCategoriesActions(error.response.status, error.response.data.error.message)
      );
    }
  };
};

export const editGroupCustomCategories = (
  id: number,
  name: string,
  bigCategoryId: number,
  groupId: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const data: operationCategoriesReq = {
      name: name,
      big_category_id: bigCategoryId,
    };

    dispatch(startEditGroupCategoriesActions());

    try {
      await axios.put<operationCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchResult = await axios.get<fetchGroupCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const editedGroupIncomeCategories = fetchResult.data.income_categories_list;
      const editedGroupExpenseCategories = fetchResult.data.expense_categories_list;

      // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
      if (bigCategoryId === 1) {
        dispatch(editGroupIncomeCategory(editedGroupIncomeCategories));
      } else {
        dispatch(editGroupExpenseCategory(editedGroupExpenseCategories));
      }
    } catch (error) {
      dispatch(failedEditGroupCategories(error.response.status, error.response.data.error.message));
    }
  };
};

export const deleteGroupCustomCategories = (
  id: number,
  bigCategoryId: number,
  groupId: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(startDeleteGroupCategoriesActions());

    try {
      await axios.delete<deleteGroupCustomCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories/custom-categories/${id}`,
        {
          withCredentials: true,
        }
      );

      const fetchResult = await axios.get<fetchGroupCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/${groupId}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const deletedGroupIncomeCategories = fetchResult.data.income_categories_list;
      const deletedGroupExpenseCategories = fetchResult.data.expense_categories_list;

      // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
      if (bigCategoryId === 1) {
        dispatch(deleteIncomeCategory(deletedGroupIncomeCategories));
      } else {
        dispatch(deleteExpenseCategory(deletedGroupExpenseCategories));
      }
    } catch (error) {
      dispatch(
        failedDeleteGroupCategories(error.response.status, error.response.data.error.message)
      );
    }
  };
};
