import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { logOut } from '../../reducks/users/operations';
import { MobileDrawer } from './index';
import { InvitationNotifications } from '../todo';
import SwitchEntity from './SwitchEntity';
import { getPathGroupId, getPathTemplateName } from '../../lib/path';

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

  const switchEntity = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEntity(event.target.value as string);
  };

  const entityType: string = getPathTemplateName(window.location.pathname);
  const groupId: number = getPathGroupId(window.location.pathname);

  const [entity, setEntity] = useState<string>('');

  const existsGroupWhenRouting = useCallback(
    (groupId: number, templateName?: string) => {
      if (entityType !== 'group') {
        if (templateName) {
          return dispatch(push(`/${templateName}`));
        } else if (!templateName) {
          return dispatch(push(`/`));
        }
      } else if (entityType === 'group') {
        if (templateName) {
          return dispatch(push(`/group/${groupId}/${templateName}`));
        } else if (!templateName) {
          return dispatch(push(`/group/${groupId}`));
        }
      }
    },
    [entityType]
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
              onClick={() => existsGroupWhenRouting(groupId)}
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
              onClick={() => dispatch(push('/standard-budgets'))}
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
              onClick={() => existsGroupWhenRouting(groupId, 'todo')}
            >
              Todo
            </Button>
          </div>
          <div className={classes.grow} />
          <SwitchEntity entity={entity} switchEntity={switchEntity} />
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
