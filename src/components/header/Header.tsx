import React, { useCallback, useEffect, useState } from 'react';
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
import { fetchGroups } from '../../reducks/groups/operations';
import { Groups } from '../../reducks/groups/types';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { State } from '../../reducks/store/types';

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
  const approvedGroups: Groups = getApprovedGroups(selector);
  const entityType: string = getPathTemplateName(window.location.pathname);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const groupId: number = getPathGroupId(window.location.pathname);
  const [name, setName] = useState<string>('');

  const fetchApprovedGroups = () => {
    if (!approvedGroups.length) {
      dispatch(fetchGroups());
    }
  };

  useEffect(() => {
    const initialName = async () => {
      if (entityType === 'group') {
        await fetchApprovedGroups();
        let groupName = '';
        for (const approvedGroup of approvedGroups) {
          if (approvedGroup.group_id === groupId) {
            groupName = approvedGroup.group_name;
          }
        }
        setName(groupName);
      } else if (entityType !== 'group') {
        setName('user name');
      }
    };
    initialName();
  }, [approvedGroups, entityType, groupId]);

  const switchToIndividual = () => {
    setAnchorEl(null);
    setName('user name');
    dispatch(push('/'));
  };

  const switchToGroup = (groupId: number, groupName: string) => {
    setAnchorEl(null);
    setName(groupName);
    dispatch(push(`/group/${groupId}`));
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (!approvedGroups.length) {
      dispatch(fetchGroups());
    }
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const existsGroupWhenRouting = useCallback(
    (path: string) => {
      if (entityType !== 'group') {
        return dispatch(push(`${path}`));
      } else if (entityType === 'group') {
        return dispatch(push(`/group/${groupId}${path}`));
      }
    },
    [entityType, groupId]
  );

  const logOutCheck = () => {
    if (window.confirm('ログアウトしても良いですか？ ')) {
      dispatch(logOut());
    } else {
      alert('ログアウトを中止しました');
    }
  };

  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.grow}>
      <AppBar className={classes.header} position="static">
        <Toolbar>
          <div className={classes.sectionMobile}>
            <MobileDrawer />
          </div>
          <Typography variant="h6" noWrap>
            <Button
              color="inherit"
              className={classes.title}
              onClick={() => existsGroupWhenRouting(`/`)}
            >
              家計簿App
            </Button>
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button
              size="large"
              className={classes.button}
              startIcon={<HistoryIcon />}
              onClick={() => dispatch(push('/history-week'))}
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
            entityType={entityType}
            groupId={groupId}
            name={name}
            openMenu={openMenu}
            switchToIndividual={() => switchToIndividual()}
            switchToGroup={switchToGroup}
            closeMenu={closeMenu}
            anchorEl={anchorEl}
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
