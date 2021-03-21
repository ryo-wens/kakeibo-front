import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import styles from './TaskListItemComponent.module.scss';
import InputTaskNameFormContainer from '../../../../../containers/task/modules/form/InputTaskNameFormContainer';
import cn from 'classnames';

interface TaskListItemComponentProps {
  titleLabel: string;
  buttonLabel: string;
  openForm: boolean;
  initialTaskName: string;
  taskName: string;
  handleChangeTaskName: (event: React.ChangeEvent<{ value: string }>) => void;
  handleOpenInputTaskForm: () => void;
  handleCloseInputTaskForm: () => void;
  disabledButton: boolean;
  handleEditTaskItem: () => void;
  handleDeleteTaskItem: () => void;
  onClickCloseInputTaskNameForm: (event: Event) => void;
  inputTaskRef: React.RefObject<HTMLDivElement>;
  listItemClassName?: string;
  formClassName?: string;
}

const TaskListItemComponent = (props: TaskListItemComponentProps) => {
  return (
    <>
      {!props.openForm ? (
        <li className={cn(styles.wrapper, props.listItemClassName)}>
          <span className={styles.text}>{props.initialTaskName}</span>
          <EditIcon className={styles.editIcon} onClick={props.handleOpenInputTaskForm} />
        </li>
      ) : (
        <InputTaskNameFormContainer
          titleLabel={props.titleLabel}
          buttonLabel={props.buttonLabel}
          handleChangeTaskName={props.handleChangeTaskName}
          disabledButton={props.disabledButton}
          taskName={props.taskName}
          handleCloseInputTaskForm={props.handleCloseInputTaskForm}
          handleTaskItem={props.handleEditTaskItem}
          onClickCloseInputTaskNameForm={props.onClickCloseInputTaskNameForm}
          inputTaskRef={props.inputTaskRef}
          handleDeleteTaskItem={props.handleDeleteTaskItem}
          formClassName={props.formClassName}
        />
      )}
    </>
  );
};

export default TaskListItemComponent;
