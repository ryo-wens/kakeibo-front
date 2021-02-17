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
  const displayTodoList: DisplayTodoList = [];
  const notFound = -1;

  for (const item of todoList) {
    const groupTodoListItem: TodoListItem = generateTodoListItem(item);
    const itemDate = displayDate === 'dueDate' ? item.due_date : item.implementation_date;
    const idx = displayTodoList.findIndex(
      (displayTodoListItem) => displayTodoListItem.date === itemDate
    );

    if (idx !== notFound) {
      if (displayTodoList[idx].date !== itemDate) {
        const displayTodoListItem: DisplayTodoListItem = {
          date: itemDate,
          list: [groupTodoListItem],
        };

        displayTodoList.push(displayTodoListItem);
        continue;
      }

      displayTodoList[idx].list.push(groupTodoListItem);
      continue;
    }

    const displayTodoListItem: DisplayTodoListItem = {
      date: itemDate,
      list: [groupTodoListItem],
    };

    displayTodoList.push(displayTodoListItem);
  }

  return displayTodoList;
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
  state.groupTodoList.groupMonthImplementationTodoList;

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

const groupMonthlyDueTodoListSelector = (state: State) => state.groupTodoList.groupMonthDueTodoList;

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
