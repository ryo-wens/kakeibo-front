import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducks/store/types';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { fetchGroups } from '../reducks/groups/operations';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Group } from '../reducks/groups/types';
import { getPathGroupId } from '../lib/path';
import { fetchGroupTasksList, fetchGroupTasksListEachUser } from '../reducks/groupTasks/operations';
import { EditTaskUser, SkipDate, TaskList } from '../components/task';
import { getGroupTasksList, getGroupTasksListForEachUser } from '../reducks/groupTasks/selectors';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '1600px',
    },
  })
);

const Task = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const groupId = getPathGroupId(window.location.pathname);

  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
  const groupTasksListForEachUser = getGroupTasksListForEachUser(selector);
  const groupTasksList = getGroupTasksList(selector);

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [groupId]);

  useEffect(() => {
    if (groupTasksListForEachUser.length === 0) {
      dispatch(fetchGroupTasksListEachUser(groupId));
    }
  }, []);

  useEffect(() => {
    if (groupTasksList.length === 0) {
      dispatch(fetchGroupTasksList(groupId));
    }
  }, []);

  const approvedGroup: Group = useMemo(() => {
    if (approvedGroups.length > 0) {
      const matchedGroups = approvedGroups.filter(
        (approvedGroup) => approvedGroup.group_id === groupId
      );
      return matchedGroups[0];
    } else {
      return {
        group_id: 0,
        group_name: '',
        approved_users_list: [],
        unapproved_users_list: [],
      };
    }
  }, [approvedGroups, groupId]);

  return (
    <>
      <div className={classes.root}>
        <EditTaskUser
          approvedGroup={approvedGroup}
          groupTasksListForEachUser={groupTasksListForEachUser}
        />
        <TaskList
          groupId={groupId}
          groupTasksListForEachUser={groupTasksListForEachUser}
          groupTasksList={groupTasksList}
        />
        <SkipDate />
      </div>
    </>
  );
};

export default Task;
