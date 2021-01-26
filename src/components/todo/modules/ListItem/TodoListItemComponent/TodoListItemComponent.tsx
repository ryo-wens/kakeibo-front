import React from 'react';
import { InputTodoList } from '../../../index';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import { GroupTodoListItem } from '../../../../../reducks/groupTodoList/types';
import EditIcon from '@material-ui/icons/Edit';
import './todo-list-item-component.scss';

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
  pathName: string;
  group_id: number;
  listItem: TodoListItem | GroupTodoListItem;
  selectedDate: Date | null;
  currentYearMonth: string;
  handleOpenEditTodoForm: () => void;
  handleCloseEditTodoForm: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  disabledButton: boolean;
  todoListItemOperation: () => void;
  inputTodoRef: React.RefObject<HTMLDivElement>;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
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
            <span className="todo-list-item-component__content">{props.listItem.todo_content}</span>
            <EditIcon
              className="todo-list-item-component__edit-icon"
              onClick={() => {
                props.handleOpenEditTodoForm();
              }}
            />
          </div>
        </>
      ) : (
        <InputTodoList
          buttonLabel={'保存'}
          handleTodoContentChange={props.handleTodoContentChange}
          inputImplementationDate={props.inputImplementationDate}
          inputDueDate={props.inputDueDate}
          todoListItemId={props.listItem.id}
          selectedDate={props.selectedDate}
          implementationDate={props.implementationDate}
          dueDate={props.dueDate}
          todoContent={props.todoContent}
          completeFlag={props.checked}
          todoListItemOperation={props.todoListItemOperation}
          closeInputTodoForm={props.handleCloseEditTodoForm}
          onClickCloseInputTodoForm={props.onClickCloseInputTodoForm}
          disabledButton={props.disabledButton}
          ref={props.inputTodoRef}
        />
      )}
    </>
  );
};

export default TodoListItemComponent;
