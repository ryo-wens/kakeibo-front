import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducks/store/types';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { fetchGroups } from '../reducks/groups/operations';
import { Group } from '../reducks/groups/types';
import { getPathGroupId } from '../lib/path';
import { fetchGroupTasksList, fetchGroupTasksListEachUser } from '../reducks/groupTasks/operations';
import { EditTaskUser, SetTaskListItem, SkipDate, TaskList, WeekTables } from '../components/task';
import { getGroupTasksList, getGroupTasksListForEachUser } from '../reducks/groupTasks/selectors';
import '../assets/task/task.scss';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';

const Task = () => {
  const dispatch = useDispatch();
  const groupId = getPathGroupId(window.location.pathname);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
  const groupTasksListForEachUser = getGroupTasksListForEachUser(selector);
  const groupTasksList = getGroupTasksList(selector);

  const groupIdx = approvedGroups.findIndex((approvedGroup) => approvedGroup.group_id === groupId);
  const approvedGroup: Group = approvedGroups[groupIdx];

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  useEffect(() => {
    if (groupTasksListForEachUser.length === 0) {
      dispatch(fetchGroupTasksListEachUser(groupId));
    }
  }, []);

  useEffect(() => {
    if (groupTasksList.length === 0) {
      dispatch(fetchGroupTasksList(groupId));
    }
  }, [groupId]);

  const openModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div className="task">
      <div className="task__menu">
        <SkipDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <EditTaskUser
          approvedGroup={approvedGroup}
          groupTasksListForEachUser={groupTasksListForEachUser}
        />
      </div>
      <TaskList
        groupId={groupId}
        groupTasksListForEachUser={groupTasksListForEachUser}
        groupTasksList={groupTasksList}
      />
      <table className="task__table">
        <thead>
          <WeekTables selectedDate={selectedDate} />
        </thead>
        <tfoot>
          <tr className="task__assign-task">
            <th className="task__assign-task-item">
              <button className="task__assign-task-btn" onClick={() => openModal()}>
                <AddIcon />
              </button>
              <Modal open={open} onClose={closeModal}>
                <SetTaskListItem
                  approvedGroup={approvedGroup}
                  groupTasksList={groupTasksList}
                  groupTasksListForEachUser={groupTasksListForEachUser}
                  closeModal={closeModal}
                />
              </Modal>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Task;
