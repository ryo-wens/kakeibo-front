import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TasksListItem } from '../../../../reducks/groupTasks/types';
import TaskListItemComponent from '../../../../components/task/modules/listItem/TaskListItemComponent/TaskListItemComponent';
import { deleteTaskItem, editTaskItem } from '../../../../reducks/groupTasks/operations';

interface TaskListItemComponentContainerProps {
  listItem: TasksListItem;
}

const TaskListItemComponentContainer = (props: TaskListItemComponentContainerProps) => {
  const initialState = {
    initialTaskName: props.listItem.task_name,
  };

  const dispatch = useDispatch();
  const inputTaskRef = useRef<HTMLDivElement>(null);

  const [openForm, setOpenForm] = useState(false);
  const [taskName, setTaskName] = useState<string>(initialState.initialTaskName);

  const openEditInputTask = () => {
    setOpenForm(true);
  };

  const closeEditInputTask = () => {
    setOpenForm(false);
    setTaskName(initialState.initialTaskName);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<{ value: string }>) => {
    setTaskName(event.target.value as string);
  };

  const onClickCloseInputTaskNameForm = (event: Event) => {
    if (inputTaskRef.current && !inputTaskRef.current.contains(event.target as Node)) {
      closeEditInputTask();
    }
  };

  const disabledButton = taskName === initialState.initialTaskName || taskName === '';

  return (
    <TaskListItemComponent
      titleLabel={'タスク名を編集'}
      buttonLabel={'保存'}
      openForm={openForm}
      handleTaskNameChange={handleTaskNameChange}
      initialTaskName={initialState.initialTaskName}
      taskName={taskName}
      openInputTaskForm={openEditInputTask}
      closeInputTaskForm={closeEditInputTask}
      disabledButton={disabledButton}
      onClickCloseInputTaskNameForm={onClickCloseInputTaskNameForm}
      taskNameOperation={() => {
        dispatch(
          editTaskItem(
            props.listItem.group_id,
            props.listItem.id,
            props.listItem.base_date,
            props.listItem.cycle_type,
            props.listItem.cycle,
            taskName,
            props.listItem.group_tasks_users_id
          )
        );
        setOpenForm(false);
      }}
      deleteOperation={() => {
        dispatch(deleteTaskItem(props.listItem.group_id, props.listItem.id));
        setOpenForm(false);
      }}
      inputTaskRef={inputTaskRef}
    />
  );
};

export default TaskListItemComponentContainer;
