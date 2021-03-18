import { State } from '../store/types';
import { createSelector } from 'reselect';
import { GroupTodoList, GroupTodoListItem } from './types';
import { DisplayTodoList, DisplayTodoListItem, TodoList, TodoListItem } from '../todoList/types';

const generateTodoList = (groupTodoList: GroupTodoList) => {
  return groupTodoList.map((listItem) => {
    const { user_id: _, ...rest } = listItem; //eslint-disable-line @typescript-eslint/no-unused-vars

    return rest;
  });
};

const generateTodoListItem = (groupTodoListItem: GroupTodoListItem) => {
  const { user_id: _, ...rest } = groupTodoListItem; //eslint-disable-line @typescript-eslint/no-unused-vars

  return rest;
};

const generateDisplayTodoList = (todoList: GroupTodoList, displayDate: string) => {
  return todoList.reduce((displayTodoList: DisplayTodoList, curItem: GroupTodoListItem) => {
    const curTodoListItem: TodoListItem = generateTodoListItem(curItem);
    const notExistsDisplayTodoList = displayTodoList.length === 0;
    const lastIdx = displayTodoList.length === 0 ? 0 : displayTodoList.length - 1;
    const itemDate = displayDate === 'dueDate' ? curItem.due_date : curItem.implementation_date;

    if (notExistsDisplayTodoList || displayTodoList[lastIdx].date !== itemDate) {
      const date = itemDate;
      const todoList = [curTodoListItem];
      const displayTodoListItem: DisplayTodoListItem = { date, todoList };
      return displayTodoList.concat(displayTodoListItem);
    }

    displayTodoList[lastIdx].todoList = displayTodoList[lastIdx].todoList.concat(curTodoListItem);
    return displayTodoList;
  }, []);
};

const groupTodayImplementationTodoListSelector = (state: State) =>
  state.groupTodoList.groupTodayImplementationTodoList;

export const getGroupDisplayInHomeImplementationTodoList = createSelector(
  [groupTodayImplementationTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: TodoList = generateTodoList(groupTodoList);

    return nextGroupTodoList;
  }
);

export const getGroupTodayImplementationTodoList = createSelector(
  [groupTodayImplementationTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: DisplayTodoList = generateDisplayTodoList(
      groupTodoList,
      'implementationDate'
    );

    return nextGroupTodoList;
  }
);

const groupTodayDueTodoListSelector = (state: State) => state.groupTodoList.groupTodayDueTodoList;

export const getGroupDisplayInHomeDueTodoList = createSelector(
  [groupTodayDueTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: TodoList = generateTodoList(groupTodoList);

    return nextGroupTodoList;
  }
);

export const getGroupTodayDueTodoList = createSelector(
  [groupTodayDueTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: DisplayTodoList = generateDisplayTodoList(groupTodoList, 'dueDate');

    return nextGroupTodoList;
  }
);

const groupMonthlyImplementationTodoListSelector = (state: State) =>
  state.groupTodoList.groupMonthlyImplementationTodoList;

export const getGroupMonthlyImplementationTodoList = createSelector(
  [groupMonthlyImplementationTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: DisplayTodoList = generateDisplayTodoList(
      groupTodoList,
      'implementationDate'
    );

    return nextGroupTodoList;
  }
);

const groupMonthlyDueTodoListSelector = (state: State) =>
  state.groupTodoList.groupMonthlyDueTodoList;

export const getGroupMonthlyDueTodoList = createSelector(
  [groupMonthlyDueTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: DisplayTodoList = generateDisplayTodoList(groupTodoList, 'dueDate');

    return nextGroupTodoList;
  }
);

const groupExpiredTodoListSelector = (state: State) => state.groupTodoList.groupExpiredTodoList;

export const getGroupExpiredTodoList = createSelector(
  [groupExpiredTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: DisplayTodoList = generateDisplayTodoList(groupTodoList, 'dueDate');

    return nextGroupTodoList;
  }
);

export const getSlicedGroupExpiredTodoList = createSelector(
  [groupExpiredTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const initialDisplayItemNumber = 3;

    if (groupTodoList.length > initialDisplayItemNumber) {
      const slicedGroupTodoList = groupTodoList.slice(0, initialDisplayItemNumber);
      const nextGroupTodoList: DisplayTodoList = generateDisplayTodoList(
        slicedGroupTodoList,
        'dueDate'
      );

      return nextGroupTodoList;
    }
    const nextGroupTodoList: DisplayTodoList = generateDisplayTodoList(groupTodoList, 'dueDate');

    return nextGroupTodoList;
  }
);

const groupSearchTodoListSelector = (state: State) => state.groupTodoList.groupSearchTodoList;

export const getGroupSearchTodoList = createSelector(
  [groupSearchTodoListSelector],
  (groupTodoList: GroupTodoList) => {
    const nextGroupTodoList: TodoList = generateTodoList(groupTodoList);

    return nextGroupTodoList;
  }
);
