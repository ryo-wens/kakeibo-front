import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditTaskItemReq, TaskListItem } from '../../../../reducks/groupTasks/types';
import TaskListItemComponent from '../../../../components/task/modules/listItem/TaskListItemComponent/TaskListItemComponent';
import {
  deleteTaskItem,
  editTaskItem,
  fetchGroupTaskList,
} from '../../../../reducks/groupTasks/operations';

interface TaskListItemComponentContainerProps {
  listItem: TaskListItem;
  handleStopPolling: (value: boolean) => void;
  listItemClassName?: string;
  formClassName?: string;
}

const TaskListItemComponentContainer = (props: TaskListItemComponentContainerProps) => {
  const initialState = {
    initialTaskName: props.listItem.task_name,
  };

  const dispatch = useDispatch();
  const inputTaskRef = useRef<HTMLDivElement>(null);
  const groupId = props.listItem.group_id;

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

  const handleEditTaskItem = async () => {
    const requestData: EditTaskItemReq = {
      base_date: props.listItem.base_date,
      cycle_type: props.listItem.cycle_type,
      cycle: props.listItem.cycle,
      task_name: taskName,
      group_tasks_users_id: props.listItem.group_tasks_users_id,
    };

    try {
      await dispatch(editTaskItem(groupId, props.listItem.id, requestData));
      await dispatch(fetchGroupTaskList(groupId));

      setOpenForm(false);
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  const handleDeleteTaskItem = async () => {
    try {
      await dispatch(deleteTaskItem(props.listItem.group_id, props.listItem.id));

      dispatch(fetchGroupTaskList(groupId));
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
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
      handleEditTaskItem={handleEditTaskItem}
      handleDeleteTaskItem={handleDeleteTaskItem}
      inputTaskRef={inputTaskRef}
      listItemClassName={props.listItemClassName}
      formClassName={props.formClassName}
    />
  );
};

export default TaskListItemComponentContainer;
