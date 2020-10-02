import React, { useEffect } from 'react';
import { TodoMenu } from '../components/todo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { fetchMonthTodoLists } from '../reducks/todoLists/operations';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { getDueTodoLists, getImplementationTodoLists } from '../reducks/todoLists/selectors';
import { State } from '../reducks/store/types';

const ScheduleTodo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
  const implementationTodoLists = getImplementationTodoLists(selector);
  const dueTodoLists = getDueTodoLists(selector);
  const dt: Date = new Date();
  const year = String(dt.getFullYear());
  const month: string = ('0' + (dt.getMonth() + 1)).slice(-2);

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  useEffect(() => {
    if (implementationTodoLists.length === 0 && dueTodoLists.length === 0) {
      dispatch(fetchMonthTodoLists(year, month));
    }
  }, []);

  return <TodoMenu />;
};

export default ScheduleTodo;
