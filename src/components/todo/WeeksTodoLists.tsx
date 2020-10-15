import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  getDueTodoLists,
  getImplementationTodoLists,
  getTodoListsMessage,
} from '../../reducks/todoLists/selectors';
import { AddTodo, TodoList } from './index';
import { State } from '../../reducks/store/types';
import { TodoLists } from '../../reducks/todoLists/types';
import { changePrevDateType, getStartDate, getWeekDay } from '../../lib/date';

interface ExistTodoListsProps {
  selectedDate: Date;
}

const WeeksTodoLists = (props: ExistTodoListsProps) => {
  const selector = useSelector((state: State) => state);
  const implementationTodoLists = getImplementationTodoLists(selector);
  const dueTodoLists = getDueTodoLists(selector);
  const todoListsMessage = getTodoListsMessage(selector);
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const _startDate = getStartDate(selectedDate);

  const week = useCallback(
    (todoLists: TodoLists) => {
      const week = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          _startDate.getDate() + i
        );

        const dateTodoLists = [];
        for (const todoList of todoLists) {
          const prevDate: number =
            todoLists === implementationTodoLists
              ? changePrevDateType(todoList.implementation_date).getTime()
              : changePrevDateType(todoList.due_date).getTime();
          const weekDate: number = date.getTime();
          if (prevDate === weekDate) {
            dateTodoLists.push(<TodoList todoListItem={todoList} key={todoList.id} />);
          }
        }

        week.push(
          <div key={date.getDate()}>
            <p>
              {date.getMonth() + 1}/{date.getDate()} （{getWeekDay(date)}）
            </p>
            {dateTodoLists}
            <AddTodo />
          </div>
        );
      }
      return week;
    },
    [selectedDate]
  );

  return (
    <>
      <p>実施予定のTodo</p>
      {implementationTodoLists.length === 0 && dueTodoLists.length === 0 && (
        <p>{todoListsMessage}</p>
      )}
      {week(implementationTodoLists)}
    </>
  );
};

export default WeeksTodoLists;
