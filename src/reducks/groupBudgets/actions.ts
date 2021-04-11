import { GroupStandardBudgetsList, GroupYearlyBudgetsList, GroupCustomBudgetsList } from './types';

export type groupBudgetsActions = ReturnType<
  | typeof startFetchGroupStandardBudgetsActions
  | typeof fetchGroupStandardBudgetsActions
  | typeof cancelFetchGroupStandardBudgetsActions
  | typeof failedFetchGroupStandardBudgetsActions
  | typeof startEditGroupStandardBudgetsActions
  | typeof editGroupStandardBudgetsActions
  | typeof failedEditGroupStandardBudgetsActions
  | typeof startFetchGroupCustomBudgetsActions
  | typeof fetchGroupCustomBudgetsActions
  | typeof cancelFetchGroupCustomBudgetsActions
  | typeof failedFetchGroupCustomBudgetsActions
  | typeof startAddGroupCustomBudgetsActions
  | typeof addGroupCustomBudgetsActions
  | typeof failedAddGroupCustomBudgetsActions
  | typeof startEditGroupCustomBudgetsActions
  | typeof editGroupCustomBudgetsActions
  | typeof failedEditGroupCustomBudgetsActions
  | typeof startDeleteGroupCustomBudgetsActions
  | typeof deleteGroupCustomBudgetsActions
  | typeof failedDeleteGroupCustomBudgetsActions
  | typeof startFetchGroupYearlyBudgetsActions
  | typeof fetchGroupYearlyBudgetsActions
  | typeof cancelFetchGroupYearlyBudgetsActions
  | typeof failedFetchGroupYearlyBudgetsActions
>;

