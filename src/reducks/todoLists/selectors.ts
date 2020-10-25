import { State } from '../store/types';
import { createSelector } from 'reselect';

const todoListSelector = (state: State) => state.todoLists;

export const getImplementationTodoLists = createSelector(
  [todoListSelector],
  (state) => state.todayImplementationTodoLists
);
export const getDueTodoLists = createSelector(
  [todoListSelector],
  (state) => state.todayDueTodoLists
);

export const getMonthImplementationTodoList = createSelector(
  [todoListSelector],
  (state) => state.monthImplementationTodoList
);
export const getMonthDueTodoList = createSelector(
  [todoListSelector],
  (state) => state.monthDueTodoList
);

export const getTodoListsMessage = createSelector([todoListSelector], (state) => state.message);
