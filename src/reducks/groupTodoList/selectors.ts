import { State } from '../store/types';
import { createSelector } from 'reselect';
import { GroupTodoList } from './types';
import { TodoList } from '../todoList/types';

const generateGroupTodoList = (groupTodoList: GroupTodoList) => {
  return groupTodoList.map((listItem) => {
    const { user_id, ...rest } = listItem; //eslint-disable-line

    return rest;
  });
};

const groupExpiredTodoListSelector = (state: State) => state.groupTodoList.groupExpiredTodoList;

export const getGroupExpiredTodoList = createSelector(
  [groupExpiredTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: TodoList = generateGroupTodoList(groupTodoList);

    return nextGroupTodoList;
  }
);

const groupTodayImplementationTodoListSelector = (state: State) =>
  state.groupTodoList.groupTodayImplementationTodoList;

export const getGroupTodayImplementationTodoList = createSelector(
  [groupTodayImplementationTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: TodoList = generateGroupTodoList(groupTodoList);

    return nextGroupTodoList;
  }
);

const groupTodayDueTodoListSelector = (state: State) => state.groupTodoList.groupTodayDueTodoList;

export const getGroupTodayDueTodoList = createSelector(
  [groupTodayDueTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: TodoList = generateGroupTodoList(groupTodoList);

    return nextGroupTodoList;
  }
);

const groupMonthlyImplementationTodoListSelector = (state: State) =>
  state.groupTodoList.groupMonthImplementationTodoList;

export const getGroupMonthlyImplementationTodoList = createSelector(
  [groupMonthlyImplementationTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: TodoList = generateGroupTodoList(groupTodoList);

    return nextGroupTodoList;
  }
);

const groupMonthlyDueTodoListSelector = (state: State) => state.groupTodoList.groupMonthDueTodoList;

export const getGroupMonthlyDueTodoList = createSelector(
  [groupMonthlyDueTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: TodoList = generateGroupTodoList(groupTodoList);

    return nextGroupTodoList;
  }
);

const groupSearchTodoListSelector = (state: State) => state.groupTodoList.groupSearchTodoList;

export const getGroupSearchTodoList = createSelector(
  [groupSearchTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: TodoList = generateGroupTodoList(groupTodoList);

    return nextGroupTodoList;
  }
);
