import { State } from '../store/types';
import { createSelector } from 'reselect';

const groupTodoListsSelector = (state: State) => state.groupTodoList;

export const getGroupTodayImplementationTodoList = createSelector(
  [groupTodoListsSelector],
  (state) => state.groupTodayImplementationTodoList
);
export const getGroupTodayDueTodoList = createSelector(
  [groupTodoListsSelector],
  (state) => state.groupTodayDueTodoList
);
export const getGroupTodayTodoListMessage = createSelector(
  [groupTodoListsSelector],
  (state) => state.groupTodayTodoListMessage
);

export const getGroupMonthImplementationTodoList = createSelector(
  [groupTodoListsSelector],
  (state) => state.groupMonthImplementationTodoList
);
export const getGroupMonthDueTodoList = createSelector(
  [groupTodoListsSelector],
  (state) => state.groupMonthDueTodoList
);
export const getGroupMonthTodoListMessage = createSelector(
  [groupTodoListsSelector],
  (state) => state.groupMonthTodoListMessage
);
