import React, { useCallback, useState } from 'react';
import { AddTodo, TodoListItemComponent } from './index';
import { TodoList } from '../../reducks/todoList/types';
import {
  dateStringToDate,
  getWeekDay,
  getLastDayOfMonth,
  getFirstDayOfMonth,
} from '../../lib/date';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getPathTemplateName } from '../../lib/path';
import { makeStyles } from '@material-ui/core/styles';
import { date } from '../../lib/constant';

const useStyles = makeStyles({
  disabled: {
    pointerEvents: 'none',
    opacity: 0.6,
  },
});

interface WeeksTodoListsProps {
  selectedDate: Date;
  groupId: number;
  groupMonthImplementationTodoList: TodoList;
  groupMonthDueTodoList: TodoList;
  monthImplementationTodoList: TodoList;
  monthDueTodoList: TodoList;
}

const MonthlyTodoList = (props: WeeksTodoListsProps) => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const entityType = getPathTemplateName(window.location.pathname);
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const today = date;
  const lastDayOfMonth = getLastDayOfMonth(selectedDate);

  const switchTab = (event: React.ChangeEvent<unknown>, value: number) => {
    setValue(value);
  };

  const month = useCallback(
    (todoList: TodoList, selectedDate: Date) => {
      const month = [];

      for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
        const firstDayOfMonth = getFirstDayOfMonth(selectedDate);
        const date = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + i));

        const dateTodoLists = [];
        for (const listItem of todoList) {
          const prevDate: number =
            todoList === props.monthImplementationTodoList
              ? dateStringToDate(listItem.implementation_date).getTime()
              : dateStringToDate(listItem.due_date).getTime();
          const weekDate: number = date.getTime();
          if (prevDate === weekDate) {
            dateTodoLists.push(
              <TodoListItemComponent
                todoListItem={listItem}
                key={listItem.id}
                selectedDate={selectedDate}
              />
            );
          }
        }

        month.push(
          <div key={date.getDate()}>
            <p>
              {date.getMonth() + 1}/{date.getDate()} （{getWeekDay(date)}）
            </p>
            {dateTodoLists}
            <AddTodo date={date} groupId={props.groupId} />
          </div>
        );
      }
      return month;
    },
    [today, lastDayOfMonth, props.groupId, props.monthImplementationTodoList, classes.disabled]
  );

  const existsWeekTodoList = (implementationTodoList: TodoList, dueTodoList: TodoList) => {
    if (!implementationTodoList.length && !dueTodoList.length) {
      return (
        <>
          <p>当月実施予定todo、締切予定todoは登録されていません。</p>
          {value === 0
            ? month(implementationTodoList, selectedDate)
            : month(dueTodoList, selectedDate)}
        </>
      );
    } else if (implementationTodoList && dueTodoList) {
      return value === 0
        ? month(implementationTodoList, selectedDate)
        : month(dueTodoList, selectedDate);
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

export default MonthlyTodoList;
