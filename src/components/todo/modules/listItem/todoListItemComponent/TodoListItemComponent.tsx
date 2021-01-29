import React from 'react';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import { GroupTodoListItem } from '../../../../../reducks/groupTodoList/types';
import EditIcon from '@material-ui/icons/Edit';
import './todo-list-item-component.scss';
import TodoListItemFormContainer from '../../../../../containers/todo/modules/form/TodoListItemFormContainer';

interface TodoListItemComponentProps {
  openEditTodoForm: boolean;
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  checked: boolean;
  inputImplementationDate: (date: Date | null) => void;
  inputDueDate: (date: Date | null) => void;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  listItem: TodoListItem | GroupTodoListItem;
  handleOpenEditTodoForm: () => void;
  handleCloseEditTodoForm: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  disabledButton: boolean;
  todoListItemOperation: () => void;
  deleteOperation: () => void;
  inputTodoClassName: string;
  currentTextStyle: (completeFlag: boolean) => React.CSSProperties;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  inputTodoRef: React.RefObject<HTMLDivElement>;
}

const TodoListItemComponent = (props: TodoListItemComponentProps) => {
  return (
    <>
      {!props.openEditTodoForm ? (
        <>
          <div className="todo-list-item-component">
            <label className="todo-list-item-component__check">
              <input type="checkbox" checked={props.checked} onChange={props.handleChangeChecked} />
              <span />
            </label>
            <span
              className="todo-list-item-component__content"
              style={props.currentTextStyle(props.checked)}
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
        </>
      ) : (
        <div className={props.inputTodoClassName}>
          <TodoListItemFormContainer
            titleLabel={'ToDoを編集'}
            buttonLabel={'保存'}
            handleTodoContentChange={props.handleTodoContentChange}
            inputImplementationDate={props.inputImplementationDate}
            inputDueDate={props.inputDueDate}
            implementationDate={props.implementationDate}
            dueDate={props.dueDate}
            todoContent={props.todoContent}
            todoListItemOperation={props.todoListItemOperation}
            closeInputTodoForm={props.handleCloseEditTodoForm}
            onClickCloseInputTodoForm={props.onClickCloseInputTodoForm}
            disabledButton={props.disabledButton}
            deleteOperation={props.deleteOperation}
            inputTodoRef={props.inputTodoRef}
          />
        </div>
      )}
    </>
  );
};

export default TodoListItemComponent;
