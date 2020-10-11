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

interface ExistTodoListsProps {
  selectedDate: Date;
}

const WeeksTodoLists = (props: ExistTodoListsProps) => {
  const selector = useSelector((state: State) => state);
  const implementationTodoLists = getImplementationTodoLists(selector);
  const dueTodoLists = getDueTodoLists(selector);
  const todoListsMessage = getTodoListsMessage(selector);
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const selectedDate = new Date(dt);
  const selectedWeekDay = selectedDate.getDay();
  const _startDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate() - selectedWeekDay
  );
  const operationType = 'createTodoListItem';
  const groupId = 0;

  const changePrevDateType = (date: string) => {
    const prevDates = date.split(/[/()]/, 3);
    const prevYear = Number(prevDates[0]);
    const prevMonth = Number(prevDates[1]) - 1;
    const prevDate = Number(prevDates[2]);
    return new Date(prevYear, prevMonth, prevDate);
  };

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
              {date.getMonth() + 1}/{date.getDate()} （{weekdays[date.getDay()]}）
            </p>
            {dateTodoLists}
            <AddTodo operationType={operationType} groupId={groupId} />
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
