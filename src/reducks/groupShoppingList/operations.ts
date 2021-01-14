import { Action, Dispatch } from 'redux';
import {
  cancelFetchGroupExpiredShoppingListAction,
  failedFetchGroupExpiredShoppingListAction,
  fetchGroupExpiredShoppingListAction,
  startFetchGroupExpiredShoppingListAction,
} from './actions';
import axios, { CancelTokenSource } from 'axios';
import { ShoppingList } from '../shoppingList/types';
import { FetchGroupExpiredShoppingListRes } from './types';

export const fetchGroupExpiredShoppingList = (groupId: number, signal: CancelTokenSource) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startFetchGroupExpiredShoppingListAction());

    try {
      const result = await axios.get<FetchGroupExpiredShoppingListRes>(
        `${process.env.REACT_APP_TODO_API_HOST}/groups/${groupId}/shopping-list/expired`,
        {
          cancelToken: signal.token,
          withCredentials: true,
        }
      );

      const resGroupExpiredShoppingList: ShoppingList = result.data.expired_shopping_list;

      dispatch(fetchGroupExpiredShoppingListAction(resGroupExpiredShoppingList));
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch(cancelFetchGroupExpiredShoppingListAction());
      } else {
        dispatch(
          failedFetchGroupExpiredShoppingListAction(
            error.response.status,
            error.response.data.error.message
          )
        );
      }
    }
  };
};
