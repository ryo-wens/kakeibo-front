import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    list: {
      margin: '70px 20px 0px 20px ',
      width: 200,
      backgroundColor: theme.palette.background.paper,
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
  const approvedGroups = getApprovedGroups(selector);

  const theme = createMuiTheme({
    overrides: {
      MuiBackdrop: {
        root: {
          backgroundColor: 'rgba(0,0,0,0.0)',
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Drawer style={{ zIndex: 1050 }} anchor={'left'} open={true} className={classes.drawer}>
        <List className={classes.list} component="nav">
          <ListItem button={true}>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary={'今日'} />
          </ListItem>
          <ListItem button={true}>
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
                onClick={() => dispatch(push('/group-todo/' + selectedGroupId))}
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
      </Drawer>
    </ThemeProvider>
  );
};

export default TodoMenu;
