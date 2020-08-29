import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { MenuButton } from '../uikit';
import { Group } from '../../reducks/groups/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 720,
      margin: '40px 0px 0px 270px',
      zIndex: 1100,
      backgroundColor: theme.palette.background.paper,
    },
    groupMenu: {
      display: 'flex',
    },
  })
);

interface GroupNameProps {
  approvedGroup: Group;
}

const GroupName = (props: GroupNameProps) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <div className={classes.groupMenu} key={props.approvedGroup.group_id}>
        <ListItem>
          <ListItemText primary={props.approvedGroup.group_name} />
        </ListItem>
        <MenuButton approvedGroup={props.approvedGroup} />
      </div>
    </List>
  );
};

export default GroupName;
