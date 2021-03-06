import React, { useEffect } from 'react';
import InputTaskNameForm from '../../../../components/task/modules/form/inputTaskNameForm/InputTaskNameForm';

interface InputTaskNameFormContainerProps {
  titleLabel: string;
  buttonLabel: string;
  taskName: string;
  handleTaskNameChange: (event: React.ChangeEvent<{ value: string }>) => void;
  disabledButton: boolean;
  closeInputTaskForm: () => void;
  taskNameOperation: () => void;
  onClickCloseInputTaskNameForm: (event: Event) => void;
  inputTaskRef: React.RefObject<HTMLDivElement>;
  deleteOperation?: () => void;
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
      closeInputTaskForm={props.closeInputTaskForm}
      taskNameOperation={props.taskNameOperation}
      deleteOperation={props.deleteOperation}
      ref={props.inputTaskRef}
    />
  );
};

export default InputTaskNameFormContainer;
