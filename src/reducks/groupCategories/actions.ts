import { GroupCategories } from './types';

export type groupCategoriesActions = ReturnType<
  | typeof startFetchGroupCategoriesActions
  | typeof fetchGroupIncomeCategoriesAction
  | typeof fetchGroupExpenseCategoriesAction
  | typeof cna1celFetchGroupCategoriesActions
  | typeof failedFetchGroupCategories
  | typeof startAddGroupCategoriesActions
  | typeof addGroupIncomeCategory
  | typeof addGroupExpenseCategory
  | typeof failedAddGroupCategoriesActions
  | typeof startEditGroupCategoriesActions
  | typeof editGroupIncomeCategory
  | typeof editGroupExpenseCategory
  | typeof failedEditGroupCategories
  | typeof startDeleteGroupCategoriesActions
  | typeof deleteIncomeCategory
  | typeof deleteExpenseCategory
  | typeof failedDeleteGroupCategories
>;

export const START_FETCH_GROUP_CATEGORIES = 'START_FETCH_GROUP_CATEGORIES';
export const startFetchGroupCategoriesActions = () => {
  return {
    type: START_FETCH_GROUP_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: true,
      groupExpenseCategoriesLoading: true,
    },
  };
};

export const FETCH_GROUP_INCOME_CATEGORIES = 'FETCH_GROUP_INCOME_CATEGORIES';
export const fetchGroupIncomeCategoriesAction = (groupIncomeCategories: GroupCategories) => {
  return {
    type: FETCH_GROUP_INCOME_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: false,
      groupIncomeList: groupIncomeCategories,
    },
  };
};

export const FETCH_GROUP_EXPENSE_CATEGORIES = 'FETCH_GROUP_EXPENSE_CATEGORIES';
export const fetchGroupExpenseCategoriesAction = (groupExpenseCategories: GroupCategories) => {
  return {
    type: FETCH_GROUP_EXPENSE_CATEGORIES,
    payload: {
      groupExpenseCategoriesLoading: false,
      groupExpenseList: groupExpenseCategories,
    },
  };
};

export const CANCEL_FETCH_GROUP_CATEGORIES = 'CANCEL_FETCH_GROUP_CATEGORIES';
export const cna1celFetchGroupCategoriesActions = () => {
  return {
    type: CANCEL_FETCH_GROUP_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: false,
      groupExpenseCategoriesLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_CATEGORIES = 'FAILED_FETCH_GROUP_CATEGORIES';
export const failedFetchGroupCategories = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: false,
      groupExpenseCategoriesLoading: false,

      groupIncomeCategoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },

      groupExpenseCategoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_GROUP_CATEGORIES = 'START_ADD_GROUP_CATEGORIES';
export const startAddGroupCategoriesActions = () => {
  return {
    type: START_ADD_GROUP_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: true,
      groupExpenseCategoriesLoading: true,
    },
  };
};

export const ADD_GROUP_INCOME_CATEGORY = 'ADD_GROUP_INCOME_CATEGORY';
export const addGroupIncomeCategory = (groupIncomeCategories: GroupCategories) => {
  return {
    type: ADD_GROUP_INCOME_CATEGORY,
    payload: {
      groupIncomeCategoriesLoading: false,
      groupIncomeList: groupIncomeCategories,
    },
  };
};

export const ADD_GROUP_EXPENSE_CATEGORY = 'ADD_GROUP_EXPENSE_CATEGORY';
export const addGroupExpenseCategory = (groupExpenseCategories: GroupCategories) => {
  return {
    type: ADD_GROUP_EXPENSE_CATEGORY,
    payload: {
      groupExpenseCategoriesLoading: false,
      groupExpenseList: groupExpenseCategories,
    },
  };
};

export const FAILED_ADD_GROUP_CATEGORIES = 'FAILED_ADD_GROUP_CATEGORIES';
export const failedAddGroupCategoriesActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_GROUP_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: false,
      groupExpenseCategoriesLoading: false,

      groupIncomeCategoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },

      groupExpenseCategoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_CATEGORIES = 'START_EDIT_GROUP_CATEGORIES';
export const startEditGroupCategoriesActions = () => {
  return {
    type: START_EDIT_GROUP_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: true,
      groupExpenseCategoriesLoading: true,
    },
  };
};

export const EDIT_GROUP_INCOME_CATEGORY = 'EDIT_GROUP_INCOME_CATEGORY';
export const editGroupIncomeCategory = (groupIncomeCategories: GroupCategories) => {
  return {
    type: EDIT_GROUP_INCOME_CATEGORY,
    payload: {
      groupIncomeCategoriesLoading: false,
      groupIncomeList: groupIncomeCategories,
    },
  };
};

export const EDIT_GROUP_EXPENSE_CATEGORY = 'EDIT_GROUP_EXPENSE_CATEGORY';
export const editGroupExpenseCategory = (groupExpenseCategories: GroupCategories) => {
  return {
    type: EDIT_GROUP_EXPENSE_CATEGORY,
    payload: {
      groupExpenseCategoriesLoading: false,
      groupExpenseList: groupExpenseCategories,
    },
  };
};

export const FAILED_EDIT_GROUP_CATEGORIES = 'FAILED_EDIT_GROUP_CATEGORIES';
export const failedEditGroupCategories = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_GROUP_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: false,
      groupExpenseCategoriesLoading: false,

      groupIncomeCategoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },

      groupExpenseCategoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_GROUP_CATEGORIES = 'START_DELETE_GROUP_CATEGORIES';
export const startDeleteGroupCategoriesActions = () => {
  return {
    type: START_DELETE_GROUP_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: true,
      groupExpenseCategoriesLoading: true,
    },
  };
};

export const DELETE_GROUP_INCOME_CATEGORY = 'DELETE_GROUP_INCOME_CATEGORY';
export const deleteIncomeCategory = (groupIncomeCategories: GroupCategories) => {
  return {
    type: DELETE_GROUP_INCOME_CATEGORY,
    payload: {
      groupIncomeCategoriesLoading: false,
      groupIncomeList: groupIncomeCategories,
    },
  };
};

export const DELETE_GROUP_EXPENSE_CATEGORY = 'DELETE_GROUP_EXPENSE_CATEGORY';
export const deleteExpenseCategory = (groupExpenseCategories: GroupCategories) => {
  return {
    type: DELETE_GROUP_EXPENSE_CATEGORY,
    payload: {
      groupExpenseCategoriesLoading: false,
      groupExpenseList: groupExpenseCategories,
    },
  };
};

export const FAILED_DELETE_GROUP_CATEGORIES = 'FAILED_DELETE_GROUP_CATEGORIES';
export const failedDeleteGroupCategories = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_GROUP_CATEGORIES,
    payload: {
      groupIncomeCategoriesLoading: false,
      groupExpenseCategoriesLoading: false,

      groupIncomeCategoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },

      groupExpenseCategoriesError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};
