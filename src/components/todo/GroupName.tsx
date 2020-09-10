import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { GroupMenuButton } from './index';
import { Group } from '../../reducks/groups/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '40px',
      width: '700px',
      borderBottom: 'solid #333',
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
        <GroupMenuButton approvedGroup={props.approvedGroup} />
      </div>
    </List>
  );
};

export default GroupName;
