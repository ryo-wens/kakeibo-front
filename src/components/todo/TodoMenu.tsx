import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TodayIcon from '@material-ui/icons/Today';
import { push } from 'connected-react-router';
import { fetchDateTodoLists, fetchMonthTodoList } from '../../reducks/todoLists/operations';

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
  const dt: Date = new Date();
  const year = String(dt.getFullYear());
  const month: string = ('0' + (dt.getMonth() + 1)).slice(-2);
  const date: string = ('0' + dt.getDate()).slice(-2);

  return (
    <List className={classes.list} component="nav">
      <ListItem
        button={true}
        onClick={() => dispatch(fetchDateTodoLists(year, month, date)) && dispatch(push(`/todo`))}
      >
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary={'今日'} />
      </ListItem>
      <ListItem
        button={true}
        onClick={() =>
          dispatch(fetchMonthTodoList(year, month)) && dispatch(push('/schedule-todo'))
        }
      >
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary={'近日予定'} />
      </ListItem>
    </List>
  );
};

export default TodoMenu;
