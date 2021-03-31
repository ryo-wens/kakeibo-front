import { StandardBudgetsList, YearlyBudgetsList, CustomBudgetsList } from './types';
export type budgetsActions = ReturnType<
  | typeof startFetchStandardBudgetsAction
  | typeof fetchStandardBudgetsActions
  | typeof cancelFetchStandardBudgetsAction
  | typeof failedFetchStandardBudgetsAction
  | typeof startEditStandardBudgetsAction
  | typeof editStandardBudgetsActions
  | typeof failedEditStandardBudgetsAction
  | typeof startFetchCustomBudgetsActions
  | typeof fetchCustomBudgetsActions
  | typeof cancelFetchCustomBudgetsActions
  | typeof failedFetchCustomBudgetsActions
  | typeof startAddCustomBudgetsActions
  | typeof addCustomBudgetsActions
  | typeof failedAddCustomBudgetsActions
  | typeof startEditCustomBudgetsActions
  | typeof editCustomBudgetsActions
  | typeof failedEditCustomBudgetsActions
  | typeof startDeleteCustomBudgetsActions
  | typeof deleteCustomBudgetsActions
  | typeof failedDeleteCustomBudgetsActions
  | typeof startFetchYearlyBudgetsActions
  | typeof fetchYearlyBudgetsActions
  | typeof cancelFetchYearlyBudgetsActions
  | typeof failedFetchYearlyBudgetsActions
>;

