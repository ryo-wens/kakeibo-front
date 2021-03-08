import { Categories } from './types';
export type categoriesActions = ReturnType<
  | typeof startFetchCategoriesActions
  | typeof fetchIncomeCategoryActions
  | typeof cancelFetchCategoriesActions
  | typeof fetchExpenseCategoryActions
  | typeof failedFetchCategoriesActions
  | typeof startAddCustomCategoryActions
  | typeof addIncomeCustomCategoryActions
  | typeof addExpenseCustomCategoryActions
  | typeof failedAddCustomCategoryActions
  | typeof startEditCustomCategoryActions
  | typeof editIncomeCustomCategoryActions
  | typeof editExpenseCustomCategoryActions
  | typeof failedEditCustomCategoryActions
  | typeof startDeleteCustomCategoryActions
  | typeof deleteIncomeCustomCategoryActions
  | typeof deleteExpenseCustomCategoryActions
  | typeof failedDeleteCustomCategoryActions
  | typeof resetCategoriesErrorActions
>;

export const START_FETCH_CATEGORIES = 'START_FETCH_CATEGORIES';
export const startFetchCategoriesActions = () => {
  return {
    type: START_FETCH_CATEGORIES,
    payload: {
      incomeCategoriesLoading: true,
      expenseCategoriesLoading: true,

      categoriesError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_INCOME_CATEGORIES = 'FETCH_INCOME_CATEGORIES';
export const fetchIncomeCategoryActions = (incomeCategories: Categories) => {
  return {
    type: FETCH_INCOME_CATEGORIES,
    payload: {
      incomeCategoriesLoading: false,
      incomeList: incomeCategories,
    },
  };
};

export const FETCH_EXPENSE_CATEGORIES = 'FETCH_EXPENSE_CATEGORIES';
export const fetchExpenseCategoryActions = (expenseCategories: Categories) => {
  return {
    type: FETCH_EXPENSE_CATEGORIES,
    payload: {
      expenseCategoriesLoading: false,
      expenseList: expenseCategories,
    },
  };
};

export const CANCEL_FETCH_CATEGORIES = 'CANCEL_FETCH_CATEGORIES';
export const cancelFetchCategoriesActions = () => {
  return {
    type: CANCEL_FETCH_CATEGORIES,
    payload: {
      incomeCategoriesLoading: false,
      expenseCategoriesLoading: false,
    },
  };
};

export const FAILED_FETCH_CATEGORIES = 'FAILED_FETCH_CATEGORIES';
export const failedFetchCategoriesActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_CATEGORIES,
    payload: {
      incomeCategoriesLoading: false,
      expenseCategoriesLoading: false,

      categoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_CUSTOM_CATEGORY = 'START_ADD_CUSTOM_CATEGORY';
export const startAddCustomCategoryActions = () => {
  return {
    type: START_ADD_CUSTOM_CATEGORY,
    payload: {
      incomeCategoriesLoading: true,
      expenseCategoriesLoading: true,

      categoriesError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const ADD_INCOME_CUSTOM_CATEGORY = 'ADD_INCOME_CUSTOM_CATEGORY';
export const addIncomeCustomCategoryActions = (incomeCategories: Categories) => {
  return {
    type: ADD_INCOME_CUSTOM_CATEGORY,
    payload: {
      incomeCategoriesLoading: false,
      incomeList: incomeCategories,
    },
  };
};

export const ADD_EXPENSE_CUSTOM_CATEGORY = 'ADD_EXPENSE_CUSTOM_CATEGORY';
export const addExpenseCustomCategoryActions = (expenseCategories: Categories) => {
  return {
    type: ADD_EXPENSE_CUSTOM_CATEGORY,
    payload: {
      expenseCategoriesLoading: false,
      expenseList: expenseCategories,
    },
  };
};

export const FAILED_ADD_CUSTOM_CATEGORY = 'FAILED_ADD_CUSTOM_CATEGORY';
export const failedAddCustomCategoryActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_CUSTOM_CATEGORY,
    payload: {
      incomeCategoriesLoading: false,
      expenseCategoriesLoading: false,

      categoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_CUSTOM_CATEGORY = 'START_EDIT_CUSTOM_CATEGORY';
export const startEditCustomCategoryActions = () => {
  return {
    type: START_EDIT_CUSTOM_CATEGORY,
    payload: {
      incomeCategoriesLoading: true,
      expenseCategoriesLoading: true,

      categoriesError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const EDIT_INCOME_CUSTOM_CATEGORY = 'EDIT_INCOME_CUSTOM_CATEGORY';
export const editIncomeCustomCategoryActions = (incomeCategories: Categories) => {
  return {
    type: EDIT_INCOME_CUSTOM_CATEGORY,
    payload: {
      incomeCategoriesLoading: false,
      incomeList: incomeCategories,
    },
  };
};

export const EDIT_EXPENSE_CUSTOM_CATEGORY = 'EDIT_EXPENSE_CUSTOM_CATEGORY';
export const editExpenseCustomCategoryActions = (expenseCategories: Categories) => {
  return {
    type: EDIT_EXPENSE_CUSTOM_CATEGORY,
    payload: {
      expenseCategoriesLoading: false,
      expenseList: expenseCategories,
    },
  };
};

export const FAILED_EDIT_CUSTOM_CATEGORY = 'FAILED_EDIT_CUSTOM_CATEGORY';
export const failedEditCustomCategoryActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_CUSTOM_CATEGORY,
    payload: {
      incomeCategoriesLoading: false,
      expenseCategoriesLoading: false,

      categoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_CUSTOM_CATEGORY = 'START_DELETE_CUSTOM_CATEGORY';
export const startDeleteCustomCategoryActions = () => {
  return {
    type: START_DELETE_CUSTOM_CATEGORY,
    payload: {
      incomeCategoriesLoading: true,
      expenseCategoriesLoading: true,

      categoriesError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const DELETE_INCOME_CUSTOM_CATEGORY = 'DELETE_INCOME_CUSTOM_CATEGORY';
export const deleteIncomeCustomCategoryActions = (incomeCategories: Categories) => {
  return {
    type: DELETE_INCOME_CUSTOM_CATEGORY,
    payload: {
      incomeCategoriesLoading: false,
      incomeList: incomeCategories,
    },
  };
};

export const DELETE_EXPENSE_CUSTOM_CATEGORY = 'DELETE_EXPENSE_CUSTOM_CATEGORY';
export const deleteExpenseCustomCategoryActions = (expenseCategories: Categories) => {
  return {
    type: DELETE_EXPENSE_CUSTOM_CATEGORY,
    payload: {
      expenseCategoriesLoading: false,
      expenseList: expenseCategories,
    },
  };
};

export const FAILED_DELETE_CUSTOM_CATEGORY = 'FAILED_DELETE_CUSTOM_CATEGORY';
export const failedDeleteCustomCategoryActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_CUSTOM_CATEGORY,
    payload: {
      incomeCategoriesLoading: false,
      expenseCategoriesLoading: false,

      categoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const RESET_CATEGORIES_ERROR = 'RESET_CATEGORIES_ERROR';
export const resetCategoriesErrorActions = () => {
  return {
    type: RESET_CATEGORIES_ERROR,
    payload: {
      categoriesError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};
