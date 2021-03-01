import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import AddTaskNameForm from '../../../../components/task/page/taskListArea/addTaskNameForm/AddTaskNameForm';
import { addTaskItem } from '../../../../reducks/groupTasks/operations';

const initialState = {
  initialTodoContent: '',
};

const AddTaskNameFormContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const inputTaskRef = useRef<HTMLDivElement>(null);

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>(initialState.initialTodoContent);

  const openAddInputTask = () => {
    setOpenForm(true);
    setTaskName(initialState.initialTodoContent);
  };

  const closeAddInputTask = () => {
    setOpenForm(false);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<{ value: string }>) => {
    setTaskName(event.target.value as string);
  };

  const onClickCloseInputTaskNameForm = (event: Event) => {
    if (inputTaskRef.current && !inputTaskRef.current.contains(event.target as Node)) {
      setOpenForm(false);
    }
  };

  const disabledButton = taskName === initialState.initialTodoContent;

  return (
    <AddTaskNameForm
      titleLabel={'タスクを追加'}
      buttonLabel={'追加'}
      openForm={openForm}
      handleTaskNameChange={handleTaskNameChange}
      disabledButton={disabledButton}
      taskName={taskName}
      openInputTaskForm={openAddInputTask}
      closeInputTaskForm={closeAddInputTask}
      onClickCloseInputTaskNameForm={onClickCloseInputTaskNameForm}
      taskNameOperation={() => {
        dispatch(addTaskItem(Number(group_id), taskName));
        setOpenForm(false);
      }}
      inputTaskRef={inputTaskRef}
    />
  );
};

export default AddTaskNameFormContainer;
