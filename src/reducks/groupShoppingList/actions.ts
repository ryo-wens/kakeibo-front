import { ShoppingList } from '../shoppingList/types';
export type GroupShoppingListActions = ReturnType<
  | typeof startFetchGroupExpiredShoppingListAction
  | typeof fetchGroupExpiredShoppingListAction
  | typeof cancelFetchGroupExpiredShoppingListAction
  | typeof failedFetchGroupExpiredShoppingListAction
>;

export const START_FETCH_GROUP_EXPIRED_SHOPPING_LIST = 'START_FETCH_GROUP_EXPIRED_SHOPPING_LIST';
export const startFetchGroupExpiredShoppingListAction = () => {
  return {
    type: START_FETCH_GROUP_EXPIRED_SHOPPING_LIST,
    payload: {
      groupExpiredShoppingListLoading: true,
    },
  };
};

export const FETCH_GROUP_EXPIRED_SHOPPING_LIST = 'FETCH_GROUP_EXPIRED_SHOPPING_LIST';
export const fetchGroupExpiredShoppingListAction = (groupExpiredShoppingList: ShoppingList) => {
  return {
    type: FETCH_GROUP_EXPIRED_SHOPPING_LIST,
    payload: {
      groupExpiredShoppingListLoading: false,
      groupExpiredShoppingList: groupExpiredShoppingList,
    },
  };
};

export const CANCEL_FETCH_GROUP_EXPIRED_SHOPPING_LIST = 'CANCEL_FETCH_GROUP_EXPIRED_SHOPPING_LIST';
export const cancelFetchGroupExpiredShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_EXPIRED_SHOPPING_LIST,
    payload: {
      groupExpiredShoppingListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_EXPIRED_SHOPPING_LIST = 'FAILED_FETCH_GROUP_EXPIRED_SHOPPING_LIST';
export const failedFetchGroupExpiredShoppingListAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_EXPIRED_SHOPPING_LIST,
    payload: {
      groupExpiredShoppingListLoading: false,
      groupExpiredShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};
