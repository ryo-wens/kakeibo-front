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
  disabledButton: boolean;
  handleOpenInputTaskForm: () => void;
  handleCloseInputTaskForm: () => void;
  onClickCloseInputTaskNameForm: (event: Event) => void;
  handleAddTaskItem: () => void;
  inputTaskRef: React.RefObject<HTMLDivElement>;
}

const AddTaskNameForm = (props: AddTaskNameFormProps) => {
  return (
    <>
      {!props.openForm ? (
        <button className="add-task-name-form__btn" onClick={() => props.handleOpenInputTaskForm()}>
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
          handleCloseInputTaskForm={props.handleCloseInputTaskForm}
          handleTaskItem={props.handleAddTaskItem}
          onClickCloseInputTaskNameForm={props.onClickCloseInputTaskNameForm}
          inputTaskRef={props.inputTaskRef}
        />
      )}
    </>
  );
};

export default AddTaskNameForm;
