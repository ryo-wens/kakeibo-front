import React from 'react';
import { useSelector } from 'react-redux';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from '@material-ui/core/Divider';
import DateRangeIcon from '@material-ui/icons/DateRange';
import GroupIcon from '@material-ui/icons/Group';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TodayIcon from '@material-ui/icons/Today';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { State } from '../../reducks/store/types';
import { CreateGroups } from './index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block',
        margin: '0px 20px',
        width: 200,
        backgroundColor: theme.palette.background.paper,
      },
    },
    BackdropProps: {
      backgroundColor: 'none',
    },
  })
);

interface MobileTodoMenuProps {
  onClick: () => void;
}

const MobileTodoMenu = (props: MobileTodoMenuProps) => {
  const classes = useStyles();
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
      <List className={classes.list} component="nav">
        <ListItem button={true} onClick={props.onClick}>
          <ListItemIcon>
            <ArrowBackIosIcon />
          </ListItemIcon>
          <ListItemText />
        </ListItem>
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
          return (
            <ListItem button={true} key={approvedGroup.group_id}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={approvedGroup.group_name} />
            </ListItem>
          );
        })}

        <CreateGroups modalTitleLabel={'グループ作成'} modalTextFieldLabel={'グループ名'} />
      </List>
    </ThemeProvider>
  );
};

export default MobileTodoMenu;
