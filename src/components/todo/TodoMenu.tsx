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
import { getPathGroupId, getPathTemplateName } from '../../lib/path';

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
  const groupId = getPathGroupId(window.location.pathname);
  const entityType: string = getPathTemplateName(window.location.pathname);

  const switchDateTodoList = (path: string) => {
    if (entityType !== 'group') {
      dispatch(push(path));
    } else if (entityType === 'group') {
      dispatch(push(`/group/${groupId}${path}`));
    }
  };

  return (
    <List className={classes.list} component="nav">
      <ListItem button={true} onClick={() => switchDateTodoList(`/todo`)}>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary={'今日'} />
      </ListItem>
      <ListItem button={true} onClick={() => switchDateTodoList(`/todo/monthly`)}>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary={'月間予定'} />
      </ListItem>
    </List>
  );
};

export default TodoMenu;
