import React, { useEffect, useMemo } from 'react';
import { AddTodo, GroupName, TodoMenu } from '../components/todo';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducks/store/types';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { fetchGroups } from '../reducks/groups/operations';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Group } from '../reducks/groups/types';
import {
  getGroupDueTodoLists,
  getGroupImplementationTodoLists,
  getGroupTodoListsMessage,
} from '../reducks/groupTodoLists/selectors';
import {
  fetchGroupDateTodoLists,
  fetchGroupMonthTodoLists,
} from '../reducks/groupTodoLists/operations';
import { getPathGroupId } from '../lib/path';
import SwitchTodoLists from '../components/todo/SwitchTodoLists';
import { fetchGroupTasksList, fetchGroupTasksListEachUser } from '../reducks/groupTasks/operations';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '40px 0px 0px 200px',
    },
  })
);

const GroupTodo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const dt: Date = new Date();
  const year = String(dt.getFullYear());
  const month: string = ('0' + (dt.getMonth() + 1)).slice(-2);
  const date: string = ('0' + dt.getDate()).slice(-2);
  const groupId = getPathGroupId(window.location.pathname);

  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
  const groupImplementationTodoLists = getGroupImplementationTodoLists(selector);
  const groupDueTodoLists = getGroupDueTodoLists(selector);
  const groupTodoListsMessage = getGroupTodoListsMessage(selector);

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchGroupMonthTodoLists(groupId, year, month));
  }, [groupId]);

  useEffect(() => {
    if (groupImplementationTodoLists.length === 0 && groupDueTodoLists.length === 0) {
      dispatch(fetchGroupDateTodoLists(groupId, year, month, date));
    }
  }, []);

  useEffect(() => {
    if (groupImplementationTodoLists.length === 0 && groupDueTodoLists.length === 0) {
      dispatch(fetchGroupMonthTodoLists(groupId, year, month));
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
      <TodoMenu />
      <div className={classes.root}>
        <GroupName approvedGroup={approvedGroup} />
        <SwitchTodoLists
          implementationTodoLists={groupImplementationTodoLists}
          dueTodoLists={groupDueTodoLists}
          todoListsMessage={groupTodoListsMessage}
        />
        <AddTodo groupId={groupId} date={dt} />
        <button onClick={() => dispatch(fetchGroupTasksListEachUser(groupId))} />
        <button onClick={() => dispatch(fetchGroupTasksList(groupId))} />
      </div>
    </>
  );
};

export default GroupTodo;
