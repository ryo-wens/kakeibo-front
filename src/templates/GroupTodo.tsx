import React, { useEffect, useMemo } from 'react';
import { GroupName, TodoMenu } from '../components/todo';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../reducks/store/types';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { fetchGroups } from '../reducks/groups/operations';

const GroupTodo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const pathname = window.location.pathname;
  const paths = pathname.split('/');
  const groupId = Number(paths[paths.length - 1]);

  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, [approvedGroups, unapprovedGroups]);

  const approvedGroup = useMemo(() => {
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
      <GroupName approvedGroup={approvedGroup} />
    </>
  );
};

export default GroupTodo;
