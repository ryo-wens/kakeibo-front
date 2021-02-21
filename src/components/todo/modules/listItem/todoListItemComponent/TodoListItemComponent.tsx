import React from 'react';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import EditIcon from '@material-ui/icons/Edit';
import './todo-list-item-component.scss';
import TodoListItemFormContainer from '../../../../../containers/todo/modules/form/TodoListItemFormContainer';

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
  inputTodoClassName: string;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  inputTodoRef: React.RefObject<HTMLDivElement>;
}

const TodoListItemComponent = (props: TodoListItemComponentProps) => {
  const currentTextStyle = (completeFlag: boolean) => {
    if (completeFlag) {
      return { opacity: 0.3 };
    }
    return { opacity: 1.0 };
  };

  return (
    <>
      {!props.openEditTodoForm ? (
        <div className="todo-list-item-component">
          <label className="todo-list-item-component__check">
            <input type="checkbox" checked={props.checked} onChange={props.handleChangeChecked} />
            <span />
          </label>
          <span
            className="todo-list-item-component__content"
            style={currentTextStyle(props.checked)}
          >
            {props.listItem.todo_content}
          </span>
          <EditIcon
            className="todo-list-item-component__edit-icon"
            onClick={() => {
              props.handleOpenEditTodoForm();
            }}
          />
        </div>
      ) : (
        <div className={props.inputTodoClassName}>
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
            inputTodoRef={props.inputTodoRef}
          />
        </div>
      )}
    </>
  );
};

export default TodoListItemComponent;
