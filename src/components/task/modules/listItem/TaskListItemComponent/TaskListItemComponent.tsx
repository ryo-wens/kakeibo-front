import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import './task-list-item-component.scss';
import InputTaskNameFormContainer from '../../../../../containers/task/modules/form/InputTaskNameFormContainer';

interface TaskListItemComponentProps {
  titleLabel: string;
  buttonLabel: string;
  openForm: boolean;
  initialTaskName: string;
  taskName: string;
  handleTaskNameChange: (event: React.ChangeEvent<{ value: string }>) => void;
  openInputTaskForm: () => void;
  closeInputTaskForm: () => void;
  disabledButton: boolean;
  taskNameOperation: () => void;
  deleteOperation: () => void;
  onClickCloseInputTaskNameForm: (event: Event) => void;
  inputTaskRef: React.RefObject<HTMLDivElement>;
}

const TaskListItemComponent = (props: TaskListItemComponentProps) => {
  return (
    <>
      {!props.openForm ? (
        <li className="task-list-item-component">
          <span className="task-list-item-component__text">{props.initialTaskName}</span>
          <EditIcon
            className="task-list-item-component__edit-icon"
            onClick={() => props.openInputTaskForm()}
          />
        </li>
      ) : (
        <InputTaskNameFormContainer
          titleLabel={props.titleLabel}
          buttonLabel={props.buttonLabel}
          handleTaskNameChange={props.handleTaskNameChange}
          disabledButton={props.disabledButton}
          taskName={props.taskName}
          closeInputTaskForm={props.closeInputTaskForm}
          taskNameOperation={props.taskNameOperation}
          deleteOperation={props.deleteOperation}
          onClickCloseInputTaskNameForm={props.onClickCloseInputTaskNameForm}
          inputTaskRef={props.inputTaskRef}
        />
      )}
    </>
  );
};

export default TaskListItemComponent;
