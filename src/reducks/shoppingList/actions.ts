import {
  RegularShoppingList,
  RegularShoppingListItem,
  ShoppingList,
  ShoppingListByCategories,
  ShoppingListItem,
} from './types';
import { date } from '../../lib/constant';
export type ShoppingListActions = ReturnType<
  | typeof startFetchExpiredShoppingListAction
  | typeof fetchExpiredShoppingListAction
  | typeof cancelFetchExpiredShoppingListAction
  | typeof failedFetchExpiredShoppingListAction
  | typeof startFetchTodayShoppingListAction
  | typeof fetchTodayShoppingListAction
  | typeof cancelFetchTodayShoppingListAction
  | typeof failedFetchTodayShoppingListAction
  | typeof startFetchTodayShoppingListByCategoriesAction
  | typeof fetchTodayShoppingListByCategoriesAction
  | typeof cancelFetchTodayShoppingListByCategoriesAction
  | typeof failedFetchTodayShoppingListByCategoriesAction
  | typeof startFetchMonthlyShoppingListAction
  | typeof fetchMonthlyShoppingListAction
  | typeof cancelFetchMonthlyShoppingListAction
  | typeof failedFetchMonthlyShoppingListAction
  | typeof startFetchMonthlyShoppingListByCategoriesAction
  | typeof fetchMonthlyShoppingListByCategoriesAction
  | typeof cancelFetchMonthlyShoppingListByCategoriesAction
  | typeof failedFetchMonthlyShoppingListByCategoriesAction
  | typeof startAddShoppingListItemAction
  | typeof addShoppingListItemAction
  | typeof failedAddShoppingListItemAction
  | typeof startEditShoppingListItemAction
  | typeof editShoppingListItemAction
  | typeof failedEditShoppingListItemAction
  | typeof startDeleteShoppingListItemAction
  | typeof deleteShoppingListItemAction
  | typeof failedDeleteShoppingListItemAction
  | typeof startAddRegularShoppingListItemAction
  | typeof addRegularShoppingListItemAction
  | typeof failedAddRegularShoppingListItemAction
  | typeof startEditRegularShoppingListItemAction
  | typeof editRegularShoppingListItemAction
  | typeof failedEditRegularShoppingListItemAction
  | typeof startDeleteRegularShoppingListItemAction
  | typeof deleteRegularShoppingListItemAction
  | typeof failedDeleteRegularShoppingListItemAction
>;

export const START_FETCH_EXPIRED_SHOPPING_LIST = 'START_FETCH_EXPIRED_SHOPPING_LIST';
export const startFetchExpiredShoppingListAction = () => {
  return {
    type: START_FETCH_EXPIRED_SHOPPING_LIST,
    payload: {
      expiredShoppingListLoading: true,
    },
  };
};

export const FETCH_EXPIRED_SHOPPING_LIST = 'FETCH_EXPIRED_SHOPPING_LIST';
export const fetchExpiredShoppingListAction = (expiredShoppingList: ShoppingList) => {
  return {
    type: FETCH_EXPIRED_SHOPPING_LIST,
    payload: {
      expiredShoppingListLoading: false,
      expiredShoppingList: expiredShoppingList,
    },
  };
};

export const CANCEL_FETCH_EXPIRED_SHOPPING_LIST = 'CANCEL_FETCH_EXPIRED_SHOPPING_LIST';
export const cancelFetchExpiredShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_EXPIRED_SHOPPING_LIST,
    payload: {
      expiredShoppingListLoading: false,
    },
  };
};

export const FAILED_FETCH_EXPIRED_SHOPPING_LIST = 'FAILED_FETCH_EXPIRED_SHOPPING_LIST';
export const failedFetchExpiredShoppingListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_EXPIRED_SHOPPING_LIST,
    payload: {
      expiredShoppingListLoading: false,
      expiredShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_FETCH_TODAY_SHOPPING_LIST = 'START_FETCH_TODAY_SHOPPING_LIST';
export const startFetchTodayShoppingListAction = () => {
  return {
    type: START_FETCH_TODAY_SHOPPING_LIST,
    payload: {
      regularShoppingListLoading: true,
      todayShoppingListLoading: true,
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
      regularShoppingListLoading: false,
      regularShoppingList: regularShoppingList,
      todayShoppingListLoading: false,
      todayShoppingList: todayShoppingList,
    },
  };
};

export const CANCEL_FETCH_TODAY_SHOPPING_LIST = 'CANCEL_FETCH_TODAY_SHOPPING_LIST';
export const cancelFetchTodayShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_TODAY_SHOPPING_LIST,
    payload: {
      regularShoppingListLoading: false,
      todayShoppingListLoading: false,
    },
  };
};

