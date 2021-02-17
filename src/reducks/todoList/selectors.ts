import { State } from '../store/types';
import { createSelector } from 'reselect';
import { DisplayTodoList, DisplayTodoListItem, TodoList } from './types';

const generateDisplayTodoList = (todoList: TodoList, displayDate: string) => {
  const displayTodoList: DisplayTodoList = [];
  const notFound = -1;

  for (const item of todoList) {
    const itemDate = displayDate === 'dueDate' ? item.due_date : item.implementation_date;
    const idx = displayTodoList.findIndex(
      (displayTodoListItem) => displayTodoListItem.date === itemDate
    );

    if (idx !== notFound) {
      if (displayTodoList[idx].date !== itemDate) {
        const displayTodoListItem: DisplayTodoListItem = {
          date: itemDate,
          list: [item],
        };

        displayTodoList.push(displayTodoListItem);
        continue;
      }

      displayTodoList[idx].list.push(item);
      continue;
    }

    const displayTodoListItem: DisplayTodoListItem = {
      date: itemDate,
      list: [item],
    };

    displayTodoList.push(displayTodoListItem);
  }

  return displayTodoList;
};

const todayImplementationDateTodoListSelector = (state: State) =>
  state.todoList.todayImplementationTodoList;

export const getDisplayInHomeImplementationTodoList = createSelector(
  [todayImplementationDateTodoListSelector],
  (todoList: TodoList) => {
    return todoList;
  }
);

export const getTodayImplementationTodoList = createSelector(
  [todayImplementationDateTodoListSelector],
  (todoList: TodoList) => {
    const nextTodoList: DisplayTodoList = generateDisplayTodoList(todoList, 'implementationDate');

    return nextTodoList;
  }
);

const todayDueTodoListSelector = (state: State) => state.todoList.todayDueTodoList;

export const getDisplayInHomeDueTodoList = createSelector(
  [todayDueTodoListSelector],
  (todoList: TodoList) => {
    return todoList;
  }
);

export const getTodayDueTodoList = createSelector(
  [todayDueTodoListSelector],
  (todoList: TodoList) => {
    const nextTodoList: DisplayTodoList = generateDisplayTodoList(todoList, 'dueDate');

    return nextTodoList;
  }
);

const monthlyImplementationTodoListSelector = (state: State) =>
  state.todoList.monthImplementationTodoList;

export const getMonthImplementationTodoList = createSelector(
  [monthlyImplementationTodoListSelector],
  (todoList: TodoList) => {
    const nextTodoList: DisplayTodoList = generateDisplayTodoList(todoList, 'implementationDate');

    return nextTodoList;
  }
);

const monthlyDueTodoListSelector = (state: State) => state.todoList.monthDueTodoList;

export const getMonthlyDueTodoList = createSelector(
  [monthlyDueTodoListSelector],
  (todoList: TodoList) => {
    const nextTodoList: DisplayTodoList = generateDisplayTodoList(todoList, 'dueDate');

    return nextTodoList;
  }
);

const expiredTodoListSelector = (state: State) => state.todoList.expiredTodoList;

export const getExpiredTodoList = createSelector(
  [expiredTodoListSelector],
  (todoList: TodoList) => {
    const nextTodoList: DisplayTodoList = generateDisplayTodoList(todoList, 'dueDate');

    return nextTodoList;
  }
);

export const getSlicedExpiredTodoList = createSelector(
  [expiredTodoListSelector],
  (todoList: TodoList) => {
    const initialDisplayItemNumber = 3;

    if (todoList.length > initialDisplayItemNumber) {
      const slicedTodoList = todoList.slice(0, initialDisplayItemNumber);
      const nextTodoList: DisplayTodoList = generateDisplayTodoList(slicedTodoList, 'dueDate');

      return nextTodoList;
    }
    const nextTodoList: DisplayTodoList = generateDisplayTodoList(todoList, 'dueDate');

    return nextTodoList;
  }
);

const searchTodoListSelector = (state: State) => state.todoList.searchTodoList;

export const getSearchTodoList = createSelector([searchTodoListSelector], (todoList: TodoList) => {
  return todoList;
});
