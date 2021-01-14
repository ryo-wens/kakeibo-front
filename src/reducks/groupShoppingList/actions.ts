import { RegularShoppingList, ShoppingList, ShoppingListByCategories } from '../shoppingList/types';
export type GroupShoppingListActions = ReturnType<
  | typeof startFetchGroupExpiredShoppingListAction
  | typeof fetchGroupExpiredShoppingListAction
  | typeof cancelFetchGroupExpiredShoppingListAction
  | typeof failedFetchGroupExpiredShoppingListAction
  | typeof startFetchGroupTodayShoppingListAction
  | typeof fetchGroupTodayShoppingListAction
  | typeof cancelFetchGroupTodayShoppingListAction
  | typeof failedFetchGroupTodayShoppingListAction
  | typeof startFetchGroupTodayShoppingListByCategoriesAction
  | typeof fetchGroupTodayShoppingListByCategoriesAction
  | typeof cancelFetchGroupTodayShoppingListByCategoriesAction
  | typeof failedFetchGroupTodayShoppingListByCategoriesAction
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

export const START_FETCH_GROUP_TODAY_SHOPPING_LIST = 'START_FETCH_GROUP_TODAY_SHOPPING_LIST';
export const startFetchGroupTodayShoppingListAction = () => {
  return {
    type: START_FETCH_GROUP_TODAY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: true,
      groupTodayShoppingListLoading: true,
    },
  };
};

export const FETCH_GROUP_TODAY_SHOPPING_LIST = 'FETCH_GROUP_TODAY_SHOPPING_LIST';
export const fetchGroupTodayShoppingListAction = (
  groupRegularShoppingList: RegularShoppingList,
  groupTodayShoppingList: ShoppingList
) => {
  return {
    type: FETCH_GROUP_TODAY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: false,
      groupRegularShoppingList: groupRegularShoppingList,
      groupTodayShoppingListLoading: false,
      groupTodayShoppingList: groupTodayShoppingList,
    },
  };
};

export const CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST = 'CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST';
export const cancelFetchGroupTodayShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: false,
      groupTodayShoppingListLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST = 'FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST';
export const failedFetchGroupTodayShoppingListAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST,
    payload: {
      groupRegularShoppingListLoading: false,
      groupTodayShoppingListLoading: false,
      groupTodayShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'START_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const startFetchGroupTodayShoppingListByCategoriesAction = () => {
  return {
    type: START_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: true,
      groupTodayShoppingListByCategoriesLoading: true,
    },
  };
};

export const FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const fetchGroupTodayShoppingListByCategoriesAction = (
  groupRegularShoppingList: RegularShoppingList,
  groupTodayShoppingListByCategories: ShoppingListByCategories
) => {
  return {
    type: FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: false,
      groupRegularShoppingList: groupRegularShoppingList,
      groupTodayShoppingListByCategoriesLoading: false,
      groupTodayShoppingListByCategories: groupTodayShoppingListByCategories,
    },
  };
};

export const CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const cancelFetchGroupTodayShoppingListByCategoriesAction = () => {
  return {
    type: CANCEL_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const failedFetchGroupTodayShoppingListByCategoriesAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      groupRegularShoppingListLoading: false,
      groupTodayShoppingListByCategoriesLoading: false,
      groupTodayShoppingListByCategoriesError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};