export const START_FETCH_GROUP_STANDARD_BUDGETS = 'START_FETCH_GROUP_STANDARD_BUDGETS';
export const startFetchGroupStandardBudgetsActions = () => {
  return {
    type: START_FETCH_GROUP_STANDARD_BUDGETS,
    payload: {
      groupStandardBudgetsLoading: true,

      groupStandardBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_GROUP_STANDARD_BUDGETS = 'FETCH_GROUP_STANDARD_BUDGETS';
export const fetchGroupStandardBudgetsActions = (
  groupStandardBudgetsList: GroupStandardBudgetsList
) => {
  return {
    type: FETCH_GROUP_STANDARD_BUDGETS,
    payload: {
      groupStandardBudgetsLoading: false,
      groupStandardBudgetsList: groupStandardBudgetsList,
    },
  };
};

export const CANCEL_FETCH_GROUP_STANDARD_BUDGETS = 'CANCEL_FETCH_GROUP_STANDARD_BUDGETS';
export const cancelFetchGroupStandardBudgetsActions = () => {
  return {
    type: CANCEL_FETCH_GROUP_STANDARD_BUDGETS,
    payload: {
      groupStandardBudgetsLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_STANDARD_BUDGETS = 'FAILED_FETCH_GROUP_STANDARD_BUDGETS';
export const failedFetchGroupStandardBudgetsActions = (
  statusCode: number,
  errorMessage: string
) => {
  return {
    type: FAILED_FETCH_GROUP_STANDARD_BUDGETS,
    payload: {
      groupStandardBudgetsLoading: false,
      groupStandardBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_STANDARD_BUDGETS = 'START_EDIT_GROUP_STANDARD_BUDGETS';
export const startEditGroupStandardBudgetsActions = () => {
  return {
    type: START_EDIT_GROUP_STANDARD_BUDGETS,
    payload: {
      groupStandardBudgetsLoading: true,

      groupStandardBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const EDIT_GROUP_STANDARD_BUDGETS = 'EDIT_GROUP_STANDARD_BUDGETS';
export const editGroupStandardBudgetsActions = (
  groupStandardBudgetsList: GroupStandardBudgetsList
) => {
  return {
    type: EDIT_GROUP_STANDARD_BUDGETS,
    payload: {
      groupStandardBudgetsLoading: false,
      groupStandardBudgetsList: groupStandardBudgetsList,
    },
  };
};

export const FAILED_EDIT_GROUP_STANDARD_BUDGETS = 'FAILED_EDIT_GROUP_STANDARD_BUDGETS';
export const failedEditGroupStandardBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_GROUP_STANDARD_BUDGETS,
    payload: {
      groupStandardBudgetsLoading: false,
      groupStandardBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_CUSTOM_BUDGETS = 'START_FETCH_GROUP_CUSTOM_BUDGETS';
export const startFetchGroupCustomBudgetsActions = () => {
  return {
    type: START_FETCH_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: true,

      groupCustomBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_GROUP_CUSTOM_BUDGETS = 'FETCH_GROUP_CUSTOM_BUDGETS';
export const fetchGroupCustomBudgetsActions = (groupCustomBudgetsList: GroupCustomBudgetsList) => {
  return {
    type: FETCH_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: false,
      groupCustomBudgetsList: groupCustomBudgetsList,
    },
  };
};

export const CANCEL_FETCH_GROUP_CUSTOM_BUDGETS = 'CANCEL_FETCH_GROUP_CUSTOM_BUDGETS';
export const cancelFetchGroupCustomBudgetsActions = () => {
  return {
    type: CANCEL_FETCH_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_CUSTOM_BUDGETS = 'FAILED_FETCH_GROUP_CUSTOM_BUDGETS';
export const failedFetchGroupCustomBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: false,
      groupCustomBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_ADD_GROUP_CUSTOM_BUDGETS = 'START_ADD_GROUP_CUSTOM_BUDGETS';
export const startAddGroupCustomBudgetsActions = () => {
  return {
    type: START_ADD_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: true,
      groupYearlyBudgetsLoading: true,

      groupCustomBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const ADD_GROUP_CUSTOM_BUDGETS = 'ADD_GROUP_CUSTOM_BUDGETS';
export const addGroupCustomBudgetsActions = (
  groupCustomBudgetsList: GroupCustomBudgetsList,
  groupYearlyBudgetsList: GroupYearlyBudgetsList
) => {
  return {
    type: ADD_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: false,
      groupCustomBudgetsList: groupCustomBudgetsList,
      groupYearlyBudgetsLoading: false,
      groupYearlyBudgetsList: groupYearlyBudgetsList,
    },
  };
};

export const FAILED_ADD_GROUP_CUSTOM_BUDGETS = 'FAILED_ADD_GROUP_CUSTOM_BUDGETS';
export const failedAddGroupCustomBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_ADD_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: false,
      groupYearlyBudgetsLoading: false,
      groupCustomBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_EDIT_GROUP_CUSTOM_BUDGETS = 'START_EDIT_GROUP_CUSTOM_BUDGETS';
export const startEditGroupCustomBudgetsActions = () => {
  return {
    type: START_EDIT_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: true,
      groupYearlyBudgetsLoading: true,

      groupCustomBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const EDIT_GROUP_CUSTOM_BUDGETS = 'EDIT_GROUP_CUSTOM_BUDGETS';
export const editGroupCustomBudgetsActions = (
  groupCustomBudgetsList: GroupCustomBudgetsList,
  groupYearlyBudgetsList: GroupYearlyBudgetsList
) => {
  return {
    type: EDIT_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: false,
      groupCustomBudgetsList: groupCustomBudgetsList,
      groupYearlyBudgetsLoading: false,
      groupYearlyBudgetsList: groupYearlyBudgetsList,
    },
  };
};

export const FAILED_EDIT_GROUP_CUSTOM_BUDGETS = 'FAILED_EDIT_GROUP_CUSTOM_BUDGETS';
export const failedEditGroupCustomBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_EDIT_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupCustomBudgetsLoading: false,
      groupYearlyBudgetsLoading: false,
      groupCustomBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_DELETE_GROUP_CUSTOM_BUDGETS = 'START_DELETE_GROUP_CUSTOM_BUDGETS';
export const startDeleteGroupCustomBudgetsActions = () => {
  return {
    type: START_DELETE_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupYearlyBudgetsLoading: true,

      groupCustomBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const DELETE_GROUP_CUSTOM_BUDGETS = 'DELETE_GROUP_CUSTOM_BUDGETS';
export const deleteGroupCustomBudgetsActions = (groupYearlyBudgetsList: GroupYearlyBudgetsList) => {
  return {
    type: DELETE_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupYearlyBudgetsLoading: false,
      groupYearlyBudgetsList: groupYearlyBudgetsList,
    },
  };
};

export const FAILED_DELETE_GROUP_CUSTOM_BUDGETS = 'FAILED_DELETE_GROUP_CUSTOM_BUDGETS';
export const failedDeleteGroupCustomBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_DELETE_GROUP_CUSTOM_BUDGETS,
    payload: {
      groupYearlyBudgetsLoading: false,
      groupCustomBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};

export const START_FETCH_GROUP_YEARLY_BUDGETS = 'START_FETCH_GROUP_YEARLY_BUDGETS';
export const startFetchGroupYearlyBudgetsActions = () => {
  return {
    type: START_FETCH_GROUP_YEARLY_BUDGETS,
    payload: {
      groupYearlyBudgetsLoading: true,

      groupYearlyBudgetsError: {
        statusCode: null,
        errorMessage: '',
      },
    },
  };
};

export const FETCH_GROUP_YEARLY_BUDGETS = 'FETCH_GROUP_YEARLY_BUDGETS';
export const fetchGroupYearlyBudgetsActions = (groupYearlyBudgetsList: GroupYearlyBudgetsList) => {
  return {
    type: FETCH_GROUP_YEARLY_BUDGETS,
    payload: {
      groupYearlyBudgetsLoading: false,
      groupYearlyBudgetsList: groupYearlyBudgetsList,
    },
  };
};

export const CANCEL_FETCH_GROUP_YEARLY_BUDGETS = 'CANCEL_FETCH_GROUP_YEARLY_BUDGETS';
export const cancelFetchGroupYearlyBudgetsActions = () => {
  return {
    type: CANCEL_FETCH_GROUP_YEARLY_BUDGETS,
    payload: {
      groupYearlyBudgetsLoading: false,
    },
  };
};

export const FAILED_FETCH_GROUP_YEARLY_BUDGETS = 'FAILED_FETCH_GROUP_YEARLY_BUDGETS';
export const failedFetchGroupYearlyBudgetsActions = (statusCode: number, errorMessage: string) => {
  return {
    type: FAILED_FETCH_GROUP_YEARLY_BUDGETS,
    payload: {
      groupYearlyBudgetsLoading: false,
      groupYearlyBudgetsError: {
        statusCode: statusCode,
        errorMessage: errorMessage,
      },
    },
  };
};
