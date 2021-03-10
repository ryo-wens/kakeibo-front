import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditTaskItemReq, TaskListItem } from '../../../../reducks/groupTasks/types';
import TaskListItemComponent from '../../../../components/task/modules/listItem/TaskListItemComponent/TaskListItemComponent';
import { deleteTaskItem, editTaskItem } from '../../../../reducks/groupTasks/operations';
import { executeAfterAsyncProcess } from '../../../../lib/function';

interface TaskListItemComponentContainerProps {
  listItem: TaskListItem;
  handleStopPolling: (value: boolean) => void;
}

const TaskListItemComponentContainer = (props: TaskListItemComponentContainerProps) => {
  const initialState = {
    initialTaskName: props.listItem.task_name,
  };

  const dispatch = useDispatch();
  const inputTaskRef = useRef<HTMLDivElement>(null);

  const [openForm, setOpenForm] = useState(false);
  const [taskName, setTaskName] = useState<string>(initialState.initialTaskName);

  const handleOpenInputTaskForm = () => {
    setOpenForm(true);
    props.handleStopPolling(true);
  };

  const handleCloseInputTaskForm = () => {
    setOpenForm(false);
    setTaskName(initialState.initialTaskName);
    props.handleStopPolling(false);
  };

  const handleChangeTaskName = (event: React.ChangeEvent<{ value: string }>) => {
    setTaskName(event.target.value as string);
  };

  const onClickCloseInputTaskNameForm = (event: Event) => {
    if (inputTaskRef.current && !inputTaskRef.current.contains(event.target as Node)) {
      handleCloseInputTaskForm();
    }
  };

  const handleEditTaskItem = () => {
    const requestData: EditTaskItemReq = {
      base_date: props.listItem.base_date,
      cycle_type: props.listItem.cycle_type,
      cycle: props.listItem.cycle,
      task_name: taskName,
      group_tasks_users_id: props.listItem.group_tasks_users_id,
    };

    return executeAfterAsyncProcess(
      dispatch(editTaskItem(props.listItem.group_id, props.listItem.id, requestData)),
      () => setOpenForm(false)
    );
  };

  const handleDeleteTaskItem = () => {
    return executeAfterAsyncProcess(
      dispatch(deleteTaskItem(props.listItem.group_id, props.listItem.id))
    );
  };

  const disabledButton = taskName === initialState.initialTaskName || taskName === '';

  return (
    <TaskListItemComponent
      titleLabel={'タスク名を編集'}
      buttonLabel={'保存'}
      openForm={openForm}
      handleChangeTaskName={handleChangeTaskName}
      initialTaskName={initialState.initialTaskName}
      taskName={taskName}
      handleOpenInputTaskForm={handleOpenInputTaskForm}
      handleCloseInputTaskForm={handleCloseInputTaskForm}
      disabledButton={disabledButton}
      onClickCloseInputTaskNameForm={onClickCloseInputTaskNameForm}
      handleEditTaskItem={() => handleEditTaskItem()}
      handleDeleteTaskItem={() => handleDeleteTaskItem()}
      inputTaskRef={inputTaskRef}
    />
  );
};

export default TaskListItemComponentContainer;
