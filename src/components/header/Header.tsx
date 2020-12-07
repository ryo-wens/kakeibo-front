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
import { MobileDrawer } from './index';
import { InvitationNotifications } from '../todo';
import SwitchEntity from './SwitchEntity';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';
import { fetchUserInfo } from '../../reducks/users/operations';
import { fetchGroups } from '../../reducks/groups/operations';
import { Groups } from '../../reducks/groups/types';
import { getUserName } from '../../reducks/users/selectors';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { State } from '../../reducks/store/types';
import axios, { CancelTokenSource } from 'axios';

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
  const selector = useSelector((state: State) => state);
  const userName: string = getUserName(selector);
  const approvedGroups: Groups = getApprovedGroups(selector);
  const entityType: string = getPathTemplateName(window.location.pathname);
  const groupId: number = getPathGroupId(window.location.pathname);
  const [name, setName] = useState<string>('');

  const fetchApprovedGroups = (signal: CancelTokenSource) => {
    if (!approvedGroups.length) {
      dispatch(fetchGroups(signal));
    }
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (userName === '') {
      dispatch(fetchUserInfo(signal));
      return () => signal.cancel();
    }
  }, []);

  useEffect(() => {
    const initialName = async () => {
      const signal = axios.CancelToken.source();
      if (entityType === 'group') {
        await fetchApprovedGroups(signal);
        let groupName = '';
        for (const approvedGroup of approvedGroups) {
          if (approvedGroup.group_id === groupId) {
            groupName = approvedGroup.group_name;
          }
        }
        setName(groupName);
        return () => signal.cancel();
      } else if (entityType !== 'group') {
        setName(userName);
      }
    };
    initialName();
  }, [approvedGroups, entityType, groupId]);

  const existsGroupWhenRouting = (path: string) => {
    if (entityType !== 'group') {
      return dispatch(push(`${path}`));
    } else if (entityType === 'group') {
      return dispatch(push(`/group/${groupId}${path}`));
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
      await existsGroupWhenRouting(`/`);
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
            {entityType === 'group' && (
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
            entityType={entityType}
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
