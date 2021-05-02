import React, { useState } from 'react';
import {
  AssignmentTaskModalInitialState,
  EditTaskItemReq,
  TaskCycleType,
  TaskUsers,
} from '../../../../../reducks/groupTasks/types';
import { date } from '../../../../../lib/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupTaskList } from '../../../../../reducks/groupTasks/selectors';
import AssignTaskModal from '../../../../../components/task/modules/area/taskTableArea/assignTaskModal/AssignTaskModal';
import SelectTaskName from '../../../../../components/task/modules/select/SelectTaskName';
import { editTaskItem } from '../../../../../reducks/groupTasks/operations';
import { useFetchTaskToRelatedAll } from '../../../../../hooks/task/useFetchTaskToRelatedAll';

interface AssignmentTaskModalContainerProps {
  participatingTaskUsers: TaskUsers;
  groupId: number;
}

const initialState: AssignmentTaskModalInitialState = {
  initialTaskItemId: 0,
  initialTaskName: '',
  initialBaseDate: date,
  initialCycleType: 'every',
  initialCycle: 1,
  initialUserId: 0,
};

const AssignmentTaskModalContainer = (props: AssignmentTaskModalContainerProps) => {
  const dispatch = useDispatch();
  const taskList = useSelector(getGroupTaskList);

  const { fetchTaskToRelatedAll } = useFetchTaskToRelatedAll();

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

  const handleChangeDate = (selectedDate: Date | null) => {
    setBaseDate(selectedDate as Date);
  };

  const handleChangeTaskName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== String(0)) {
      const idx = taskList.findIndex(
        (taskListItem) => taskListItem.id === Number(event.target.value)
      );
      setTaskName(taskList[idx].task_name);
    } else if (event.target.value === String(0)) {
      setTaskName('');
    }
    setTaskItemId(Number(event.target.value));
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

  const handleAssignTaskItem = async () => {
    const groupId = props.groupId;

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

  const disabledButton =
    taskItemId === initialState.initialTaskItemId ||
    taskName === initialState.initialTaskName ||
    cycle === 0 ||
    taskUserId === initialState.initialUserId;

  return (
    <AssignTaskModal
      participatingTaskUsers={props.participatingTaskUsers}
      taskNameFormElement={
        <SelectTaskName handleChangeTaskName={handleChangeTaskName} groupTasksList={taskList} />
      }
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
      handleAssignTaskItem={handleAssignTaskItem}
      disabledButton={disabledButton}
      message={message}
    />
  );
};

export default AssignmentTaskModalContainer;
