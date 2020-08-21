import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { MenuButton } from '../uikit';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 720,
      backgroundColor: theme.palette.background.paper,
    },
    groupMenu: {
      display: 'flex',
    },
  })
);

const GroupName = () => {
  const classes = useStyles();
  const selector = useSelector((state: State) => state);
  const approvedGroups = getApprovedGroups(selector);

  return (
    <List className={classes.root}>
      {approvedGroups.map((approvedGroup) => (
        <div className={classes.groupMenu} key={approvedGroup.group_id}>
          <ListItem>
            <ListItemText primary={approvedGroup.group_name} />
          </ListItem>
          <MenuButton approvedGroup={approvedGroup} />
        </div>
      ))}
    </List>
  );
};

export default GroupName;
