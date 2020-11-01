import React, { useCallback, useState } from 'react';
import { AddTodo, TodoListItemComponent } from './index';
import { TodoList } from '../../reducks/todoLists/types';
import { dateStringToDate, getWeekStartDate, getWeekDay } from '../../lib/date';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getPathTemplateName } from '../../lib/path';
import { makeStyles } from '@material-ui/core/styles';
import { date, month } from '../../lib/constant';

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

const WeeksTodoLists = (props: WeeksTodoListsProps) => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const entityType = getPathTemplateName(window.location.pathname);
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const startDate = getWeekStartDate(selectedDate);
  const today = date;

  const switchTab = (event: React.ChangeEvent<unknown>, value: number) => {
    setValue(value);
  };

  const week = useCallback(
    (todoLists: TodoList) => {
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
            dateTodoLists.push(<TodoListItemComponent todoListItem={todoList} key={todoList.id} />);
          }
        }

        week.push(
          <div
            key={date.getDate()}
            className={
              `${date.getMonth() + 1}/${date.getDate()}` < `${month}/${today.getDate()}`
                ? classes.disabled
                : ''
            }
          >
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

  const existsWeekTodoList = (implementationTodoList: TodoList, dueTodoList: TodoList) => {
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
