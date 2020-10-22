import { updateGroupIncomeCategoriesAction, updateGroupExpenseCategoriesAction } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import {
  fetchGroupCategoriesRes,
  GroupCategory,
  operationCategoriesReq,
  operationCategoriesRes,
  deleteGroupCustomCategoriesRes,
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
            (incomeGroupCategory: GroupCategory) => {
              if (incomeGroupCategory.id === bigCategoryId) {
                const prevAssociatedIncomeCategories =
                  incomeGroupCategory.associated_categories_list;
                incomeGroupCategory.associated_categories_list = [
                  addedCategory,
                  ...prevAssociatedIncomeCategories,
                ];
              }
              return incomeGroupCategory;
            }
          );
          dispatch(updateGroupIncomeCategoriesAction(nextGroupIncomeCategories));
        } else {
          const expenseGroupCategories = getState().groupCategories.groupExpenseList;

          const nextGroupExpenseCategories = expenseGroupCategories.map(
            (expenseGroupCategory: GroupCategory) => {
              if (expenseGroupCategory.id === bigCategoryId) {
                const prevAssociatedExpenseCategories =
                  expenseGroupCategory.associated_categories_list;
                expenseGroupCategory.associated_categories_list = [
                  addedCategory,
                  ...prevAssociatedExpenseCategories,
                ];
              }
              return expenseGroupCategory;
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

export const editGroupCustomCategories = (id: number, name: string, bigCategoryId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const data: operationCategoriesReq = {
      name: name,
      big_category_id: bigCategoryId,
    };
    await axios
      .put<operationCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/categories/custom-categories/${id}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const editedCategory = res.data;

        // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
        if (bigCategoryId === 1) {
          const groupIncomeCategories = getState().groupCategories.groupIncomeList;

          const nextGroupIncomeCategories = groupIncomeCategories.map(
            (incomeGroupCategory: GroupCategory) => {
              if (incomeGroupCategory.id === bigCategoryId) {
                const prevAssociatedCategories = incomeGroupCategory.associated_categories_list;
                incomeGroupCategory.associated_categories_list = prevAssociatedCategories.map(
                  (associatedCategory) => {
                    if (
                      associatedCategory.id === id &&
                      associatedCategory.category_type === 'CustomCategory'
                    ) {
                      return editedCategory;
                    }
                    return associatedCategory;
                  }
                );
              }
              return incomeGroupCategory;
            }
          );
          dispatch(updateGroupIncomeCategoriesAction(nextGroupIncomeCategories));
        } else {
          const groupExpenseCategories = getState().groupCategories.groupExpenseList;

          const nextGroupExpenseCategories = groupExpenseCategories.map(
            (expenseGroupCategory: GroupCategory) => {
              if (expenseGroupCategory.id === bigCategoryId) {
                const prevAssociatedCategories = expenseGroupCategory.associated_categories_list;
                expenseGroupCategory.associated_categories_list = prevAssociatedCategories.map(
                  (associatedCategory) => {
                    if (
                      associatedCategory.id === id &&
                      associatedCategory.category_type === 'CustomCategory'
                    ) {
                      return editedCategory;
                    }
                    return associatedCategory;
                  }
                );
              }
              return expenseGroupCategory;
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

export const deleteGroupCustomCategories = (id: number, bigCategoryId: number) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    await axios
      .delete<deleteGroupCustomCategoriesRes>(
        `${process.env.REACT_APP_ACCOUNT_API_HOST}/groups/1/categories/custom-categories/${id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const resMessage = res.data.message;

        // bigCategoryId = 1 収入 : bigCategoryId > 1 支出
        if (bigCategoryId === 1) {
          const incomeGroupCategories = getState().groupCategories.groupIncomeList;
          const nextGroupIncomeCategories = incomeGroupCategories.map(
            (incomeGroupCategory: GroupCategory) => {
              if (incomeGroupCategory.id === bigCategoryId) {
                const prevAssociatedCategories = incomeGroupCategory.associated_categories_list;
                incomeGroupCategory.associated_categories_list = prevAssociatedCategories.filter(
                  (associatedCategory) => associatedCategory.id !== id
                );
              }
              return incomeGroupCategory;
            }
          );
          alert(resMessage);
          dispatch(updateGroupIncomeCategoriesAction(nextGroupIncomeCategories));
        } else {
          const expenseGroupCategories = getState().groupCategories.groupExpenseList;

          const nextGroupExpenseCategories = expenseGroupCategories.map(
            (expenseGroupCategory: GroupCategory) => {
              if (expenseGroupCategory.id === bigCategoryId) {
                const prevAssociatedCategories = expenseGroupCategory.associated_categories_list;
                expenseGroupCategory.associated_categories_list = prevAssociatedCategories.filter(
                  (associatedCategory) => associatedCategory.id !== id
                );
              }
              return expenseGroupCategory;
            }
          );
          alert(resMessage);
          dispatch(updateGroupExpenseCategoriesAction(nextGroupExpenseCategories));
        }
      })
      .catch((error) => {
        errorHandling(dispatch, error);
      });
  };
};
