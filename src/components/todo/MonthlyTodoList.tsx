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
    (todoLists: TodoList) => {
      const month = [];

      for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
        const firstDayOfMonth = getFirstDayOfMonth(selectedDate);
        const date = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + i));

        const getTimeDate =
          new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime() - 1000;

        const dateTodoLists = [];
        for (const todoList of todoLists) {
          const prevDate: number =
            todoLists === props.monthImplementationTodoList
              ? dateStringToDate(todoList.implementation_date).getTime()
              : dateStringToDate(todoList.due_date).getTime();
          const weekDate: number = date.getTime();
          if (prevDate === weekDate) {
            dateTodoLists.push(
              <TodoListItemComponent
                todoListItem={todoList}
                key={todoList.id}
                selectedDate={selectedDate}
              />
            );
          }
        }

        month.push(
          <div
            key={date.getDate()}
            className={today.getTime() > getTimeDate ? classes.disabled : ''}
          >
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
    [selectedDate]
  );

  const existsWeekTodoList = (implementationTodoList: TodoList, dueTodoList: TodoList) => {
    if (!implementationTodoList.length && !dueTodoList.length) {
      return (
        <>
          <p>当月実施予定todo、締切予定todoは登録されていません。</p>
          {value === 0 ? month(implementationTodoList) : month(dueTodoList)}
        </>
      );
    } else if (implementationTodoList && dueTodoList) {
      return value === 0 ? month(implementationTodoList) : month(dueTodoList);
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