export const FAILED_FETCH_TODAY_SHOPPING_LIST = 'FAILED_FETCH_TODAY_SHOPPING_LIST';
export const failedFetchTodayShoppingListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_TODAY_SHOPPING_LIST,
    payload: {
      regularShoppingListLoading: false,
      todayShoppingListLoading: false,
      todayShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'START_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const startFetchTodayShoppingListByCategoriesAction = () => {
  return {
    type: START_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      regularShoppingListLoading: true,
      todayShoppingListByCategoriesLoading: true,
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
      regularShoppingListLoading: false,
      regularShoppingList: regularShoppingList,
      todayShoppingListByCategoriesLoading: false,
      todayShoppingListByCategories: todayShoppingListByCategories,
    },
  };
};

export const CANCEL_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'CANCEL_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const cancelFetchTodayShoppingListByCategoriesAction = () => {
  return {
    type: CANCEL_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      regularShoppingListLoading: false,
      todayShoppingListByCategoriesLoading: false,
    },
  };
};

export const FAILED_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'FAILED_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const failedFetchTodayShoppingListByCategoriesAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      regularShoppingListLoading: false,
      todayShoppingListByCategoriesLoading: false,
      todayShoppingListByCategoriesError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_FETCH_MONTHLY_SHOPPING_LIST = 'START_FETCH_MONTHLY_SHOPPING_LIST';
export const startFetchMonthlyShoppingListAction = () => {
  return {
    type: START_FETCH_MONTHLY_SHOPPING_LIST,
    payload: {
      regularShoppingListLoading: true,
      monthlyShoppingListLoading: true,
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
      regularShoppingListLoading: false,
      regularShoppingList: regularShoppingList,
      monthlyShoppingListLoading: false,
      monthlyShoppingList: monthlyShoppingList,
    },
  };
};

export const CANCEL_FETCH_MONTHLY_SHOPPING_LIST = 'CANCEL_FETCH_MONTHLY_SHOPPING_LIST';
export const cancelFetchMonthlyShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_MONTHLY_SHOPPING_LIST,
    payload: {
      regularShoppingListLoading: false,
      monthlyShoppingListLoading: false,
    },
  };
};

export const FAILED_FETCH_MONTHLY_SHOPPING_LIST = 'FAILED_FETCH_MONTHLY_SHOPPING_LIST';
export const failedFetchMonthlyShoppingListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_MONTHLY_SHOPPING_LIST,
    payload: {
      regularShoppingListLoading: false,
      monthlyShoppingListLoading: false,
      monthlyShoppingListError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES =
  'START_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES';
export const startFetchMonthlyShoppingListByCategoriesAction = () => {
  return {
    type: START_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      regularShoppingListLoading: true,
      monthlyShoppingListByCategoriesLoading: true,
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
      regularShoppingListLoading: false,
      regularShoppingList: regularShoppingList,
      monthlyShoppingListByCategoriesLoading: false,
      monthlyShoppingListByCategories: monthlyShoppingListByCategories,
    },
  };
};

export const CANCEL_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES =
  'CANCEL_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES';
export const cancelFetchMonthlyShoppingListByCategoriesAction = () => {
  return {
    type: CANCEL_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      regularShoppingListLoading: false,
      monthlyShoppingListByCategoriesLoading: false,
    },
  };
};

export const FAILED_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES =
  'FAILED_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES';
export const failedFetchMonthlyShoppingListByCategoriesAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      regularShoppingListLoading: false,
      monthlyShoppingListByCategoriesLoading: false,
      monthlyShoppingListByCategoriesError: {
        statusCode: statusCode,
        message: errorMessage,
      },
    },
  };
};

