import React from 'react';
import './todo-list-component.scss';
import { DisplayTodoListItem } from '../../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface TodoListComponentProps {
  todoList: DisplayTodoListItem[];
  currentYear: string;
  currentMonth: string;
  message: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListComponent = (props: TodoListComponentProps) => {
  const existTodoList = props.todoList.length !== 0;

  return (
    <div className="todo-list-component">
      {existTodoList ? (
        <ol className="todo-list-component__list-by-date">
          {props.todoList.map((displayTodolistItem) => {
            return (
              <li key={displayTodolistItem.date}>
                <p className="todo-list-component__date">{displayTodolistItem.date}</p>
                <ol className="todo-list-component__todo-list">
                  {displayTodolistItem.list.map((item) => {
                    return (
                      <li className="todo-list-component__todo-list-item" key={item.id}>
                        <TodoListItemComponentContainer
                          listItem={item}
                          currentYear={props.currentYear}
                          currentMonth={props.currentMonth}
                          setEditing={props.setEditing}
                          inputTodoClassName={'todo-list-item-component__input-todo'}
                        />
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="todo-list-component__message">{props.message}</p>
      )}
    </div>
  );
};

export default TodoListComponent;
