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
import EditAssignmentTaskModal from '../../../../../../components/task/modules/area/taskTableArea/assignTaskTable/editAssignTaskModal/EditAssignTaskModal';
import { useFetchTaskToRelatedAll } from '../../../../../../hooks/task/useFetchTaskToRelatedAll';

interface EditAssignmentTaskModalContainerProps {
  participatingTaskUsers: TaskUsers;
  groupId: number;
  taskItem: TaskListItem;
}

const EditAssignmentTaskModalContainer = (props: EditAssignmentTaskModalContainerProps) => {
  const { participatingTaskUsers, groupId, taskItem } = props;

  const dispatch = useDispatch();
  const { fetchTaskToRelatedAll } = useFetchTaskToRelatedAll();

  const initialState: AssignmentTaskModalInitialState = {
    initialTaskItemId: taskItem.id,
    initialTaskName: taskItem.task_name,
    initialBaseDate: taskItem.base_date,
    initialCycleType: taskItem.cycle_type !== null ? taskItem.cycle_type : 'none',
    initialCycle: taskItem.cycle !== null ? taskItem.cycle : 0,
    initialUserId: taskItem.group_tasks_users_id !== null ? taskItem.group_tasks_users_id : 0,
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

  const handleChangeTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value as string);
  };

  const handleChangeDate = (selectedDate: Date | null) => {
    setBaseDate(selectedDate as Date);
  };

  const handleChangeCycleType = (event: React.ChangeEvent<{ value: string }>) => {
    setCycleType(event.target.value as TaskCycleType);
    if (event.target.value === 'none') {
      setCycle(Number(1));
    }
  };

  const handleChangeCycle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value))) {
      setMessage('※ 半角数字のみ入力可能です');
    } else {
      setCycle(Number(event.target.value));
      setMessage('');
    }
  };

  const handleChangeTaskUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTaskUserId(Number(event.target.value));
  };

  const handleEditAssignTaskItem = async () => {
    const requestData: EditTaskItemReq = {
      base_date: baseDate,
      cycle_type: cycleType,
      cycle: cycle,
      task_name: taskName,
      group_tasks_users_id: taskUserId,
    };

    try {
      await dispatch(editTaskItem(groupId, taskItemId, requestData));
      await fetchTaskToRelatedAll(groupId);

      setOpen(false);
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
  };

  const handleReleaseTaskItem = async () => {
    const requestData: EditTaskItemReq = {
      base_date: null,
      cycle_type: null,
      cycle: null,
      task_name: taskName,
      group_tasks_users_id: null,
    };

    try {
      await dispatch(editTaskItem(groupId, taskItemId, requestData));

      fetchTaskToRelatedAll(groupId);
    } catch (error) {
      alert(error.response.data.error.message.toString());
    }
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
      participatingTaskUsers={participatingTaskUsers}
      taskNameFormElement={
        <input
          id="filled-basic"
          required={true}
          type={'text'}
          value={taskName}
          onChange={handleChangeTaskName}
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
      handleChangeDate={handleChangeDate}
      handleChangeCycleType={handleChangeCycleType}
      handleChangeCycle={handleChangeCycle}
      handleChangeTaskUser={handleChangeTaskUser}
      handleEditAssignTaskItem={handleEditAssignTaskItem}
      disabledButton={disabledButton()}
      message={message}
      handleReleaseTaskItem={handleReleaseTaskItem}
    />
  );
};

export default EditAssignmentTaskModalContainer;