export const START_ADD_SHOPPING_LIST_ITEM = 'START_ADD_SHOPPING_LIST_ITEM';
export const startAddShoppingListItemAction = () => {
  return {
    type: START_ADD_SHOPPING_LIST_ITEM,
    payload: {
      todayShoppingListLoading: true,
      todayShoppingListByCategoriesLoading: true,
      monthlyShoppingListLoading: true,
      monthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const ADD_SHOPPING_LIST_ITEM = 'ADD_SHOPPING_LIST_ITEM';
export const addShoppingListItemAction = (shoppingListItem: ShoppingListItem) => {
  return {
    type: ADD_SHOPPING_LIST_ITEM,
    payload: {
      shoppingListItem: shoppingListItem,
    },
  };
};

export const FAILED_ADD_SHOPPING_LIST_ITEM = 'FAILED_ADD_SHOPPING_LIST_ITEM';
export const failedAddShoppingListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_SHOPPING_LIST_ITEM,
    payload: {
      todayShoppingListLoading: false,
      todayShoppingListByCategoriesLoading: false,
      monthlyShoppingListLoading: false,
      monthlyShoppingListByCategoriesLoading: false,
      shoppingListError: {
        message: errorMessage,
        statusCode: statusCode,
      },
    },
  };
};

export const START_EDIT_SHOPPING_LIST_ITEM = 'START_EDIT_SHOPPING_LIST_ITEM';
export const startEditShoppingListItemAction = () => {
  return {
    type: START_EDIT_SHOPPING_LIST_ITEM,
    payload: {
      expiredShoppingListLoading: true,
      todayShoppingListLoading: true,
      todayShoppingListByCategoriesLoading: true,
      monthlyShoppingListLoading: true,
      monthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const EDIT_SHOPPING_LIST_ITEM = 'EDIT_SHOPPING_LIST_ITEM';
export const editShoppingListItemAction = (shoppingListItem: ShoppingListItem) => {
  return {
    type: EDIT_SHOPPING_LIST_ITEM,
    payload: {
      shoppingListItem: shoppingListItem,
    },
  };
};

export const FAILED_EDIT_SHOPPING_LIST_ITEM = 'FAILED_EDIT_SHOPPING_LIST_ITEM';
export const failedEditShoppingListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_SHOPPING_LIST_ITEM,
    payload: {
      expiredShoppingListLoading: false,
      todayShoppingListLoading: false,
      todayShoppingListByCategoriesLoading: false,
      monthlyShoppingListLoading: false,
      monthlyShoppingListByCategoriesLoading: false,
      shoppingListError: {
        message: errorMessage,
        statusCode: statusCode,
      },
    },
  };
};

export const START_DELETE_SHOPPING_LIST_ITEM = 'START_DELETE_SHOPPING_LIST_ITEM';
export const startDeleteShoppingListItemAction = () => {
  return {
    type: START_DELETE_SHOPPING_LIST_ITEM,
    payload: {
      expiredShoppingListLoading: true,
      todayShoppingListLoading: true,
      todayShoppingListByCategoriesLoading: true,
      monthlyShoppingListLoading: true,
      monthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const DELETE_SHOPPING_LIST_ITEM = 'DELETE_SHOPPING_LIST_ITEM';
export const deleteShoppingListItemAction = () => {
  return {
    type: DELETE_SHOPPING_LIST_ITEM,
    payload: {
      shoppingListItem: {
        id: 0,
        posted_date: date,
        updated_date: date,
        expected_purchase_date: '',
        complete_flag: false,
        purchase: '',
        shop: null,
        amount: null,
        big_category_id: 0,
        big_category_name: '',
        medium_category_id: null,
        medium_category_name: null,
        custom_category_id: null,
        custom_category_name: null,
        regular_shopping_list_id: null,
        transaction_auto_add: false,
        related_transaction_data: null,
      },
    },
  };
};

export const FAILED_DELETE_SHOPPING_LIST_ITEM = 'FAILED_DELETE_SHOPPING_LIST_ITEM';
export const failedDeleteShoppingListItemAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_SHOPPING_LIST_ITEM,
    payload: {
      expiredShoppingListLoading: false,
      todayShoppingListLoading: false,
      todayShoppingListByCategoriesLoading: false,
      monthlyShoppingListLoading: false,
      monthlyShoppingListByCategoriesLoading: false,
      shoppingListError: {
        message: errorMessage,
        statusCode: statusCode,
      },
    },
  };
};

export const START_ADD_REGULAR_SHOPPING_LIST_ITEM = 'START_ADD_REGULAR_SHOPPING_LIST_ITEM';
export const startAddRegularShoppingListItemAction = () => {
  return {
    type: START_ADD_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      regularShoppingListLoading: true,
      todayShoppingListLoading: true,
      todayShoppingListByCategoriesLoading: true,
      monthlyShoppingListLoading: true,
      monthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const ADD_REGULAR_SHOPPING_LIST_ITEM = 'ADD_REGULAR_SHOPPING_LIST_ITEM';
export const addRegularShoppingListItemAction = (
  regularShoppingListItem: RegularShoppingListItem
) => {
  return {
    type: ADD_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      regularShoppingListItem: regularShoppingListItem,
    },
  };
};

export const FAILED_ADD_REGULAR_SHOPPING_LIST_ITEM = 'FAILED_ADD_REGULAR_SHOPPING_LIST_ITEM';
export const failedAddRegularShoppingListItemAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_ADD_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      regularShoppingListLoading: false,
      todayShoppingListLoading: false,
      todayShoppingListByCategoriesLoading: false,
      monthlyShoppingListLoading: false,
      monthlyShoppingListByCategoriesLoading: false,
      shoppingListError: {
        message: errorMessage,
        statusCode: statusCode,
      },
    },
  };
};

export const START_EDIT_REGULAR_SHOPPING_LIST_ITEM = 'START_EDIT_REGULAR_SHOPPING_LIST_ITEM';
export const startEditRegularShoppingListItemAction = () => {
  return {
    type: START_EDIT_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      regularShoppingListLoading: true,
      expiredShoppingListLoading: true,
      todayShoppingListLoading: true,
      todayShoppingListByCategoriesLoading: true,
      monthlyShoppingListLoading: true,
      monthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const EDIT_REGULAR_SHOPPING_LIST_ITEM = 'EDIT_REGULAR_SHOPPING_LIST_ITEM';
export const editRegularShoppingListItemAction = (
  regularShoppingListItem: RegularShoppingListItem

  // regularShoppingList: RegularShoppingList,
  // expiredShoppingList: ShoppingList,
  // todayShoppingList: ShoppingList,
  // todayShoppingListByCategories: ShoppingListByCategories,
  // monthlyShoppingList: ShoppingList,
  // monthlyShoppingListByCategories: ShoppingListByCategories
) => {
  return {
    type: EDIT_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      regularShoppingListItem: regularShoppingListItem,

      // regularShoppingListLoading: false,
      // regularShoppingList: regularShoppingList,
      // expiredShoppingListLoading: false,
      // expiredShoppingList: expiredShoppingList,
      // todayShoppingListLoading: false,
      // todayShoppingList: todayShoppingList,
      // todayShoppingListByCategoriesLoading: false,
      // todayShoppingListByCategories: todayShoppingListByCategories,
      // monthlyShoppingListLoading: false,
      // monthlyShoppingList: monthlyShoppingList,
      // monthlyShoppingListByCategoriesLoading: false,
      // monthlyShoppingListByCategories: monthlyShoppingListByCategories,
    },
  };
};

export const FAILED_EDIT_REGULAR_SHOPPING_LIST_ITEM = 'FAILED_EDIT_REGULAR_SHOPPING_LIST_ITEM';
export const failedEditRegularShoppingListItemAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_EDIT_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      regularShoppingListLoading: false,
      expiredShoppingListLoading: false,
      todayShoppingListLoading: false,
      todayShoppingListByCategoriesLoading: false,
      monthlyShoppingListLoading: false,
      monthlyShoppingListByCategoriesLoading: false,
      shoppingListError: {
        message: errorMessage,
        statusCode: statusCode,
      },
    },
  };
};

