import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Action, Dispatch } from 'redux';
import { State } from '../../../../reducks/store/types';
import TodoListItemForm from '../../../../components/todo/modules/Form/todoListItemForm/TodoListItemForm';

interface TodoListItemFormContainerProps {
  titleLabel: string;
  buttonLabel: string;
  handleTodoContentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputImplementationDate: (date: Date | null) => void;
  inputDueDate: (date: Date | null) => void;
  implementationDate: Date | null;
  dueDate: Date | null;
  todoContent: string;
  todoListItemOperation: () => void;
  disabledButton: boolean;
  closeInputTodoForm: () => void;
  onClickCloseInputTodoForm: (event: Event) => void;
  inputTodoRef: React.RefObject<HTMLDivElement>;
  deleteOperation?: (dispatch: Dispatch<Action>, getState: () => State) => Promise<void>;
}

const TodoListItemFormContainer = (props: TodoListItemFormContainerProps) => {
  const pathName = useLocation().pathname.split('/').slice(-1)[0];

  useEffect(() => {
    document.addEventListener('click', props.onClickCloseInputTodoForm);
    return () => {
      document.removeEventListener('click', props.onClickCloseInputTodoForm);
    };
  }, [props.onClickCloseInputTodoForm]);

  return (
    <TodoListItemForm
      titleLabel={props.titleLabel}
      buttonLabel={props.buttonLabel}
      handleTodoContentChange={props.handleTodoContentChange}
      inputImplementationDate={props.inputImplementationDate}
      inputDueDate={props.inputDueDate}
      implementationDate={props.implementationDate}
      dueDate={props.dueDate}
      todoContent={props.todoContent}
      todoListItemOperation={props.todoListItemOperation}
      disabledButton={props.disabledButton}
      closeInputTodoForm={props.closeInputTodoForm}
      onClickCloseInputTodoForm={props.onClickCloseInputTodoForm}
      pathName={pathName}
      deleteOperation={props.deleteOperation}
      ref={props.inputTodoRef}
    />
  );
};

export default TodoListItemFormContainer;
