import React, { useCallback, useState } from 'react';
import { AddTodo, TodoList } from './index';
import { TodoLists } from '../../reducks/todoLists/types';
import { dateStringToDate, getWeekStartDate, getWeekDay } from '../../lib/date';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getPathTemplateName } from '../../lib/path';

interface WeeksTodoListsProps {
  selectedDate: Date;
  groupId: number;
  groupMonthImplementationTodoList: TodoLists;
  groupMonthDueTodoList: TodoLists;
  monthImplementationTodoList: TodoLists;
  monthDueTodoList: TodoLists;
}

const WeeksTodoLists = (props: WeeksTodoListsProps) => {
  const [value, setValue] = useState<number>(0);
  const entityType = getPathTemplateName(window.location.pathname);
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const startDate = getWeekStartDate(selectedDate);

  const switchTab = (event: React.ChangeEvent<unknown>, value: number) => {
    setValue(value);
  };

  const week = useCallback(
    (todoLists: TodoLists) => {
      const week = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          startDate.getDate() + i
        );

        const dateTodoLists = [];
        for (const todoList of todoLists) {
          const prevDate: number =
            todoLists === props.monthImplementationTodoList
              ? dateStringToDate(todoList.implementation_date).getTime()
              : dateStringToDate(todoList.due_date).getTime();
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
            <AddTodo date={date} groupId={props.groupId} />
          </div>
        );
      }
      return week;
    },
    [selectedDate]
  );

  const existsWeekTodoList = (implementationTodoList: TodoLists, dueTodoList: TodoLists) => {
    if (!implementationTodoList.length && !dueTodoList.length) {
      return (
        <>
          <p>当月実施予定todo、締切予定todoは登録されていません。</p>
          {value === 0 ? week(implementationTodoList) : week(dueTodoList)}
        </>
      );
    } else if (implementationTodoList && dueTodoList) {
      return value === 0 ? week(implementationTodoList) : week(dueTodoList);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={switchTab}>
          <Tab label="実施予定のTodo" value={0} />
          <Tab label="締切予定のTodo" value={1} />
        </Tabs>
      </AppBar>
      {entityType !== 'group'
        ? existsWeekTodoList(props.monthImplementationTodoList, props.monthDueTodoList)
        : existsWeekTodoList(props.groupMonthImplementationTodoList, props.groupMonthDueTodoList)}
    </>
  );
};

export default WeeksTodoLists;