export const START_DELETE_REGULAR_SHOPPING_LIST_ITEM = 'START_DELETE_REGULAR_SHOPPING_LIST_ITEM';
export const startDeleteRegularShoppingListItemAction = () => {
  return {
    type: START_DELETE_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      regularShoppingListLoading: true,
      expiredShoppingListLoading: true,
      todayShoppingListLoading: true,
      todayShoppingListByCategoriesLoading: true,
      monthlyShoppingListLoading: true,
      monthlyShoppingListByCategoriesLoading: true,
    },
  };
};

export const DELETE_REGULAR_SHOPPING_LIST_ITEM = 'DELETE_REGULAR_SHOPPING_LIST_ITEM';
export const deleteRegularShoppingListItemAction = () => {
  return {
    type: DELETE_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      regularShoppingListItem: {
        id: 0,
        posted_date: date,
        updated_date: date,
        expected_purchase_date: '',
        cycle_type: '',
        cycle: null,
        purchase: '',
        shop: null,
        amount: null,
        big_category_id: 0,
        big_category_name: '',
        medium_category_id: null,
        medium_category_name: null,
        custom_category_id: null,
        custom_category_name: null,
        transaction_auto_add: false,
      },
    },
  };
};

export const FAILED_DELETE_REGULAR_SHOPPING_LIST_ITEM = 'FAILED_DELETE_REGULAR_SHOPPING_LIST_ITEM';
export const failedDeleteRegularShoppingListItemAction = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_DELETE_REGULAR_SHOPPING_LIST_ITEM,
    payload: {
      regularShoppingListLoading: false,
      expiredShoppingListLoading: false,
      todayShoppingListLoading: false,
      todayShoppingListByCategoriesLoading: false,
      monthlyShoppingListLoading: false,
      monthlyShoppingListByCategoriesLoading: false,
      shoppingListError: {
        message: errorMessage,
        statusCode: statusCode,
      },
    },
  };
};
