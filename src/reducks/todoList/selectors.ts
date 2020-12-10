import { State } from '../store/types';
import { createSelector } from 'reselect';

const todoListSelector = (state: State) => state.todoList;

export const getExpiredTodoList = createSelector(
  [todoListSelector],
  (state) => state.expiredTodoList
);

export const getTodayImplementationTodoList = createSelector(
  [todoListSelector],
  (state) => state.todayImplementationTodoList
);

export const getTodayDueTodoList = createSelector(
  [todoListSelector],
  (state) => state.todayDueTodoList
);

export const getTodayTodoListMessage = createSelector(
  [todoListSelector],
  (state) => state.todayTodoListMessage
);

export const getMonthImplementationTodoList = createSelector(
  [todoListSelector],
  (state) => state.monthImplementationTodoList
);
export const getMonthDueTodoList = createSelector(
  [todoListSelector],
  (state) => state.monthDueTodoList
);

export const getMonthTodoListMessage = createSelector(
  [todoListSelector],
  (state) => state.monthTodoListMessage
);

export const getSearchTodoList = createSelector(
  [todoListSelector],
  (state) => state.searchTodoList
);

export const getSearchTodoListMessage = createSelector(
  [todoListSelector],
  (state) => state.searchTodoListMessage
);
