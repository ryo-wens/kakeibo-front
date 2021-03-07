import React, { useEffect } from 'react';
import TodoListItemForm from '../../../../components/todo/modules/form/todoListItemForm/TodoListItemForm';

interface TodoListItemFormContainerProps {
  titleLabel: string;
  buttonLabel: string;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImplementationDate: (date: Date | null) => void;
  handleDueDate: (date: Date | null) => void;
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  handleTodoListItem: () => void;
  disabledButton: boolean;
  closeInputTodoForm: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  datePickersClassName: string;
  inputTodoRef: React.RefObject<HTMLDivElement>;
  handleDeleteTodoListItem?: () => void;
}

const TodoListItemFormContainer = (props: TodoListItemFormContainerProps) => {
  useEffect(() => {
    document.addEventListener('click', props.onClickCloseInputTodoForm, { capture: true });
    return () => {
      document.removeEventListener('click', props.onClickCloseInputTodoForm, { capture: true });
    };
  }, [props.onClickCloseInputTodoForm]);

  return (
    <TodoListItemForm
      titleLabel={props.titleLabel}
      buttonLabel={props.buttonLabel}
      handleTodoContentChange={props.handleTodoContentChange}
      handleImplementationDate={props.handleImplementationDate}
      handleDueDate={props.handleDueDate}
      implementationDate={props.implementationDate}
      dueDate={props.dueDate}
      todoContent={props.todoContent}
      handleTodoListItem={props.handleTodoListItem}
      disabledButton={props.disabledButton}
      closeInputTodoForm={props.closeInputTodoForm}
      onClickCloseInputTodoForm={props.onClickCloseInputTodoForm}
      datePickersClassName={props.datePickersClassName}
      handleDeleteTodoListItem={props.handleDeleteTodoListItem}
      ref={props.inputTodoRef}
    />
  );
};

export default TodoListItemFormContainer;
