import { State } from '../store/types';
import { createSelector } from 'reselect';

const todoListsSelector = (state: State) => state.todoLists;

export const getImplementationTodoLists = createSelector(
  [todoListsSelector],
  (state) => state.implementationTodoLists
);
export const getDueTodoLists = createSelector([todoListsSelector], (state) => state.dueTodoLists);

export const getMonthImplementationTodoLists = createSelector(
  [todoListsSelector],
  (state) => state.monthImplementationTodoLists
);
export const getMonthDueTodoLists = createSelector(
  [todoListsSelector],
  (state) => state.monthDueTodoLists
);

export const getTodoListsMessage = createSelector([todoListsSelector], (state) => state.message);
