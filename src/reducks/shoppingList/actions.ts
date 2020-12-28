import { RegularShoppingList, ShoppingList } from './types';
export type ShoppingListActions = ReturnType<
  | typeof waitingFetchDataAction
  | typeof fetchTodayShoppingListAction
  | typeof failedFetchDataAction
  | typeof fetchMonthlyShoppingListAction
>;

export const WAITING_FETCH_DATA = 'WAITING_FETCH_DATA';
export const waitingFetchDataAction = () => {
  return {
    type: WAITING_FETCH_DATA,
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

export const FETCH_MONTHLY_SHOPPING_LIST = 'FETCH_MONTHLY_SHOPPING_LIST';
export const fetchMonthlyShoppingListAction = (
  regularShoppingList: RegularShoppingList,
  monthlyShoppingList: ShoppingList
) => {
  return {
    type: FETCH_MONTHLY_SHOPPING_LIST,
    payload: {
      loading: false,
      regularShoppingList: regularShoppingList,
      monthlyShoppingList: monthlyShoppingList,
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
