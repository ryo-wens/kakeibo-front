import { updateIncomeCategoriesAction, updateExpenseCategoriesAction } from './actions';
import { Dispatch, Action } from 'redux';
import axios from 'axios';
import { AssociatedCategory } from './types';

interface fetchCategoriesRes {
  income_categories_list: [];
  expense_categories_list: [];
}

interface addCustomReq {
  name: string;
  big_category_id: number;
}

interface addCustomRes {
  type: string;
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
  return async (dispatch: Dispatch<Action>) => {
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

export const addCustomCategories = (name: string, bigCategoryId: number, transactionType: string) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    const data: addCustomReq = {
      name: 'チーズケーキ',
      big_category_id: 2,
    };
    await axios
      .post<addCustomRes>('http://127.0.0.1:8081/custom-category/', JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        const customCategory = res.data;
        console.log(customCategory);
        if (transactionType === 'income') {
          const incomeCategories = getState().categories.incomeList;
          const prevCategories = incomeCategories.associated_categories_list;
          const nextCategories = [customCategory, ...prevCategories];
          incomeCategories.associated_categories_list = nextCategories;
          dispatch(updateIncomeCategoriesAction(incomeCategories));
        } else if (transactionType === 'expense') {
          const expenseCategories = getState().categories.expenseList;
          const prevCategories = expenseCategories.associated_categories_list;
          const nextCategories = [customCategory, ...prevCategories];
          expenseCategories.associated_categories_list = nextCategories;
          dispatch(updateExpenseCategoriesAction(expenseCategories));
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.error.message);
        }
        if (error.response && error.response.status === 401) {
          alert(error.response.data.error.message);
        }
        if (error.resopnse.status === 409) {
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
  transactionType: string,
  categoryType: string
) => {
  return async (dispatch: Dispatch<Action>, getState: any) => {
    const data: editCustomReq = {
      id: id,
      name: name,
      big_category_id: bigCategoryId,
    };

    await axios
      .put<editCustomRes>(`http://127.0.0.1:8081/custom-category/${id}`, JSON.stringify(data), {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (transactionType === 'income') {
          const incomeCategories = getState().categories.incomeList;
          const prevCategories = incomeCategories.associated_categories_list;
          const index = prevCategories.findIndex((prevCategory: AssociatedCategory) => {
            return prevCategory.id === id && prevCategory.big_category_id === bigCategoryId;
          });
          prevCategories[index] = {
            type: categoryType,
            id: id,
            name: name,
            big_category_id: bigCategoryId,
          };
          const nextCategories = [...prevCategories];
          incomeCategories.associated_categories_list = nextCategories;
          dispatch(updateIncomeCategoriesAction(incomeCategories));
        } else if (transactionType === 'expense') {
          const expenseCategories = getState().categories.expenseList;
          const prevCategories = expenseCategories.associated_categories_list;
          const index = prevCategories.findIndex((prevCategory: AssociatedCategory) => {
            return prevCategory.id === id && prevCategory.big_category_id === bigCategoryId;
          });
          prevCategories[index] = {
            type: categoryType,
            id: id,
            name: name,
            big_category_id: bigCategoryId,
          };
          const nextCategories = [...prevCategories];
          expenseCategories.associated_categories_list = nextCategories;
          dispatch(updateExpenseCategoriesAction(expenseCategories));
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.error.message);
        }
        if (error.response && error.response.status === 401) {
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
