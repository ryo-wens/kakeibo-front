import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { MenuButton } from '../uikit';

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

interface GroupNameProps {
  name: string;
}

const GroupName = () => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <div className={classes.groupMenu}>
        <ListItem>
          <ListItemText primary="グループ名" />
        </ListItem>
        <MenuButton />
      </div>
      <Divider />
    </List>
  );
};

export default GroupName;
