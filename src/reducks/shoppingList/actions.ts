import { RegularShoppingList, ShoppingList, ShoppingListByCategories } from './types';
export type ShoppingListActions = ReturnType<
  | typeof waitingFetchDataAction
  | typeof fetchTodayShoppingListAction
  | typeof fetchTodayShoppingListByCategoriesAction
  | typeof fetchMonthlyShoppingListAction
  | typeof failedFetchDataAction
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

export const FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES = 'FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const fetchTodayShoppingListByCategoriesAction = (
  regularShoppingList: RegularShoppingList,
  todayShoppingListByCategories: ShoppingListByCategories
) => {
  return {
    type: FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      loading: false,
      regularShoppingList: regularShoppingList,
      todayShoppingListByCategories: todayShoppingListByCategories,
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

export const FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES =
  'FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES';
export const fetchMonthlyShoppingListByCategoriesAction = (
  regularShoppingList: RegularShoppingList,
  monthlyShoppingListByCategories: ShoppingListByCategories
) => {
  return {
    type: FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      loading: false,
      regularShoppingList: regularShoppingList,
      monthlyShoppingListByCategories: monthlyShoppingListByCategories,
    },
  };
};

export const FAILED_FETCH_DATA = 'FAILED_FETCH_DATA';
export const failedFetchDataAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_DATA,
    payload: {
      loading: false,
      error: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};
