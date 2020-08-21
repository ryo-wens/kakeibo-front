import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodayTask, CreateGroups, TodoMenu, GroupName } from '../components/todo';
import { fetchGroups } from '../reducks/groups/operations';
import { State } from '../reducks/store/types';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';

const Todo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, [approvedGroups, unapprovedGroups]);

  return (
    <div>
      {/* <TodoMenu /> */}
      {/* <TodayTask /> */}
      <CreateGroups modalTitleLabel={'グループ作成'} modalTextFieldLabel={'グループ名'} />
      <GroupName />
    </div>
  );
};

export default Todo;
