import React from 'react';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import EditIcon from '@material-ui/icons/Edit';
import './todo-list-item-component.scss';
import TodoListItemFormContainer from '../../../../../containers/todo/modules/form/TodoListItemFormContainer';
import cn from 'classnames';

interface TodoListItemComponentProps {
  openEditTodoForm: boolean;
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  checked: boolean;
  handleImplementationDate: (date: Date | null) => void;
  handleDueDate: (date: Date | null) => void;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  listItem: TodoListItem;
  handleOpenEditTodoForm: () => void;
  handleCloseEditTodoForm: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  disabledButton: boolean;
  handleEditTodoListItem: () => void;
  handleDeleteTodoListItem: () => void;
  currentPage: string;
  formClassName?: string;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  inputTodoRef: React.RefObject<HTMLDivElement>;
}

const TodoListItemComponent = (props: TodoListItemComponentProps) => {
  const listItemClassName = cn('todo-list-item-component');

  const contentClassName = cn('todo-list-item-component__content', {
    'todo-list-item-component__complete': props.checked,
  });

  const childDatePickersClassName = cn({
    'todo-list-item-component__child-date-pickers': props.currentPage !== 'home',
    'todo-list-item-component__child-date-pickers-cr-home-page': props.currentPage === 'home',
  });

  return (
    <>
      {!props.openEditTodoForm ? (
        <li className={listItemClassName}>
          <label className="todo-list-item-component__check">
            <input type="checkbox" checked={props.checked} onChange={props.handleChangeChecked} />
            <span />
          </label>
          <span className={contentClassName}>{props.listItem.todo_content}</span>
          <EditIcon
            className="todo-list-item-component__edit-icon"
            onClick={() => props.handleOpenEditTodoForm()}
          />
        </li>
      ) : (
        <div className={props.formClassName}>
          <TodoListItemFormContainer
            titleLabel={'ToDoを編集'}
            buttonLabel={'保存'}
            handleTodoContentChange={props.handleTodoContentChange}
            handleImplementationDate={props.handleImplementationDate}
            handleDueDate={props.handleDueDate}
            implementationDate={props.implementationDate}
            dueDate={props.dueDate}
            todoContent={props.todoContent}
            handleTodoListItem={props.handleEditTodoListItem}
            closeInputTodoForm={props.handleCloseEditTodoForm}
            onClickCloseInputTodoForm={props.onClickCloseInputTodoForm}
            disabledButton={props.disabledButton}
            handleDeleteTodoListItem={props.handleDeleteTodoListItem}
            datePickersClassName={childDatePickersClassName}
            inputTodoRef={props.inputTodoRef}
          />
        </div>
      )}
    </>
  );
};

export default TodoListItemComponent;
