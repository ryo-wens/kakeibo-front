import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { State } from '../reducks/store/types';
import {
  getApprovedGroups,
  getGroupsMessage,
  getUnapprovedGroups,
} from '../reducks/groups/selectors';
import { TodoMenu } from '../components/todo';

const Todo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  return (
    <>
      <TodoMenu />
    </>
  );
};

export default Todo;
