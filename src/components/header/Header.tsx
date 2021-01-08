import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MoneyIcon from '@material-ui/icons/Money';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { logOut } from '../../reducks/users/operations';
import { MobileDrawer, InvitationNotifications } from './index';
import { SwitchEntity } from './group';
import { fetchUserInfo } from '../../reducks/users/operations';
import { fetchGroups } from '../../reducks/groups/operations';
import { Groups } from '../../reducks/groups/types';
import { getUserName } from '../../reducks/users/selectors';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import axios from 'axios';
import { year } from '../../lib/constant';
import { useLocation, useParams } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    header: {
      position: 'fixed',
      top: 0,
      backgroundColor: '#3086f0',
    },
    button: {
      fontWeight: 500,
      fontSize: 16,
      color: '#fff',
      width: 128,
      height: 40,
    },
    title: {
      textTransform: 'none',
      fontSize: 24,
      display: 'none',
      [theme.breakpoints.up('xs')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userName: string = useSelector(getUserName);
  const approvedGroups: Groups = useSelector(getApprovedGroups);
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();
  const [name, setName] = useState<string>('');

  useEffect(() => {
    let unmount = false;
    const signal = axios.CancelToken.source();
    const setUserName = async () => {
      await dispatch(fetchUserInfo(signal));
      if (pathName !== 'group' && name === '' && !unmount) {
        setName(userName);
      }
    };
    setUserName();
    return () => {
      unmount = true;
      signal.cancel();
    };
  }, [userName, pathName]);

  useEffect(() => {
    let unmount = false;
    const signal = axios.CancelToken.source();
    const setGroupName = async () => {
      if (pathName === 'group' && name === '') {
        await dispatch(fetchGroups(signal));
        let groupName = '';
        for (const group of approvedGroups) {
          if (group.group_id === Number(id)) {
            groupName = group.group_name;
          }
        }
        if (!unmount) {
          setName(groupName);
        }
      }
    };
    setGroupName();
    return () => {
      unmount = true;
      signal.cancel();
    };
  }, [approvedGroups, pathName, Number(id)]);

  const existsGroupWhenRouting = (path: string) => {
    if (pathName !== 'group') {
      return dispatch(push(`${path}`));
    } else if (pathName === 'group') {
      return dispatch(push(`/group/${Number(id)}${path}`));
    }
  };

  const logOutCheck = () => {
    if (window.confirm('ログアウトしても良いですか？ ')) {
      dispatch(logOut());
    }
  };

  const menuId = 'primary-search-account-menu';

  const homeButtonClick = () => {
    async function click() {
      await existsGroupWhenRouting(``);
      window.location.reload();
    }
    click();
  };

  return (
    <div className={classes.grow}>
      <AppBar className={classes.header} position="static">
        <Toolbar>
          <div className={classes.sectionMobile}>
            <MobileDrawer />
          </div>
          <Typography variant="h6" noWrap>
            <Button color="inherit" className={classes.title} onClick={() => homeButtonClick()}>
              家計簿App
            </Button>
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button
              size="large"
              className={classes.button}
              startIcon={<HistoryIcon />}
              onClick={() => existsGroupWhenRouting('/daily/history')}
            >
              履歴
            </Button>
            <Button
              size="large"
              className={classes.button}
              startIcon={<MoneyIcon />}
              onClick={() => existsGroupWhenRouting('/standard/budgets')}
            >
              予算
            </Button>
            {pathName === 'group' && (
              <Button
                size="large"
                className={classes.button}
                startIcon={<MoneyIcon />}
                onClick={() => existsGroupWhenRouting(`/accounting?year=${year}`)}
              >
                会計
              </Button>
            )}
            <Button size="large" className={classes.button} startIcon={<CreditCardIcon />}>
              集計
            </Button>
            <Button
              size="large"
              className={classes.button}
              startIcon={<PlaylistAddCheckIcon />}
              onClick={() => existsGroupWhenRouting('/todo')}
            >
              Todo
            </Button>
            {pathName === 'group' && (
              <Button
                size="large"
                className={classes.button}
                startIcon={<EventAvailableIcon />}
                onClick={() => existsGroupWhenRouting('/task')}
              >
                タスク
              </Button>
            )}
          </div>
          <div className={classes.grow} />
          <SwitchEntity
            approvedGroups={approvedGroups}
            userName={userName}
            entityType={pathName}
            name={name}
            setName={setName}
          />
          <InvitationNotifications />
          <div className={classes.sectionDesktop}>
            <Button
              startIcon={<ExitToAppIcon />}
              className={classes.button}
              aria-label="logout"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => logOutCheck()}
            >
              ログアウト
            </Button>
            <Button
              startIcon={<SettingsIcon />}
              className={classes.button}
              aria-label="settings"
              aria-controls={menuId}
              aria-haspopup="true"
            >
              設定
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
