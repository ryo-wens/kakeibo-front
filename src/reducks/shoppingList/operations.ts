import { Action, Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import {
  FetchMonthlyShoppingListRes,
  FetchTodayShoppingListRes,
  RegularShoppingList,
  ShoppingList,
} from './types';
import {
  failedFetchDataAction,
  fetchMonthlyShoppingListAction,
  fetchTodayShoppingListAction,
} from './actions';
import { push } from 'connected-react-router';

export const fetchTodayShoppingList = (
  year: string,
  month: string,
  date: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<FetchTodayShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}-${date}/daily`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const regularShoppingList: RegularShoppingList = result.data.regular_shopping_list;
      const todayShoppingList: ShoppingList = result.data.shopping_list;

      dispatch(fetchTodayShoppingListAction(regularShoppingList, todayShoppingList));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        dispatch(failedFetchDataAction(error.response.data.error.message));
        if (error.response.status === 401) {
          dispatch(push('/login'));
        }
      }
    }
  };
};

export const fetchMonthlyShoppingList = (
  year: string,
  month: string,
  signal: CancelTokenSource
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get<FetchMonthlyShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/shopping-list/${year}-${month}/daily`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );
      const regularShoppingList: RegularShoppingList = result.data.regular_shopping_list;
      const monthlyShoppingList: ShoppingList = result.data.shopping_list;

      dispatch(fetchMonthlyShoppingListAction(regularShoppingList, monthlyShoppingList));
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      } else {
        dispatch(failedFetchDataAction(error.response.data.error.message));
        if (error.response.status === 401) {
          dispatch(push('/login'));
        }
      }
    }
  };
};
