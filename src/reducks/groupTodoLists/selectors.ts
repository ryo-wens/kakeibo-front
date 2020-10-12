import { State } from '../store/types';
import { createSelector } from 'reselect';

const groupTodoListsSelector = (state: State) => state.groupTodoLists;

export const getGroupImplementationTodoLists = createSelector(
  [groupTodoListsSelector],
  (state) => state.groupImplementationTodoLists
);
export const getGroupDueTodoLists = createSelector(
  [groupTodoListsSelector],
  (state) => state.groupDueTodoLists
);
export const getGroupTodoListsMessage = createSelector(
  [groupTodoListsSelector],
  (state) => state.message
);
