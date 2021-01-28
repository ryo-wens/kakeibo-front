import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import './add-todo-list-item-form.scss';
import TodoListItemFormContainer from '../../../../../containers/todo/modules/Form/TodoListItemFormContainer';

interface AddTodoListItemFormProps {
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  inputImplementationDate: (date: Date | null) => void;
  inputDueDate: (date: Date | null) => void;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openAddTodoForm: boolean;
  handleOpenAddTodoForm: () => void;
  handleCloseAddTodoForm: () => void;
  disabledButton: boolean;
  todoListItemOperation: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  inputTodoRef: React.RefObject<HTMLDivElement>;
  date: Date;
}

const AddTodoListItemForm = (props: AddTodoListItemFormProps) => {
  return (
    <>
      {!props.openAddTodoForm ? (
        <button
          className="add-todo-list-form__button"
          disabled={false}
          onClick={() => props.handleOpenAddTodoForm()}
        >
          <AddIcon />
          ToDoを追加
        </button>
      ) : (
        <div className="add-todo-list-form">
          <TodoListItemFormContainer
            titleLabel={'ToDoを追加'}
            buttonLabel={'追加'}
            handleTodoContentChange={props.handleTodoContentChange}
            inputImplementationDate={props.inputImplementationDate}
            inputDueDate={props.inputDueDate}
            implementationDate={props.implementationDate}
            dueDate={props.dueDate}
            todoContent={props.todoContent}
            todoListItemOperation={props.todoListItemOperation}
            disabledButton={props.disabledButton}
            closeInputTodoForm={props.handleCloseAddTodoForm}
            onClickCloseInputTodoForm={props.onClickCloseInputTodoForm}
            inputTodoRef={props.inputTodoRef}
          />
        </div>
      )}
    </>
  );
};

export default AddTodoListItemForm;
