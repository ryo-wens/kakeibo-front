import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import AddTaskNameForm from '../../../../components/task/page/taskListArea/addTaskNameForm/AddTaskNameForm';
import { addTaskItem } from '../../../../reducks/groupTasks/operations';
import { AddTaskItemReq } from '../../../../reducks/groupTasks/types';
import { executeAfterAsyncProcess } from '../../../../lib/function';

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

  const handleAddTaskItem = () => {
    const requestData: AddTaskItemReq = {
      task_name: taskName,
    };

    return executeAfterAsyncProcess(dispatch(addTaskItem(Number(group_id), requestData)), () =>
      setOpenForm(false)
    );
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
      handleAddTaskItem={() => handleAddTaskItem()}
      inputTaskRef={inputTaskRef}
    />
  );
};

export default AddTaskNameFormContainer;
