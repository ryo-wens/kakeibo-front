import React from 'react';
import './todo-list-component.scss';
import { GroupTodoListItem } from '../../../../../reducks/groupTodoList/types';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface TodoListComponentProps {
  todoList: (TodoListItem | GroupTodoListItem)[];
  currentYearMonth: string;
  message: string;
  equalsDisplayDate: (listItem: TodoListItem | GroupTodoListItem) => boolean;
  displayDate: (listItem: TodoListItem | GroupTodoListItem) => string;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListComponent = (props: TodoListComponentProps) => {
  return (
    <div className="todo-list-component">
      {props.todoList.length ? (
        props.todoList.map((listItem) => {
          return (
            <div key={listItem.id}>
              {props.equalsDisplayDate(listItem) && (
                <p className="todo-list-component__date">{props.displayDate(listItem)}</p>
              )}
              <TodoListItemComponentContainer
                listItem={listItem}
                currentYearMonth={props.currentYearMonth}
                setEditing={props.setEditing}
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
