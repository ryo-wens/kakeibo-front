import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DateRangeIcon from '@material-ui/icons/DateRange';
import GroupIcon from '@material-ui/icons/Group';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TodayIcon from '@material-ui/icons/Today';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { State } from '../../reducks/store/types';
import { CreateGroups } from './index';
import { push } from 'connected-react-router';
import { Groups } from '../../reducks/groups/types';
import { fetchDateTodoLists, fetchMonthTodoLists } from '../../reducks/todoLists/operations';
import { fetchGroupTasksListEachUser } from '../../reducks/groupTasks/operations';

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
  const approvedGroups: Groups = getApprovedGroups(selector);
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
          dispatch(fetchMonthTodoLists(year, month)) && dispatch(push('/schedule-todo'))
        }
      >
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary={'近日予定'} />
      </ListItem>
      <Divider />
      {approvedGroups.map((approvedGroup) => {
        const selectedGroupId: number = approvedGroup.group_id;
        return (
          <ListItem
            button={true}
            key={approvedGroup.group_id}
            onClick={() =>
              dispatch(fetchGroupTasksListEachUser(selectedGroupId)) &&
              dispatch(push('/group-todo/' + selectedGroupId))
            }
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={approvedGroup.group_name} />
          </ListItem>
        );
      })}

      <CreateGroups modalTitleLabel={'グループ作成'} modalTextFieldLabel={'グループ名'} />
    </List>
  );
};

export default TodoMenu;
