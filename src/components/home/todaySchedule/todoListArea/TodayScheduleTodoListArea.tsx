import React from 'react';
import './today-schedule-todo-list-area.scss';
import { TodoListItem } from '../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface TodayScheduleTodoListAreaProps {
  todoList: TodoListItem[];
  currentYearMonth: string;
  message: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayScheduleTodoListArea = (props: TodayScheduleTodoListAreaProps) => {
  return (
    <div className="today-schedule-todo-list-area">
      {props.todoList.length ? (
        props.todoList.map((listItem) => {
          return (
            <div className="today-schedule-todo-list-area__item" key={listItem.id}>
              <TodoListItemComponentContainer
                listItem={listItem}
                currentYearMonth={props.currentYearMonth}
                setEditing={props.setEditing}
                inputTodoClassName={'todo-list-item-component__input-todo--home-page'}
              />
            </div>
          );
        })
      ) : (
        <p className="today-schedule-todo-list-area__message">{props.message}</p>
      )}
    </div>
  );
};

export default TodayScheduleTodoListArea;
