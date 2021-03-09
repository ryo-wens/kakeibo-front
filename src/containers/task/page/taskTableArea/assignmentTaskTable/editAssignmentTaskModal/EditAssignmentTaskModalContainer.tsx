import React, { useState } from 'react';
import {
  AssignmentTaskModalInitialState,
  EditTaskItemReq,
  TaskCycleType,
  TaskListItem,
  TaskUsers,
} from '../../../../../../reducks/groupTasks/types';
import { useDispatch } from 'react-redux';
import { editTaskItem } from '../../../../../../reducks/groupTasks/operations';
import EditAssignmentTaskModal from '../../../../../../components/task/page/taskTableArea/assignmentTaskTable/editAssignmentTaskModal/EditAssignmentTaskModal';
import { executeAfterAsyncProcess } from '../../../../../../lib/function';

interface EditAssignmentTaskModalContainerProps {
  participatingTaskUsers: TaskUsers;
  groupId: number;
  taskItem: TaskListItem;
}

const EditAssignmentTaskModalContainer = (props: EditAssignmentTaskModalContainerProps) => {
  const dispatch = useDispatch();

  const initialState: AssignmentTaskModalInitialState = {
    initialTaskItemId: props.taskItem.id,
    initialTaskName: props.taskItem.task_name,
    initialBaseDate: props.taskItem.base_date,
    initialCycleType: props.taskItem.cycle_type !== null ? props.taskItem.cycle_type : 'none',
    initialCycle: props.taskItem.cycle !== null ? props.taskItem.cycle : 0,
    initialUserId:
      props.taskItem.group_tasks_users_id !== null ? props.taskItem.group_tasks_users_id : 0,
  };

  const [open, setOpen] = useState<boolean>(false);
  const [taskItemId, setTaskItemId] = useState<number>(initialState.initialTaskItemId);
  const [taskName, setTaskName] = useState<string>(initialState.initialTaskName);
  const [baseDate, setBaseDate] = useState<Date | null>(initialState.initialBaseDate);
  const [cycleType, setCycleType] = useState<TaskCycleType>(initialState.initialCycleType);
  const [cycle, setCycle] = useState<number>(initialState.initialCycle);
  const [taskUserId, setTaskUserId] = useState<number>(initialState.initialUserId);
  const [message, setMessage] = useState<string>('');

  const handleOpenModal = () => {
    setOpen(true);
    setTaskItemId(initialState.initialTaskItemId);
    setTaskName(initialState.initialTaskName);
    setBaseDate(initialState.initialBaseDate);
    setCycleType(initialState.initialCycleType);
    setCycle(initialState.initialCycle);
    setTaskUserId(initialState.initialUserId);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const inputTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value as string);
  };

  const handleDateChange = (selectedDate: Date | null) => {
    setBaseDate(selectedDate as Date);
  };

  const handleCycleTypeChange = (event: React.ChangeEvent<{ value: string }>) => {
    setCycleType(event.target.value as TaskCycleType);
    if (event.target.value === 'none') {
      setCycle(Number(1));
    }
  };

  const handleCycleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value))) {
      setMessage('※ 半角数字のみ入力可能です');
    } else {
      setCycle(Number(event.target.value));
      setMessage('');
    }
  };

  const handleTaskUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTaskUserId(Number(event.target.value));
  };

  const handleEditAssignTaskItem = () => {
    const requestData: EditTaskItemReq = {
      base_date: baseDate,
      cycle_type: cycleType,
      cycle: cycle,
      task_name: taskName,
      group_tasks_users_id: taskUserId,
    };

    return executeAfterAsyncProcess(
      dispatch(editTaskItem(props.groupId, taskItemId, requestData)),
      () => setOpen(false)
    );
  };

  const handleReleaseTaskItem = () => {
    const requestData: EditTaskItemReq = {
      base_date: null,
      cycle_type: null,
      cycle: null,
      task_name: 'dd',
      group_tasks_users_id: null,
    };

    return executeAfterAsyncProcess(dispatch(editTaskItem(props.groupId, taskItemId, requestData)));
  };

  const disabledButton = () => {
    if (
      taskItemId === initialState.initialTaskItemId &&
      taskName === initialState.initialTaskName &&
      baseDate === initialState.initialBaseDate &&
      cycleType === initialState.initialCycleType &&
      cycle === initialState.initialCycle &&
      taskUserId === initialState.initialUserId
    ) {
      return true;
    } else if (taskItemId === 0 || taskName === '' || cycle === 0 || taskUserId === 0) {
      return true;
    }
    return false;
  };

  return (
    <EditAssignmentTaskModal
      participatingTaskUsers={props.participatingTaskUsers}
      taskNameFormElement={
        <input
          id="filled-basic"
          required={true}
          type={'text'}
          value={taskName}
          onChange={inputTaskName}
        />
      }
      initialTaskName={initialState.initialTaskName}
      open={open}
      baseDate={baseDate}
      cycleType={cycleType}
      cycle={cycle}
      taskUserId={taskUserId}
      handleOpenModal={handleOpenModal}
      handleCloseModal={handleCloseModal}
      handleDateChange={handleDateChange}
      handleCycleTypeChange={handleCycleTypeChange}
      handleCycleChange={handleCycleChange}
      handleTaskUserChange={handleTaskUserChange}
      handleEditAssignTaskItem={() => handleEditAssignTaskItem()}
      disabledButton={disabledButton()}
      message={message}
      handleReleaseTaskItem={() => handleReleaseTaskItem()}
    />
  );
};

export default EditAssignmentTaskModalContainer;
