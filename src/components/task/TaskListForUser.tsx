import React, { useCallback, useMemo, useState } from 'react';
import { getWeekStartDate } from '../../lib/date';
import { UserTasksListItem } from '../../reducks/groupTasks/types';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import '../../assets/task/task-list-for-user.scss';

interface TaskListForUserProps {
  selectedDate: Date;
  groupTasksListItem: UserTasksListItem;
}

const TaskListForUser = (props: TaskListForUserProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dt: Date = props.selectedDate !== null ? props.selectedDate : new Date();
  const selectedDate = new Date(dt);

  const openModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const week = useMemo(() => {
    const weekTableItems = [];
    for (let i = 0; i < 7; i++) {
      const startDate = getWeekStartDate(selectedDate);
      const date = new Date(startDate.setDate(startDate.getDate() + i));

      weekTableItems.push(
        <td className="task-list-for-user__item" key={i}>
          <span className="task-list-for-user__date">{date.getDate()}</span>
          <button className="task-list-for-user__add-icon" onClick={() => openModal()}>
            <AddIcon />
          </button>
        </td>
      );
    }
    return weekTableItems;
  }, [selectedDate]);

  return (
    <>
      <tr className="task-list-for-user">
        <th className="task-list-for-user__item">{props.groupTasksListItem.user_id}</th>
        {week}
      </tr>
      <Modal open={open} onClose={closeModal}>
        {/*<SetTaskListItem closeModal={closeModal} />*/}
      </Modal>
    </>
  );
};

export default TaskListForUser;
