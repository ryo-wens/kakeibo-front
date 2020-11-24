import React, { useCallback, useState } from 'react';
import { TasksListItem } from '../../reducks/groupTasks/types';
import { SetTaskListItem } from './index';
import Modal from '@material-ui/core/Modal';
import { Group, Groups } from '../../reducks/groups/types';
import { date } from '../../lib/constant';
import '../../assets/task/edit-task-list-for-user.scss';

interface EditTaskListForUserProps {
  approvedGroups: Groups;
  approvedGroup: Group;
  groupId: number;
  tasksListItem: TasksListItem;
}

const EditTaskListForUser = (props: EditTaskListForUserProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [taskItemName, setTaskItemName] = useState<string>('');
  const [taskItemId, setTaskItemId] = useState<number>(0);
  const [baseDate, setBaseDate] = useState<Date | null>(date);
  const [cycleType, setCycleType] = useState<'every' | 'consecutive' | 'none'>('every');
  const [cycle, setCycle] = useState<number>(1);
  const [taskUserId, setTaskUserId] = useState<number>(0);

  const currentCycleType =
    props.tasksListItem.cycle_type !== null ? props.tasksListItem.cycle_type : 'none';
  const currentCycle = props.tasksListItem.cycle !== null ? props.tasksListItem.cycle : 0;
  const currentTaskUserId =
    props.tasksListItem.group_tasks_users_id !== null
      ? props.tasksListItem.group_tasks_users_id
      : 0;

  const openModal = useCallback(() => {
    setOpen(true);
    setTaskItemName(props.tasksListItem.task_name);
    setTaskItemId(props.tasksListItem.id);
    setBaseDate(props.tasksListItem.base_date);
    setCycleType(currentCycleType);
    setCycle(currentCycle);
    setTaskUserId(currentTaskUserId);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <th className="edit-task-list-for-user__task-name" onClick={openModal}>
        {props.tasksListItem.task_name}
      </th>
      <Modal open={open} onClose={closeModal}>
        <SetTaskListItem
          approvedGroup={props.approvedGroup}
          groupId={props.groupId}
          closeModal={closeModal}
          label={'保存'}
          taskItemName={taskItemName}
          setTaskItemName={setTaskItemName}
          taskItemId={taskItemId}
          setTaskItemId={setTaskItemId}
          baseDate={baseDate}
          setBaseDate={setBaseDate}
          cycleType={cycleType}
          setCycleType={setCycleType}
          cycle={cycle}
          setCycle={setCycle}
          taskUserId={taskUserId}
          setTaskUserId={setTaskUserId}
        />
      </Modal>
    </>
  );
};

export default EditTaskListForUser;