export const START_FETCH_STANDARD_BUDGETS = 'START_FETCH_STANDARD_BUDGETS';
export const startFetchStandardBudgetsAction = () => {
  return {
    type: START_FETCH_STANDARD_BUDGETS,
    payload: {
      standardBudgetsLoading: true,

      standardBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_STANDARD_BUDGETS = 'FETCH_STANDARD_BUDGETS';
export const fetchStandardBudgetsActions = (standard_budgets_list: StandardBudgetsList) => {
  return {
    type: FETCH_STANDARD_BUDGETS,
    payload: {
      standardBudgetsLoading: false,
      standard_budgets_list: standard_budgets_list,
    },
  };
};

export const CANCEL_FETCH_STANDARD_BUDGETS = 'CANCEL_FETCH_STANDARD_BUDGETS';
export const cancelFetchStandardBudgetsAction = () => {
  return {
    type: CANCEL_FETCH_STANDARD_BUDGETS,
    payload: {
      standardBudgetsLoading: false,
    },
  };
};

export const FAILED_FETCH_STANDARD_BUDGETS = 'FAILED_FETCH_STANDARD_BUDGETS';
export const failedFetchStandardBudgetsAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_STANDARD_BUDGETS,
    payload: {
      standardBudgetsLoading: false,
      standardBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_STANDARD_BUDGETS = 'START_EDIT_STANDARD_BUDGETS';
export const startEditStandardBudgetsAction = () => {
  return {
    type: START_EDIT_STANDARD_BUDGETS,
    payload: {
      standardBudgetsLoading: true,

      standardBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const EDIT_STANDARD_BUDGETS = 'EDIT_STANDARD_BUDGETS';
export const editStandardBudgetsActions = (standard_budgets_list: StandardBudgetsList) => {
  return {
    type: EDIT_STANDARD_BUDGETS,
    payload: {
      standardBudgetsLoading: false,
      standard_budgets_list: standard_budgets_list,
    },
  };
};

export const FAILED_EDIT_STANDARD_BUDGETS = 'FAILED_EDIT_STANDARD_BUDGETS';
export const failedEditStandardBudgetsAction = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_STANDARD_BUDGETS,
    payload: {
      standardBudgetsLoading: false,
      standardBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_CUSTOM_BUDGETS = 'START_FETCH_CUSTOM_BUDGETS';
export const startFetchCustomBudgetsActions = () => {
  return {
    type: START_FETCH_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: true,

      customBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_CUSTOM_BUDGETS = 'FETCH_CUSTOM_BUDGETS';
export const fetchCustomBudgetsActions = (custom_budgets_list: CustomBudgetsList) => {
  return {
    type: FETCH_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: false,
      custom_budgets_list: custom_budgets_list,
    },
  };
};

export const CANCEL_FETCH_CUSTOM_BUDGETS = 'CANCEL_FETCH_CUSTOM_BUDGETS';
export const cancelFetchCustomBudgetsActions = () => {
  return {
    type: CANCEL_FETCH_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: false,
    },
  };
};

export const FAILED_FETCH_CUSTOM_BUDGETS = 'FAILED_FETCH_CUSTOM_BUDGETS';
export const failedFetchCustomBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: false,
      customBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_CUSTOM_BUDGETS = 'START_ADD_CUSTOM_BUDGETS';
export const startAddCustomBudgetsActions = () => {
  return {
    type: START_ADD_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: true,
      yearlyBudgetsLoading: true,

      customBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const ADD_CUSTOM_BUDGETS = 'ADD_CUSTOM_BUDGETS';
export const addCustomBudgetsActions = (
  custom_budgets_list: CustomBudgetsList,
  yearly_budgets_list: YearlyBudgetsList
) => {
  return {
    type: ADD_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: false,
      custom_budgets_list: custom_budgets_list,
      yearlyBudgetsLoading: false,
      yearly_budgets_list: yearly_budgets_list,
    },
  };
};

export const FAILED_ADD_CUSTOM_BUDGETS = 'FAILED_ADD_CUSTOM_BUDGETS';
export const failedAddCustomBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: false,
      yearlyBudgetsLoading: false,
      customBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_CUSTOM_BUDGETS = 'START_EDIT_CUSTOM_BUDGETS';
export const startEditCustomBudgetsActions = () => {
  return {
    type: START_EDIT_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: true,
      yearlyBudgetsLoading: true,

      customBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const EDIT_CUSTOM_BUDGETS = 'EDIT_CUSTOM_BUDGETS';
export const editCustomBudgetsActions = (
  custom_budgets_list: CustomBudgetsList,
  yearly_budgets_list: YearlyBudgetsList
) => {
  return {
    type: EDIT_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: false,
      custom_budgets_list: custom_budgets_list,
      yearlyBudgetsLoading: false,
      yearly_budgets_list: yearly_budgets_list,
    },
  };
};

export const FAILED_EDIT_CUSTOM_BUDGETS = 'FAILED_EDIT_CUSTOM_BUDGETS';
export const failedEditCustomBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_CUSTOM_BUDGETS,
    payload: {
      customBudgetsLoading: false,
      yearlyBudgetsLoading: false,
      customBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_CUSTOM_BUDGETS = 'START_DELETE_CUSTOM_BUDGETS';
export const startDeleteCustomBudgetsActions = () => {
  return {
    type: START_DELETE_CUSTOM_BUDGETS,
    payload: {
      yearlyBudgetsLoading: true,

      yearlyBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const DELETE_CUSTOM_BUDGETS = 'DELETE_CUSTOM_BUDGETS';
export const deleteCustomBudgetsActions = (yearly_budgets_list: YearlyBudgetsList) => {
  return {
    type: DELETE_CUSTOM_BUDGETS,
    payload: {
      yearlyBudgetsLoading: false,
      yearly_budgets_list: yearly_budgets_list,
    },
  };
};

export const FAILED_DELETE_CUSTOM_BUDGETS = 'FAILED_DELETE_CUSTOM_BUDGETS';
export const failedDeleteCustomBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_CUSTOM_BUDGETS,
    payload: {
      yearlyBudgetsLoading: false,
      yearlyBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_YEARLY_BUDGETS = 'START_FETCH_YEARLY_BUDGETS';
export const startFetchYearlyBudgetsActions = () => {
  return {
    type: START_FETCH_YEARLY_BUDGETS,
    payload: {
      yearlyBudgetsLoading: true,

      yearlyBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_YEARLY_BUDGETS = 'FETCH_YEARLY_BUDGETS';
export const fetchYearlyBudgetsActions = (yearly_budgets_list: YearlyBudgetsList) => {
  return {
    type: FETCH_YEARLY_BUDGETS,
    payload: {
      yearlyBudgetsLoading: false,
      yearly_budgets_list: yearly_budgets_list,
    },
  };
};

export const CANCEL_FETCH_YEARLY_BUDGETS = 'CANCEL_FETCH_YEARLY_BUDGETS';
export const cancelFetchYearlyBudgetsActions = () => {
  return {
    type: CANCEL_FETCH_YEARLY_BUDGETS,
    payload: {
      yearlyBudgetsLoading: false,
    },
  };
};

export const FAILED_FETCH_YEARLY_BUDGETS = 'FAILED_FETCH_YEARLY_BUDGETS';
export const failedFetchYearlyBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_YEARLY_BUDGETS,
    payload: {
      yearlyBudgetsLoading: false,
      yearlyBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};
