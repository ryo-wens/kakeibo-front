import { updateGroupIncomeCategoriesAction, updateGroupExpenseCategoriesAction } from './actions';
import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { fetchGroupCategoriesRes } from './types';
import { errorHandling } from '../../lib/validation';

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
