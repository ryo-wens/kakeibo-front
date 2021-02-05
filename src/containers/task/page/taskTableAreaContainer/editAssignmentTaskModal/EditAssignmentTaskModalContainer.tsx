import React, { useState } from 'react';
import {
  AssignmentTaskModalInitialState,
  TaskCycleType,
  TasksListItem,
} from '../../../../../reducks/groupTasks/types';
import { Group } from '../../../../../reducks/groups/types';
import { useDispatch } from 'react-redux';
import { editTaskItem } from '../../../../../reducks/groupTasks/operations';
import EditAssignmentTaskModal from '../../../../../components/task/editAssignmentTaskModal/EditAssignmentTaskModal';

interface EditAssignmentTaskModalContainerProps {
  approvedGroup: Group;
  groupId: number;
  taskItem: TasksListItem;
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

  const openModal = () => {
    setOpen(true);
    setTaskItemId(initialState.initialTaskItemId);
    setTaskName(initialState.initialTaskName);
    setBaseDate(initialState.initialBaseDate);
    setCycleType(initialState.initialCycleType);
    setCycle(initialState.initialCycle);
    setTaskUserId(initialState.initialUserId);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const inputTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value as string);
  };

  const handleDateChange = (selectedDate: Date | null) => {
    setBaseDate(selectedDate as Date);
  };

  const selectCycleType = (event: React.ChangeEvent<{ value: string }>) => {
    setCycleType(event.target.value as 'every' | 'consecutive' | 'none');
    if (event.target.value === 'none') {
      setCycle(Number(1));
    }
  };

  const inputTaskCycle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(event.target.value))) {
      setMessage('※ 半角数字のみ入力可能です');
    } else {
      setCycle(Number(event.target.value));
      setMessage('');
    }
  };

  const selectTaskUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTaskUserId(Number(event.target.value));
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
      approvedGroup={props.approvedGroup}
      groupId={props.groupId}
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
      taskItemId={taskItemId}
      taskName={taskName}
      baseDate={baseDate}
      cycleType={cycleType}
      cycle={cycle}
      taskUserId={taskUserId}
      openModal={openModal}
      handleDateChange={handleDateChange}
      selectCycleType={selectCycleType}
      inputTaskCycle={inputTaskCycle}
      selectTaskUser={selectTaskUser}
      assignmentTask={() => {
        dispatch(
          editTaskItem(props.groupId, taskItemId, baseDate, cycleType, cycle, taskName, taskUserId)
        );
        setOpen(false);
      }}
      closeModal={closeModal}
      disabledButton={disabledButton()}
      message={message}
      releaseAssignmentTask={() => {
        dispatch(editTaskItem(props.groupId, taskItemId, null, null, null, taskName, null));
        setOpen(false);
      }}
    />
  );
};

export default EditAssignmentTaskModalContainer;
