import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TodayIcon from '@material-ui/icons/Today';
import { push } from 'connected-react-router';
import { fetchDateTodoList, fetchMonthTodoList } from '../../reducks/todoList/operations';
import {
  getMonthDueTodoList,
  getMonthImplementationTodoList,
  getMonthTodoListMessage,
  getTodayDueTodoList,
  getTodayImplementationTodoList,
  getTodayTodoListMessage,
} from '../../reducks/todoList/selectors';
import {
  fetchGroupTodayTodoList,
  fetchGroupMonthTodoList,
} from '../../reducks/groupTodoList/operations';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import { TodoList } from '../../reducks/todoList/types';
import { Action, Dispatch } from 'redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 200,
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    BackdropProps: {
      backgroundColor: 'none',
    },
  })
);

const TodoMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const todayImplementationTodoList = getTodayImplementationTodoList(selector);
  const todayDueTodoList = getTodayDueTodoList(selector);
  const monthImplementationTodoList = getMonthImplementationTodoList(selector);
  const monthDueTodoList = getMonthDueTodoList(selector);
  const todayTodoListMessage = getTodayTodoListMessage(selector);
  const monthTodoListMessage = getMonthTodoListMessage(selector);
  const groupId = getPathGroupId(window.location.pathname);
  const entityType: string = getPathTemplateName(window.location.pathname);
  const dt: Date = new Date();
  const year = String(dt.getFullYear());
  const month: string = ('0' + (dt.getMonth() + 1)).slice(-2);
  const date: string = ('0' + dt.getDate()).slice(-2);

  const switchDateTodoList = (
    implementationTodoList: TodoList,
    dueTodoList: TodoList,
    todoListMessage: string,
    path: string,
    fetchTodoList: (dispatch: Dispatch<Action>) => Promise<void>,
    fetchGroupTodoList: (dispatch: Dispatch<Action>) => Promise<void>
  ) => {
    if (entityType !== 'group') {
      if (!implementationTodoList.length && !dueTodoList.length && !todoListMessage) {
        dispatch(fetchTodoList) && dispatch(push(path));
      } else if (implementationTodoList || dueTodoList || todoListMessage) {
        dispatch(push(path));
      }
    } else if (entityType === 'group') {
      dispatch(fetchGroupTodoList) && dispatch(push(`/group/${groupId}${path}`));
    }
  };

  return (
    <List className={classes.list} component="nav">
      <ListItem
        button={true}
        onClick={() =>
          switchDateTodoList(
            todayImplementationTodoList,
            todayDueTodoList,
            todayTodoListMessage,
            `/todo`,
            fetchDateTodoList(year, month, date),
            fetchGroupTodayTodoList(groupId, year, month, date)
          )
        }
      >
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary={'今日'} />
      </ListItem>
      <ListItem
        button={true}
        onClick={() =>
          switchDateTodoList(
            monthImplementationTodoList,
            monthDueTodoList,
            monthTodoListMessage,
            `/todo/monthly`,
            fetchMonthTodoList(year, month),
            fetchGroupMonthTodoList(groupId, year, month)
          )
        }
      >
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary={'月間予定'} />
      </ListItem>
    </List>
  );
};

export default TodoMenu;
