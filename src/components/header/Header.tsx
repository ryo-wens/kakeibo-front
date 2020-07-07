import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import HistoryIcon from '@material-ui/icons/History';
import ComputerIcon from '@material-ui/icons/Computer';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import { signOut } from '../../reducks/users/operations';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { MobileDrawer } from './index';

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

  const signOutCheck = () => {
    if (window.confirm('ログアウトしても良いですか？ ')) {
      dispatch(signOut());
    } else {
      alert('ログアウトを中止しました');
    }
  };

  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.grow}>
      <AppBar className={classes.header} position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Button
              color="inherit"
              className={classes.title}
              onClick={() => dispatch(push('/'))}
            >
              家計簿App
            </Button>
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button
              size="large"
              className={classes.button}
              startIcon={<HistoryIcon />}
            >
              履歴
            </Button>
            <Button
              size="large"
              className={classes.button}
              startIcon={<ComputerIcon />}
            >
              分析
            </Button>
            <Button
              size="large"
              className={classes.button}
              startIcon={<CreditCardIcon />}
            >
              集計
            </Button>
            <Button
              size="large"
              className={classes.button}
              startIcon={<GroupIcon />}
            >
              グループ
            </Button>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              startIcon={<ExitToAppIcon />}
              className={classes.button}
              aria-label="logout"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => signOutCheck()}
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
          <div className={classes.sectionMobile}>
            <MobileDrawer />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
