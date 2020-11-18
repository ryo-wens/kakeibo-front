import { GroupStandardBudgetsList, GroupYearlyBudgetsList, GroupCustomBudgetsList } from './types';

export type groupBudgetsActions = ReturnType<
  | typeof fetchGroupStandardBudgetsActions
  | typeof editGroupStandardBudgetsActions
  | typeof fetchGroupYearlyBudgetsActions
  | typeof fetchGroupCustomBudgetsActions
  | typeof addGroupCustomBudgetsActions
  | typeof editGroupCustomBudgetsActions
  | typeof deleteGroupCustomBudgetsActions
>;

export const FETCH_GROUP_STANDARD_BUDGETS = 'FETCH_GROUP_STANDARD_BUDGETS';
export const fetchGroupStandardBudgetsActions = (
  groupStandardBudgetsList: GroupStandardBudgetsList
) => {
  return {
    type: FETCH_GROUP_STANDARD_BUDGETS,
    payload: groupStandardBudgetsList,
  };
};

export const EDIT_GROUP_STANDARD_BUDGETS = 'EDIT_GROUP_STANDARD_BUDGETS';
export const editGroupStandardBudgetsActions = (
  groupStandardBudgetsList: GroupStandardBudgetsList
) => {
  return {
    type: EDIT_GROUP_STANDARD_BUDGETS,
    payload: groupStandardBudgetsList,
  };
};

export const FETCH_GROUP_YEARLY_BUDGETS = 'FETCH_GROUP_YEARLY_BUDGETS';
export const fetchGroupYearlyBudgetsActions = (groupYearlyBudgetsList: GroupYearlyBudgetsList) => {
  return {
    type: FETCH_GROUP_YEARLY_BUDGETS,
    payload: groupYearlyBudgetsList,
  };
};

export const FETCH_GROUP_CUSTOM_BUDGETS = 'FETCH_GROUP_CUSTOM_BUDGETS';
export const fetchGroupCustomBudgetsActions = (groupCustomBudgetsList: GroupCustomBudgetsList) => {
  return {
    type: FETCH_GROUP_CUSTOM_BUDGETS,
    payload: groupCustomBudgetsList,
  };
};

export const ADD_GROUP_CUSTOM_BUDGETS = 'ADD_GROUP_CUSTOM_BUDGETS';
export const addGroupCustomBudgetsActions = (groupYearlyBudgetsList: GroupYearlyBudgetsList) => {
  return {
    type: ADD_GROUP_CUSTOM_BUDGETS,
    payload: groupYearlyBudgetsList,
  };
};

export const EDIT_GROUP_CUSTOM_BUDGETS = 'EDIT_GROUP_CUSTOM_BUDGETS';
export const editGroupCustomBudgetsActions = (groupYearlyBudgetsList: GroupYearlyBudgetsList) => {
  return {
    type: EDIT_GROUP_CUSTOM_BUDGETS,
    payload: groupYearlyBudgetsList,
  };
};

export const COPY_GROUP_STANDARD_BUDGETS = 'COPY_GROUP_STANDARD_BUDGETS';
export const copyGroupStandardBudgetsActions = (groupCustomBudgetsList: GroupCustomBudgetsList) => {
  return {
    type: COPY_GROUP_STANDARD_BUDGETS,
    payload: groupCustomBudgetsList,
  };
};

export const DELETE_GROUP_CUSTOM_BUDGETS = 'DELETE_GROUP_CUSTOM_BUDGETS';
export const deleteGroupCustomBudgetsActions = (groupYearlyBudgetsList: GroupYearlyBudgetsList) => {
  return {
    type: DELETE_GROUP_CUSTOM_BUDGETS,
    payload: groupYearlyBudgetsList,
  };
};
