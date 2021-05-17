import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import styles from './TodoListItemComponent.module.scss';
import TodoListItemFormContainer from '../../../../../containers/todo/modules/form/TodoListItemFormContainer';
import cn from 'classnames';

export interface TodoListItemComponentProps {
  openEditTodoForm: boolean;
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  checked: boolean;
  handleImplementationDate: (date: Date | null) => void;
  listItemTodoContent: string;
  handleDueDate: (date: Date | null) => void;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenEditTodoForm: () => void;
  handleCloseEditTodoForm: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  disabledButton: boolean;
  handleEditTodoListItem: () => void;
  handleDeleteTodoListItem: () => void;
  currentPage: string;
  formClassName?: string;
  inputTodoRef: React.RefObject<HTMLDivElement>;
}

const TodoListItemComponent = (props: TodoListItemComponentProps) => {
  const contentClassName = cn(styles.content, {
    [styles.complete]: props.checked,
  });

  const childDatePickersClassName = cn({
    [styles.childDatePickers]: props.currentPage !== 'home',
    [styles.childDatePickersCrHomePage]: props.currentPage === 'home',
  });

  return (
    <>
      {!props.openEditTodoForm ? (
        <li className={styles.wrapper} id={'list-item'}>
          <label className={styles.check}>
            <input type="checkbox" checked={props.checked} onChange={props.handleChangeChecked} />
            <span />
          </label>
          <span className={contentClassName}>{props.listItemTodoContent}</span>
          <EditIcon className={styles.editIcon} onClick={props.handleOpenEditTodoForm} />
        </li>
      ) : (
        <li className={props.formClassName} id={'form'}>
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
        </li>
      )}
    </>
  );
};

export default TodoListItemComponent;
