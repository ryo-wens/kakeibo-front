import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import AddTaskNameForm from '../../../../components/task/modules/area/taskListArea/addTaskNameForm/AddTaskNameForm';
import { addTaskItem, fetchGroupTaskList } from '../../../../reducks/groupTasks/operations';
import { AddTaskItemReq } from '../../../../reducks/groupTasks/types';

const initialState = {
  initialTodoContent: '',
};

const AddTaskNameFormContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const inputTaskRef = useRef<HTMLDivElement>(null);

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>(initialState.initialTodoContent);

  const handleOpenInputTaskForm = () => {
    setOpenForm(true);
    setTaskName(initialState.initialTodoContent);
  };

  const handleCloseInputTaskForm = () => {
    setOpenForm(false);
  };

  const handleChangeTaskName = (event: React.ChangeEvent<{ value: string }>) => {
    setTaskName(event.target.value as string);
  };

  const onClickCloseInputTaskNameForm = (event: Event) => {
    if (inputTaskRef.current && !inputTaskRef.current.contains(event.target as Node)) {
      setOpenForm(false);
    }
  };

  const disabledButton = taskName === initialState.initialTodoContent;

  const handleAddTaskItem = async () => {
    const groupId = Number(group_id);

    const requestData: AddTaskItemReq = {
      task_name: taskName,
    };

    try {
      await dispatch(addTaskItem(groupId, requestData));
      await dispatch(fetchGroupTaskList(groupId));

      setOpenForm(false);
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  return (
    <AddTaskNameForm
      titleLabel={'タスクを追加'}
      buttonLabel={'追加'}
      openForm={openForm}
      handleChangeTaskName={handleChangeTaskName}
      disabledButton={disabledButton}
      taskName={taskName}
      handleOpenInputTaskForm={handleOpenInputTaskForm}
      handleCloseInputTaskForm={handleCloseInputTaskForm}
      onClickCloseInputTaskNameForm={onClickCloseInputTaskNameForm}
      handleAddTaskItem={handleAddTaskItem}
      inputTaskRef={inputTaskRef}
    />
  );
};

export default AddTaskNameFormContainer;
