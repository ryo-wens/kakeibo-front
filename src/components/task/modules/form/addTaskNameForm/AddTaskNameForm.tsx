import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import './add-task-name-form.scss';
import InputTaskNameFormContainer from '../../../../../containers/task/modules/form/InputTaskNameFormContainer';

interface AddTaskNameFormProps {
  titleLabel: string;
  buttonLabel: string;
  openForm: boolean;
  taskName: string;
  handleTaskNameChange: (event: React.ChangeEvent<{ value: string }>) => void;
  openInputTaskForm: () => void;
  closeInputTaskForm: () => void;
  disabledButton: boolean;
  taskNameOperation: () => void;
  onClickCloseInputTaskNameForm: (event: Event) => void;
  inputTaskRef: React.RefObject<HTMLDivElement>;
}

const AddTaskNameForm = (props: AddTaskNameFormProps) => {
  return (
    <>
      {!props.openForm ? (
        <button className="add-task-name-form__btn" onClick={() => props.openInputTaskForm()}>
          <AddIcon />
          タスクを追加
        </button>
      ) : (
        <InputTaskNameFormContainer
          titleLabel={'タスクを追加'}
          buttonLabel={'追加'}
          handleTaskNameChange={props.handleTaskNameChange}
          disabledButton={props.disabledButton}
          taskName={props.taskName}
          closeInputTaskForm={props.closeInputTaskForm}
          taskNameOperation={props.taskNameOperation}
          onClickCloseInputTaskNameForm={props.onClickCloseInputTaskNameForm}
          inputTaskRef={props.inputTaskRef}
        />
      )}
    </>
  );
};

export default AddTaskNameForm;
