import React, { useState } from 'react';
import {
  AssignmentTaskModalInitialState,
  TaskCycleType,
} from '../../../../../reducks/groupTasks/types';
import { Group } from '../../../../../reducks/groups/types';
import { date } from '../../../../../lib/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupTasksList } from '../../../../../reducks/groupTasks/selectors';
import AssignmentTaskModal from '../../../../../components/task/page/taskTableArea/assignmentTaskModal/AssignmentTaskModal';
import SelectTaskName from '../../../../../components/task/SelectTaskName';
import { editTaskItem } from '../../../../../reducks/groupTasks/operations';

interface AssignmentTaskModalContainerProps {
  approvedGroup: Group;
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
  const taskList = useSelector(getGroupTasksList);

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

  const handleDateChange = (selectedDate: Date | null) => {
    setBaseDate(selectedDate as Date);
  };

  const selectTaskName = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  const disabledButton =
    taskItemId === initialState.initialTaskItemId ||
    taskName === initialState.initialTaskName ||
    cycle === 0 ||
    taskUserId === initialState.initialUserId;

  return (
    <AssignmentTaskModal
      approvedGroup={props.approvedGroup}
      groupId={props.groupId}
      taskNameFormElement={
        <SelectTaskName selectTaskName={selectTaskName} groupTasksList={taskList} />
      }
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
      disabledButton={disabledButton}
      message={message}
    />
  );
};

export default AssignmentTaskModalContainer;
