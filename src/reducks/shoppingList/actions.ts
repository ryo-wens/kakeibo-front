import { RegularShoppingList, ShoppingList } from './types';
export type ShoppingListActions = ReturnType<
  typeof startFetchDataAction | typeof fetchTodayShoppingListAction | typeof failedFetchDataAction
>;

export const START_FETCH_DATA = 'START_FETCH_DATA';
export const startFetchDataAction = () => {
  return {
    type: START_FETCH_DATA,
    payload: {
      loading: true,
    },
  };
};

export const FETCH_TODAY_SHOPPING_LIST = 'FETCH_TODAY_SHOPPING_LIST';
export const fetchTodayShoppingListAction = (
  regularShoppingList: RegularShoppingList,
  todayShoppingList: ShoppingList
) => {
  return {
    type: FETCH_TODAY_SHOPPING_LIST,
    payload: {
      loading: false,
      regularShoppingList: regularShoppingList,
      todayShoppingList: todayShoppingList,
    },
  };
};

export const FAILED_FETCH_DATA = 'FAILED_FETCH_DATA';
export const failedFetchDataAction = (errorMessage: string) => {
  return {
    type: FAILED_FETCH_DATA,
    payload: {
      loading: false,
      errorMessage: errorMessage,
    },
  };
};
