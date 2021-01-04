import { RegularShoppingList, ShoppingList, ShoppingListByCategories } from './types';
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
>;

export const START_FETCH_EXPIRED_SHOPPING_LIST = 'START_FETCH_EXPIRED_SHOPPING_LIST';
export const startFetchExpiredShoppingListAction = () => {
  return {
    type: START_FETCH_EXPIRED_SHOPPING_LIST,
    payload: {
      expiredShoppingList: {
        loading: true,
      },
    },
  };
};

export const FETCH_EXPIRED_SHOPPING_LIST = 'FETCH_EXPIRED_SHOPPING_LIST';
export const fetchExpiredShoppingListAction = (expiredShoppingList: ShoppingList) => {
  return {
    type: FETCH_EXPIRED_SHOPPING_LIST,
    payload: {
      expiredShoppingList: {
        loading: false,
        expiredShoppingList: expiredShoppingList,
      },
    },
  };
};

export const CANCEL_FETCH_EXPIRED_SHOPPING_LIST = 'CANCEL_FETCH_EXPIRED_SHOPPING_LIST';
export const cancelFetchExpiredShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_EXPIRED_SHOPPING_LIST,
    payload: {
      expiredShoppingList: {
        loading: false,
      },
    },
  };
};

export const FAILED_FETCH_EXPIRED_SHOPPING_LIST = 'FAILED_FETCH_EXPIRED_SHOPPING_LIST';
export const failedFetchExpiredShoppingListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_EXPIRED_SHOPPING_LIST,
    payload: {
      expiredShoppingList: {
        loading: false,
        error: {
          statusCode: statusCode,
          message: errorMessage,
        },
      },
    },
  };
};

export const START_FETCH_TODAY_SHOPPING_LIST = 'START_FETCH_TODAY_SHOPPING_LIST';
export const startFetchTodayShoppingListAction = () => {
  return {
    type: START_FETCH_TODAY_SHOPPING_LIST,
    payload: {
      todayShoppingList: {
        loading: true,
      },
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
      regularShoppingList: regularShoppingList,
      todayShoppingList: {
        loading: false,
        todayShoppingList: todayShoppingList,
      },
    },
  };
};

export const CANCEL_FETCH_TODAY_SHOPPING_LIST = 'CANCEL_FETCH_TODAY_SHOPPING_LIST';
export const cancelFetchTodayShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_TODAY_SHOPPING_LIST,
    payload: {
      todayShoppingList: {
        loading: false,
      },
    },
  };
};

export const FAILED_FETCH_TODAY_SHOPPING_LIST = 'FAILED_FETCH_TODAY_SHOPPING_LIST';
export const failedFetchTodayShoppingListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_TODAY_SHOPPING_LIST,
    payload: {
      todayShoppingList: {
        loading: false,
        error: {
          statusCode: statusCode,
          message: errorMessage,
        },
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
      todayShoppingListByCategories: {
        loading: true,
      },
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
      regularShoppingList: regularShoppingList,
      todayShoppingListByCategories: {
        loading: false,
        todayShoppingListByCategories: todayShoppingListByCategories,
      },
    },
  };
};

export const CANCEL_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES =
  'CANCEL_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES';
export const cancelFetchTodayShoppingListByCategoriesAction = () => {
  return {
    type: CANCEL_FETCH_TODAY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      todayShoppingListByCategories: {
        loading: false,
      },
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
      todayShoppingListByCategories: {
        loading: false,
        error: {
          statusCode: statusCode,
          message: errorMessage,
        },
      },
    },
  };
};

export const START_FETCH_MONTHLY_SHOPPING_LIST = 'START_FETCH_MONTHLY_SHOPPING_LIST';
export const startFetchMonthlyShoppingListAction = () => {
  return {
    type: START_FETCH_MONTHLY_SHOPPING_LIST,
    payload: {
      monthlyShoppingList: {
        loading: true,
      },
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
      regularShoppingList: regularShoppingList,
      monthlyShoppingList: {
        loading: false,
        monthlyShoppingList: monthlyShoppingList,
      },
    },
  };
};

export const CANCEL_FETCH_MONTHLY_SHOPPING_LIST = 'CANCEL_FETCH_MONTHLY_SHOPPING_LIST';
export const cancelFetchMonthlyShoppingListAction = () => {
  return {
    type: CANCEL_FETCH_MONTHLY_SHOPPING_LIST,
    payload: {
      monthlyShoppingList: {
        loading: false,
      },
    },
  };
};

export const FAILED_FETCH_MONTHLY_SHOPPING_LIST = 'FAILED_FETCH_MONTHLY_SHOPPING_LIST';
export const failedFetchMonthlyShoppingListAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_MONTHLY_SHOPPING_LIST,
    payload: {
      monthlyShoppingList: {
        loading: false,
        error: {
          statusCode: statusCode,
          message: errorMessage,
        },
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
      monthlyShoppingListByCategories: {
        loading: true,
      },
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
      regularShoppingList: regularShoppingList,
      monthlyShoppingListByCategories: {
        loading: false,
        monthlyShoppingListByCategories: monthlyShoppingListByCategories,
      },
    },
  };
};

export const CANCEL_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES =
  'CANCEL_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES';
export const cancelFetchMonthlyShoppingListByCategoriesAction = () => {
  return {
    type: CANCEL_FETCH_MONTHLY_SHOPPING_LIST_BY_CATEGORIES,
    payload: {
      monthlyShoppingListByCategories: {
        loading: false,
      },
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
      monthlyShoppingListByCategories: {
        loading: false,
        error: {
          statusCode: statusCode,
          message: errorMessage,
        },
      },
    },
  };
};
