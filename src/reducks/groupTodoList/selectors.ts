import { State } from '../store/types';
import { createSelector } from 'reselect';

const groupTodoListSelector = (state: State) => state.groupTodoList;

export const getGroupExpiredTodoList = createSelector(
  [groupTodoListSelector],
  (state) => state.groupExpiredTodoList
);

export const getGroupTodayImplementationTodoList = createSelector(
  [groupTodoListSelector],
  (state) => state.groupTodayImplementationTodoList
);
export const getGroupTodayDueTodoList = createSelector(
  [groupTodoListSelector],
  (state) => state.groupTodayDueTodoList
);
export const getGroupTodayTodoListMessage = createSelector(
  [groupTodoListSelector],
  (state) => state.groupTodayTodoListMessage
);

export const getGroupMonthImplementationTodoList = createSelector(
  [groupTodoListSelector],
  (state) => state.groupMonthImplementationTodoList
);
export const getGroupMonthDueTodoList = createSelector(
  [groupTodoListSelector],
  (state) => state.groupMonthDueTodoList
);
export const getGroupMonthTodoListMessage = createSelector(
  [groupTodoListSelector],
  (state) => state.groupMonthTodoListMessage
);
