import {
  getIncomeCategoriesAction,
  getExpenseCategoriesAction,
} from './actions';
import { Dispatch, Action } from 'redux';
import axios from 'axios';

interface fetchCategoriesRes {
  income_categories_list: [];
  expense_categories_list: [];
}

interface addCustomReq {
  name: string;
  big_category_id: number;
  transaction_type: string;
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
  type: string;
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
        dispatch(getIncomeCategoriesAction(income));
        dispatch(getExpenseCategoriesAction(expense));
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
