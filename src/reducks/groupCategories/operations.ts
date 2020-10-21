import { updateGroupIncomeCategoriesAction, updateGroupExpenseCategoriesAction } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import {
  fetchGroupCategoriesRes,
  GroupCategory,
  operationCategoriesReq,
  operationCategoriesRes,
} from './types';
import { errorHandling } from '../../lib/validation';
import { State } from '../store/types';

export const fetchGroupCategories = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<fetchGroupCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/categories`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const groupIncomeCategories = res.data.income_categories_list;
        const groupExpenseCategories = res.data.expense_categories_list;
        dispatch(updateGroupIncomeCategoriesAction(groupIncomeCategories));
        dispatch(updateGroupExpenseCategoriesAction(groupExpenseCategories));
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};

export const addGroupCustomCategories = (name: string, bigCategoryId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const data: operationCategoriesReq = {
      name: name,
      big_category_id: bigCategoryId,
    };
    await axios
      .post<operationCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/categories/custom-categories`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const addedCategory = res.data;

        // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
        if (bigCategoryId === 1) {
          const incomeGroupCategories = getState().groupCategories.groupIncomeList;

          const nextGroupIncomeCategories = incomeGroupCategories.map(
            (incomeCategory: GroupCategory) => {
              if (incomeCategory.id === bigCategoryId) {
                const prevAssociatedIncomeCategories = incomeCategory.associated_categories_list;
                incomeCategory.associated_categories_list = [
                  addedCategory,
                  ...prevAssociatedIncomeCategories,
                ];
              }
              return incomeCategory;
            }
          );
          dispatch(updateGroupIncomeCategoriesAction(nextGroupIncomeCategories));
        } else {
          const expenseGroupCategories = getState().groupCategories.groupExpenseList;

          const nextGroupExpenseCategories = expenseGroupCategories.map(
            (expenseCategory: GroupCategory) => {
              if (expenseCategory.id === bigCategoryId) {
                const prevAssociatedExpenseCategories = expenseCategory.associated_categories_list;
                expenseCategory.associated_categories_list = [
                  addedCategory,
                  ...prevAssociatedExpenseCategories,
                ];
              }
              return expenseCategory;
            }
          );
          dispatch(updateGroupExpenseCategoriesAction(nextGroupExpenseCategories));
        }
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
