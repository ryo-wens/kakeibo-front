import React from 'react';
import './todo-list-component.scss';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface TodoListComponentProps {
  todoList: TodoListItem[];
  currentYearMonth: string;
  message: string;
  equalsDisplayDate: (listItem: TodoListItem) => boolean;
  displayDate: (listItem: TodoListItem) => string;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListComponent = (props: TodoListComponentProps) => {
  return (
    <div className="todo-list-component">
      {props.todoList.length ? (
        props.todoList.map((listItem) => {
          return (
            <div className="todo-list-component__item" key={listItem.id}>
              {props.equalsDisplayDate(listItem) && (
                <p className="todo-list-component__item-date">{props.displayDate(listItem)}</p>
              )}
              <TodoListItemComponentContainer
                listItem={listItem}
                currentYearMonth={props.currentYearMonth}
                setEditing={props.setEditing}
                inputTodoClassName={'todo-list-item-component__input-todo'}
              />
            </div>
          );
        })
      ) : (
        <p className="todo-list-component__message">{props.message}</p>
      )}
    </div>
  );
};

export default TodoListComponent;
