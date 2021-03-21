import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import styles from './AddTodoListItemForm.module.scss';
import TodoListItemFormContainer from '../../../../../containers/todo/modules/form/TodoListItemFormContainer';

interface AddTodoListItemFormProps {
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  handleImplementationDate: (date: Date | null) => void;
  handleDueDate: (date: Date | null) => void;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openAddTodoForm: boolean;
  handleOpenAddTodoForm: () => void;
  handleCloseAddTodoForm: () => void;
  disabledButton: boolean;
  handleAddTodoListItem: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  inputTodoRef: React.RefObject<HTMLDivElement>;
  date: Date;
}

const AddTodoListItemForm = (props: AddTodoListItemFormProps) => {
  return (
    <>
      {!props.openAddTodoForm ? (
        <button
          className={styles.btn}
          disabled={false}
          onClick={() => props.handleOpenAddTodoForm()}
        >
          <AddIcon />
          ToDoを追加
        </button>
      ) : (
        <div className={styles.wrapper}>
          <TodoListItemFormContainer
            titleLabel={'ToDoを追加'}
            buttonLabel={'追加'}
            handleTodoContentChange={props.handleTodoContentChange}
            handleImplementationDate={props.handleImplementationDate}
            handleDueDate={props.handleDueDate}
            implementationDate={props.implementationDate}
            dueDate={props.dueDate}
            todoContent={props.todoContent}
            handleTodoListItem={props.handleAddTodoListItem}
            disabledButton={props.disabledButton}
            closeInputTodoForm={props.handleCloseAddTodoForm}
            onClickCloseInputTodoForm={props.onClickCloseInputTodoForm}
            datePickersClassName={styles.childDatePickers}
            inputTodoRef={props.inputTodoRef}
          />
        </div>
      )}
    </>
  );
};

export default AddTodoListItemForm;
