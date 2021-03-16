import React from 'react';
import './today-schedule-todo-list-area.scss';
import { TodoListItem } from '../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface TodayScheduleTodoListAreaProps {
  todoList: TodoListItem[];
  currentYear: string;
  currentMonth: string;
  message: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayScheduleTodoListArea = (props: TodayScheduleTodoListAreaProps) => {
  const existTodoList = props.todoList.length !== 0;

  return (
    <div className="today-schedule-todo-list-area">
      {existTodoList ? (
        <ol className="today-schedule-todo-list-area__todo-list">
          {props.todoList.map((listItem) => {
            return (
              <TodoListItemComponentContainer
                listItem={listItem}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
                setEditing={props.setEditing}
                key={listItem.id}
              />
            );
          })}
        </ol>
      ) : (
        <p className="today-schedule-todo-list-area__message">{props.message}</p>
      )}
    </div>
  );
};

export default TodayScheduleTodoListArea;
