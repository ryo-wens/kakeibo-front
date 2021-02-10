import {
  fetchIncomeCategoryActions,
  fetchExpenseCategoryActions,
  addIncomeCustomCategoryActions,
  addExpenseCustomCategoryActions,
  editIncomeCustomCategoryActions,
  editExpenseCustomCategoryActions,
  deleteIncomeCustomCategoryActions,
  deleteExpenseCustomCategoryActions,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { Dispatch, Action } from 'redux';
import {
  FetchCategoriesRes,
  CrudCustomCategoryReq,
  CrudCustomCategoryRes,
  DeletedMessage,
} from './types';
import { errorHandling } from '../../lib/validation';

export const fetchCategories = (signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const result = await axios.get<FetchCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const incomeCategories = result.data.income_categories_list;
      const expenseCategories = result.data.expense_categories_list;

      dispatch(fetchIncomeCategoryActions(incomeCategories));
      dispatch(fetchExpenseCategoryActions(expenseCategories));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        errorHandling(dispatch, error);
      }
    }
  };
};

export const addCustomCategories = (
  name: string,
  bigCategoryId: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const data: CrudCustomCategoryReq = {
      name: name,
      big_category_id: bigCategoryId,
    };
    try {
      await axios.post<CrudCustomCategoryRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchResult = await axios.get<FetchCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const incomeCategories = fetchResult.data.income_categories_list;
      const expenseCategories = fetchResult.data.expense_categories_list;

      // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
      if (bigCategoryId === 1) {
        dispatch(addIncomeCustomCategoryActions(incomeCategories));
      } else {
        dispatch(addExpenseCustomCategoryActions(expenseCategories));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const editCustomCategories = (
  id: number,
  name: string,
  bigCategoryId: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const data: CrudCustomCategoryReq = {
      name: name,
      big_category_id: bigCategoryId,
    };
    try {
      await axios.put<CrudCustomCategoryRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      );

      const fetchResult = await axios.get<FetchCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const incomeCategories = fetchResult.data.income_categories_list;
      const expenseCategories = fetchResult.data.expense_categories_list;

      // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
      if (bigCategoryId === 1) {
        dispatch(editIncomeCustomCategoryActions(incomeCategories));
      } else {
        dispatch(editExpenseCustomCategoryActions(expenseCategories));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};

export const deleteCustomCategories = (
  id: number,
  bigCategoryId: number,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      await axios.delete<DeletedMessage>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories/custom-categories/${id}`,
        {
          withCredentials: true,
        }
      );

      const fetchResult = await axios.get<FetchCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/categories`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const incomeCategories = fetchResult.data.income_categories_list;
      const expenseCategories = fetchResult.data.expense_categories_list;

      // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
      if (bigCategoryId === 1) {
        dispatch(deleteIncomeCustomCategoryActions(incomeCategories));
      } else {
        dispatch(deleteExpenseCustomCategoryActions(expenseCategories));
      }
    } catch (error) {
      errorHandling(dispatch, error);
    }
  };
};
