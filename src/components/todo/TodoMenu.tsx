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
import { fetchDateTodoLists, fetchMonthTodoList } from '../../reducks/todoLists/operations';
import {
  getMonthDueTodoList,
  getMonthImplementationTodoList,
  getMonthTodoListMessage,
  getTodayDueTodoList,
  getTodayImplementationTodoList,
  getTodayTodoListMessage,
} from '../../reducks/todoLists/selectors';

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
  const dt: Date = new Date();
  const year = String(dt.getFullYear());
  const month: string = ('0' + (dt.getMonth() + 1)).slice(-2);
  const date: string = ('0' + dt.getDate()).slice(-2);

  const isTodayTodoList = () => {
    if (!todayImplementationTodoList.length && !todayDueTodoList.length && !todayTodoListMessage) {
      return dispatch(fetchDateTodoLists(year, month, date)) && dispatch(push(`/todo`));
    } else if (todayImplementationTodoList || todayDueTodoList || todayTodoListMessage) {
      return dispatch(push(`/todo`));
    }
  };

  const isMonthTodoList = () => {
    if (!monthImplementationTodoList.length && !monthDueTodoList.length && !monthTodoListMessage) {
      return dispatch(fetchMonthTodoList(year, month)) && dispatch(push('/schedule-todo'));
    } else if (monthImplementationTodoList || monthDueTodoList || monthTodoListMessage) {
      return dispatch(push('/schedule-todo'));
    }
  };

  return (
    <List className={classes.list} component="nav">
      <ListItem button={true} onClick={() => isTodayTodoList()}>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary={'今日'} />
      </ListItem>
      <ListItem button={true} onClick={() => isMonthTodoList()}>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary={'近日予定'} />
      </ListItem>
    </List>
  );
};

export default TodoMenu;
