import React from 'react';
import { AddTodo, TodoListItemComponent } from '../../../index';
import { TodoList } from '../../../../../reducks/todoList/types';
import {
  dateStringToDate,
  getWeekDay,
  getLastDayOfMonth,
  getFirstDayOfMonth,
} from '../../../../../lib/date';
import { GroupTodoList } from '../../../../../reducks/groupTodoList/types';

interface MonthlyTodoListProps {
  planName: string;
  planTodoList: TodoList | GroupTodoList;
  monthImplementationTodoList: TodoList | GroupTodoList;
  monthDueTodoList: TodoList | GroupTodoList;
  selectedDate: Date;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyTodoList = (props: MonthlyTodoListProps) => {
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);
  const lastDayOfMonth = getLastDayOfMonth(selectedDate);

  const month = (todoList: TodoList | GroupTodoList, selectedDate: Date) => {
    const month = [];

    for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
      const firstDayOfMonth = getFirstDayOfMonth(selectedDate);
      const date = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + i));

      const dateTodoLists = [];
      for (const listItem of todoList) {
        const prevDate: number =
          props.planName === '実施予定'
            ? dateStringToDate(listItem.implementation_date).getTime()
            : dateStringToDate(listItem.due_date).getTime();
        const weekDate: number = date.getTime();
        if (prevDate === weekDate) {
          dateTodoLists.push(
            <TodoListItemComponent
              todoListItem={listItem}
              key={listItem.id}
              selectedDate={selectedDate}
              setEditing={props.setEditing}
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
          <AddTodo date={date} />
        </div>
      );
    }
    return month;
  };

  const exitsTodoListMessage = (todoList: TodoList | GroupTodoList, planName: string) => {
    if (props.monthImplementationTodoList.length === 0 && props.monthDueTodoList.length === 0) {
      return (
        <p>{selectedDate.getMonth() + 1}月に、実施予定todo、締切予定todoは、登録されていません。</p>
      );
    } else if (todoList.length === 0) {
      return (
        <p>
          {selectedDate.getMonth() + 1}月に、{planName}のTodoは、登録されていません。
        </p>
      );
    } else if (todoList.length > 0) {
      return;
    }
  };

  return (
    <>
      {exitsTodoListMessage(props.planTodoList, props.planName)}
      {month(props.planTodoList, props.selectedDate)}
    </>
  );
};

export default MonthlyTodoList;
