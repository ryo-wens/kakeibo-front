import React from 'react';
import './today-schedule-todo-list.scss';
import { GroupTodoListItem } from '../../../../reducks/groupTodoList/types';
import { TodoListItem } from '../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface TodayScheduleTodoListProps {
  todoList: (TodoListItem | GroupTodoListItem)[];
  currentYearMonth: string;
  message: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayScheduleTodoList = (props: TodayScheduleTodoListProps) => {
  return (
    <div className="today-schedule-todo-list">
      {props.todoList.length ? (
        props.todoList.map((listItem) => {
          return (
            <div className="today-schedule-todo-list__item" key={listItem.id}>
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
        <p className="today-schedule-todo-list__message">{props.message}</p>
      )}
    </div>
  );
};

export default TodayScheduleTodoList;
