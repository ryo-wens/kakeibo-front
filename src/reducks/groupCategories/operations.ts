import {
  fetchGroupIncomeCategoriesAction,
  fetchGroupExpenseCategoriesAction,
  addGroupIncomeCategory,
  addGroupExpenseCategory,
  editGroupIncomeCategory,
  editGroupExpenseCategory,
  deleteIncomeCategory,
  deleteExpenseCategory,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { Dispatch, Action } from 'redux';
import {
  fetchGroupCategoriesRes,
  operationCategoriesReq,
  operationCategoriesRes,
  deleteGroupCustomCategoriesRes,
} from './types';
import { errorHandling } from '../../lib/validation';

export const fetchGroupCategories = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
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
        return;
      } else {
        errorHandling(dispatch, error);
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
      errorHandling(dispatch, error);
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
      errorHandling(dispatch, error);
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
      errorHandling(dispatch, error);
    }
  };
};
