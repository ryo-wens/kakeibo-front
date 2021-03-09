import React, { useEffect } from 'react';
import InputTaskNameForm from '../../../../components/task/modules/form/inputTaskNameForm/InputTaskNameForm';

interface InputTaskNameFormContainerProps {
  titleLabel: string;
  buttonLabel: string;
  taskName: string;
  handleTaskNameChange: (event: React.ChangeEvent<{ value: string }>) => void;
  disabledButton: boolean;
  handleCloseInputTaskForm: () => void;
  handleTaskItem: () => void;
  inputTaskRef: React.RefObject<HTMLDivElement>;
  onClickCloseInputTaskNameForm: (event: Event) => void;
  handleDeleteTaskItem?: () => void;
}

const InputTaskNameFormContainer = (props: InputTaskNameFormContainerProps) => {
  useEffect(() => {
    document.addEventListener('click', props.onClickCloseInputTaskNameForm, { capture: true });

    return () => {
      document.removeEventListener('click', props.onClickCloseInputTaskNameForm, { capture: true });
    };
  }, [props.onClickCloseInputTaskNameForm]);

  return (
    <InputTaskNameForm
      titleLabel={props.titleLabel}
      buttonLabel={props.buttonLabel}
      taskName={props.taskName}
      handleTaskNameChange={props.handleTaskNameChange}
      disabledButton={props.disabledButton}
      handleCloseInputTaskForm={props.handleCloseInputTaskForm}
      handleTaskItem={props.handleTaskItem}
      handleDeleteTaskItem={props.handleDeleteTaskItem}
      onClickCloseInputTaskNameForm={props.onClickCloseInputTaskNameForm}
      ref={props.inputTaskRef}
    />
  );
};

export default InputTaskNameFormContainer;
