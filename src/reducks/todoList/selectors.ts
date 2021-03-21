import { State } from '../store/types';
import { createSelector } from 'reselect';
import { DisplayTodoList, DisplayTodoListItem, TodoList, TodoListItem } from './types';

const generateDisplayTodoList = (todoList: TodoList, displayDate: string) => {
  return todoList.reduce((displayTodoList: DisplayTodoList, curItem: TodoListItem) => {
    const notExistsDisplayTodoList = displayTodoList.length === 0;
    const lastIdx = displayTodoList.length === 0 ? 0 : displayTodoList.length - 1;
    const itemDate = displayDate === 'dueDate' ? curItem.due_date : curItem.implementation_date;

    if (notExistsDisplayTodoList || displayTodoList[lastIdx].date !== itemDate) {
      const date = itemDate;
      const todoList = [curItem];
      const displayTodoListItem: DisplayTodoListItem = { date, todoList };
      return displayTodoList.concat(displayTodoListItem);
    }

    displayTodoList[lastIdx].todoList = displayTodoList[lastIdx].todoList.concat(curItem);
    return displayTodoList;
  }, []);
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
  state.todoList.monthlyImplementationTodoList;

export const getMonthImplementationTodoList = createSelector(
  [monthlyImplementationTodoListSelector],
  (todoList: TodoList) => {
    const nextTodoList: DisplayTodoList = generateDisplayTodoList(todoList, 'implementationDate');

    return nextTodoList;
  }
);

const monthlyDueTodoListSelector = (state: State) => state.todoList.monthlyDueTodoList;

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
