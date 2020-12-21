import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import ComputerIcon from '@material-ui/icons/Computer';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SettingsIcon from '@material-ui/icons/Settings';
import { logOut } from '../../reducks/users/operations';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';

const useStyles = makeStyles({
  drawer: {
    width: 256,
  },
});

const MobileDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const entityType: string = getPathTemplateName(window.location.pathname);
  const groupId: number = getPathGroupId(window.location.pathname);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const logOutCheck = () => {
    if (window.confirm('ログアウトしても良いですか？ ')) {
      dispatch(logOut());
    } else {
      alert('ログアウトを中止しました');
    }
  };
  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setSideBarOpen(!sideBarOpen);
    },
    [setSideBarOpen, sideBarOpen]
  );

  const selectMenu = (event: React.KeyboardEvent | React.MouseEvent, path: string) => {
    if (entityType !== 'group') {
      dispatch(push(path));
      handleDrawerToggle(event);
    } else if (entityType === 'group') {
      dispatch(push(`/group/${groupId}${path}`));
      handleDrawerToggle(event);
    }
  };

  const menus = [
    {
      func: selectMenu,
      label: '履歴',
      icon: <HistoryIcon />,
      id: 'history',
      value: '/',
    },
    {
      func: selectMenu,
      label: '分析',
      icon: <ComputerIcon />,
      id: 'analysis',
      value: '/',
    },
    {
      func: selectMenu,
      label: '集計',
      icon: <CreditCardIcon />,
      id: 'aggregate',
      value: '/',
    },
    {
      func: selectMenu,
      label: 'todo',
      icon: <PlaylistAddCheckIcon />,
      id: 'todo',
      value: '/',
    },
    {
      func: selectMenu,
      label: '設定',
      icon: <SettingsIcon />,
      id: 'setting',
      value: '/',
    },
  ];

  return (
    <nav>
      <IconButton color="inherit" onClick={(e) => handleDrawerToggle(e)}>
        <MenuIcon />
      </IconButton>
      <Drawer keepMounted={true} anchor={'left'} open={sideBarOpen} onClose={handleDrawerToggle}>
        <List className={classes.drawer}>
          {menus.map((menu) => {
            return (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            );
          })}
          {entityType === 'group' && (
            <ListItem button onClick={(e) => selectMenu(e, '/task')}>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="タスク" />
            </ListItem>
          )}
          <ListItem button key="logout" onClick={() => logOutCheck()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="ログアウト" />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};
export default MobileDrawer;
