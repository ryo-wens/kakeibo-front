import { updateIncomeCategoriesAction, updateExpenseCategoriesAction } from './actions';
import { Dispatch, Action } from 'redux';
import axios from 'axios';
import { Category } from './types';
import { State } from '../store/types';

interface fetchCategoriesRes {
  income_categories_list: [];
  expense_categories_list: [];
}

interface addCustomReq {
  name: string;
  big_category_id: number;
}

interface addCustomRes {
  category_type: string;
  id: number;
  name: string;
  big_category_id: number;
}

interface editCustomReq {
  id: number;
  name: string;
  big_category_id: number;
}

interface editCustomRes {
  category_type: string;
  id: number;
  name: string;
  big_category_id: number;
}

interface deleteCustomReq {
  id: number;
}

interface deleteCustomRes {
  message: string;
}

export const fetchCategories = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await axios
      .get<fetchCategoriesRes>('http://127.0.0.1:8081/categories', {
        withCredentials: true,
      })
      .then((res) => {
        const income = res.data.income_categories_list;
        const expense = res.data.expense_categories_list;
        dispatch(updateIncomeCategoriesAction(income));
        dispatch(updateExpenseCategoriesAction(expense));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.data.error.message);
        }
        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};

export const addCustomCategories = (
  name: string,
  bigCategoryId: number,
  transactionType: string
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const data: addCustomReq = {
      name: name,
      big_category_id: bigCategoryId,
    };
    await axios
      .post<addCustomRes>(
        'http://127.0.0.1:8081/categories/custom-categories',
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const addCategory = res.data;
        console.log(addCategory);
        if (transactionType === 'income') {
          const incomeCategories = getState().categories.incomeList;
          const nextCategories = incomeCategories.map((incomeCategory: Category) => {
            if (incomeCategory.id === bigCategoryId) {
              const prevAssociatedCategories = incomeCategory.associated_categories_list;
              incomeCategory.associated_categories_list = [
                addCategory,
                ...prevAssociatedCategories,
              ];
            }
            return incomeCategory;
          });
          console.log(nextCategories);
          dispatch(updateIncomeCategoriesAction(nextCategories));
        } else if (transactionType === 'expense') {
          const expenseCategories = getState().categories.expenseList;
          const nextCategories = expenseCategories.map((expenseCategory: Category) => {
            if (expenseCategory.id === bigCategoryId) {
              const prevAssociatedCategories = expenseCategory.associated_categories_list;
              expenseCategory.associated_categories_list = [
                addCategory,
                ...prevAssociatedCategories,
              ];
            }
            return expenseCategory;
          });
          console.log(nextCategories);
          dispatch(updateExpenseCategoriesAction(nextCategories));
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.error.message);
        }
        if (error.response.status === 401) {
          alert(error.response.data.error.message);
        }
        if (error.response.status === 409) {
          alert(error.response.data.error.message);
        }
        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};

export const editCustomCategories = (
  id: number,
  name: string,
  bigCategoryId: number,
  transactionType: string
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const data: editCustomReq = {
      id: id,
      name: name,
      big_category_id: bigCategoryId,
    };
    await axios
      .put<editCustomRes>(
        `http://127.0.0.1:8081/categories/custom-categories/${id}`,
        JSON.stringify(data),
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const editCategory = res.data;
        if (transactionType === 'income') {
          const incomeCategories = getState().categories.incomeList;
          const nextCategories = incomeCategories.map((incomeCategory: Category) => {
            if (incomeCategory.id === bigCategoryId) {
              const prevAssociatedCategories = incomeCategory.associated_categories_list;
              incomeCategory.associated_categories_list = prevAssociatedCategories.map(
                (associatedCategory) => {
                  if (associatedCategory.id === id) {
                    return editCategory;
                  }
                  return associatedCategory;
                }
              );
            }
            return incomeCategory;
          });
          dispatch(updateIncomeCategoriesAction(nextCategories));
        } else if (transactionType === 'expense') {
          const expenseCategories = getState().categories.expenseList;
          const nextCategories = expenseCategories.map((expenseCategory: Category) => {
            if (expenseCategory.id === bigCategoryId) {
              const prevAssociatedCategories = expenseCategory.associated_categories_list;
              expenseCategory.associated_categories_list = prevAssociatedCategories.map(
                (associatedCategory) => {
                  if (associatedCategory.id === id) {
                    return editCategory;
                  }
                  return associatedCategory;
                }
              );
            }
            return expenseCategory;
          });
          dispatch(updateExpenseCategoriesAction(nextCategories));
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.error.message);
        }
        if (error.response.status === 401) {
          alert(error.response.data.error.message);
        }
        if (error.response.status === 409) {
          alert(error.response.data.error.message);
        }
        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};

export const deleteCustomCategories = (
  id: number,
  transactionType: string,
  bigCategoryId: number
) => {
  return async (dispatch: Dispatch<Action>, getState: () => State): Promise<void> => {
    const data: deleteCustomReq = { id: id };
    await axios
      .delete<deleteCustomRes>(`http://127.0.0.1:8081/categories/custom-categories/${id}`, {
        data: data,
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        const resMessage = res.data.message;
        if (transactionType === 'income') {
          const incomeCategories = getState().categories.incomeList;
          const nextCategories = incomeCategories.map((incomeCategory: Category) => {
            if (incomeCategory.id === bigCategoryId) {
              const prevAssociatedCategories = incomeCategory.associated_categories_list;
              incomeCategory.associated_categories_list = prevAssociatedCategories.filter(
                (associatedCategory) => associatedCategory.id !== id
              );
            }
            return incomeCategory;
          });
          alert(resMessage);
          dispatch(updateIncomeCategoriesAction(nextCategories));
        } else if (transactionType === 'expense') {
          const resMessage = res.data.message;
          const expenseCategories = getState().categories.expenseList;
          const nextCategories = expenseCategories.map((expenseCategory: Category) => {
            if (expenseCategory.id === bigCategoryId) {
              const prevAssociatedCategories = expenseCategory.associated_categories_list;
              expenseCategory.associated_categories_list = prevAssociatedCategories.filter(
                (associatedCategory) => associatedCategory.id !== id
              );
            }
            return expenseCategory;
          });
          alert(resMessage);
          dispatch(updateExpenseCategoriesAction(nextCategories));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.data.error.message);
        }
        if (error.response.status === 500) {
          alert(error.response.data.error.message);
        }
      });
  };
};
