import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { getIsLoggedIn } from '../../reducks/users/selectors';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ComputerIcon from '@material-ui/icons/Computer';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import HistoryIcon from '@material-ui/icons/History';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SettingsIcon from '@material-ui/icons/Settings';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { logOut } from '../../reducks/users/operations';
import { MobileDrawer } from './index';
import { State } from '../../reducks/store/types';
import { InvitationNotifications } from '../todo';

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
  const isLoggedIn = getIsLoggedIn(selector);

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
            <Button color="inherit" className={classes.title} onClick={() => dispatch(push('/'))}>
              家計簿App
            </Button>
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button size="large" className={classes.button} startIcon={<HistoryIcon />}>
              履歴
            </Button>
            <Button size="large" className={classes.button} startIcon={<ComputerIcon />}>
              分析
            </Button>
            <Button size="large" className={classes.button} startIcon={<CreditCardIcon />}>
              集計
            </Button>
            <Button size="large" className={classes.button} startIcon={<GroupIcon />}>
              グループ
            </Button>
            <Button
              size="large"
              className={classes.button}
              startIcon={<PlaylistAddCheckIcon />}
              onClick={() => dispatch(push('/todo'))}
            >
              Todo
            </Button>
          </div>
          <div className={classes.grow} />
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
