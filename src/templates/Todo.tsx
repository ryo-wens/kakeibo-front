import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../reducks/groups/operations';
import { State } from '../reducks/store/types';
import { getApprovedGroups, getUnapprovedGroups } from '../reducks/groups/selectors';
import { AddTodo, ExistsTodoLists, TodoMenu } from '../components/todo';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  getDueTodoLists,
  getImplementationTodoLists,
  getTodoListsMessage,
} from '../reducks/todoLists/selectors';
import { fetchDateTodoLists } from '../reducks/todoLists/operations';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '40px 0px 0px 200px',
    },
  })
);

const Todo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);
  const unapprovedGroups = getUnapprovedGroups(selector);
  const implementationTodoLists = getImplementationTodoLists(selector);
  const dueTodoLists = getDueTodoLists(selector);
  const todoListsMessage = getTodoListsMessage(selector);
  const dt: Date = new Date();
  const year = String(dt.getFullYear());
  const month: string = ('0' + (dt.getMonth() + 1)).slice(-2);
  const date: string = ('0' + dt.getDate()).slice(-2);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = weekdays[dt.getDay()];

  useEffect(() => {
    if (approvedGroups.length === 0 && unapprovedGroups.length === 0) {
      dispatch(fetchGroups());
    }
  }, []);

  useEffect(() => {
    if (implementationTodoLists.length === 0 && dueTodoLists.length === 0) {
      dispatch(fetchDateTodoLists(year, month, date));
    }
  }, []);

  return (
    <>
      <TodoMenu />
      <div className={classes.root}>
        <span>
          今日 {month}/{date} ({weekday})
        </span>
        <ExistsTodoLists
          planName={'実施予定'}
          todoLists={implementationTodoLists}
          implementationTodoLists={implementationTodoLists}
          dueTodoLists={dueTodoLists}
          todoListsMessage={todoListsMessage}
        />
        <ExistsTodoLists
          planName={'締切予定'}
          todoLists={dueTodoLists}
          implementationTodoLists={implementationTodoLists}
          dueTodoLists={dueTodoLists}
          todoListsMessage={todoListsMessage}
        />
        <div>
          <AddTodo />
        </div>
      </div>
    </>
  );
};

export default Todo;
