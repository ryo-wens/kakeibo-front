import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { push } from 'connected-react-router';
import axios from 'axios';
import { logOut } from '../../reducks/users/operations';
import { fetchGroups } from '../../reducks/groups/operations';
import { fetchUserInfo } from '../../reducks/users/operations';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { Groups } from '../../reducks/groups/types';
import MoneyIcon from '@material-ui/icons/Money';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { InvitationNotifications } from './index';
import { SwitchEntity } from './group';
import { year } from '../../lib/constant';
import './header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const currentPath = useLocation().pathname;
  const approvedGroups: Groups = useSelector(getApprovedGroups);
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();
  const [name, setName] = useState<string>('');

  useEffect(() => {
    let unmount = false;
    const signal = axios.CancelToken.source();
    const setUserName = async () => {
      await dispatch(fetchUserInfo(signal));
      if (pathName !== 'group' && name === '' && !unmount) {
        setName('グループ選択なし');
      }
    };
    setUserName();
    return () => {
      unmount = true;
      signal.cancel();
    };
  }, [pathName]);

  useEffect(() => {
    let unmount = false;
    const signal = axios.CancelToken.source();
    const setGroupName = async () => {
      if (pathName === 'group' && name === '') {
        await dispatch(fetchGroups(signal));
        let groupName = '';
        for (const group of approvedGroups) {
          if (group.group_id === Number(group_id)) {
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
  }, [approvedGroups, pathName, group_id]);

  const existsGroupWhenRouting = (path: string) => {
    if (pathName !== 'group') {
      return dispatch(push(`${path}`));
    } else if (pathName === 'group') {
      return dispatch(push(`/group/${Number(group_id)}${path}`));
    }
  };

  const logOutCheck = () => {
    if (window.confirm('ログアウトしても良いですか？ ')) {
      dispatch(logOut());
    }
  };

  const homeButtonClick = () => {
    async function click() {
      await existsGroupWhenRouting(`/home`);
      window.location.reload();
    }
    click();
  };

  const currentPage = (path: string) => {
    if (path === currentPath) {
      if (path === '/todo' || path === `/group/${group_id}/todo`) {
        return { borderBottom: '4px solid #e2750f', color: '#e2750f', paddingBottom: '13px' };
      }
      return { borderBottom: '4px solid #e2750f', color: '#e2750f' };
    }
  };

  return (
    <div className="header__header--position">
      <header className="header__header">
        <div className="header__upper-content">
          <h1 className="header__title" onClick={() => homeButtonClick()}>
            <a>Tukecholl</a>
          </h1>
        </div>
        <div>
          <ul className="header__global-menu">
            <li
              className="header__global-menu--item"
              style={currentPage(pathName !== 'group' ? '/home' : `/group/${group_id}/home`)}
              onClick={() => existsGroupWhenRouting('/home')}
            >
              <a>
                <HomeIcon className="header__icon" />
                ホーム
              </a>
            </li>
            <li
              className="header__global-menu--item"
              style={currentPage(
                pathName !== 'group' ? '/daily/history' : `/group/${group_id}/daily/history`
              )}
              onClick={() => existsGroupWhenRouting('/daily/history')}
            >
              <a>
                <HistoryIcon className="header__icon" />
                家計
              </a>
            </li>
            <li
              className="header__global-menu--item"
              style={currentPage(pathName !== 'group' ? '/budgets' : `/group/${group_id}/budgets`)}
              onClick={() => existsGroupWhenRouting('/budgets?standard')}
            >
              <a>
                <MoneyIcon className="header__icon" />
                予算
              </a>
            </li>
            {pathName === 'group' && (
              <li
                className="header__global-menu--item"
                style={currentPage(`/group/${group_id}/accounting`)}
                onClick={() => existsGroupWhenRouting(`/accounting?year=${year}`)}
              >
                <a>
                  <CreditCardIcon className="header__icon" />
                  会計
                </a>
              </li>
            )}
            <li
              className="header__global-menu--item"
              style={currentPage(pathName !== 'group' ? '/todo' : `/group/${group_id}/todo`)}
              onClick={() => existsGroupWhenRouting('/todo')}
            >
              <a>
                <PlaylistAddCheckIcon className="header__icon" />
                TODO
              </a>
            </li>
            <div className="header__global-menu--sub-menu">
              <SwitchEntity
                approvedGroups={approvedGroups}
                entityType={pathName}
                name={name}
                setName={setName}
              />
              <InvitationNotifications />
              <li
                className="header__upper-content--nav-item header__upper-content--nav-item--logout"
                onClick={() => logOutCheck()}
              >
                <a className="header__upper-content--nav-item">
                  <ExitToAppIcon className="header__icon" />
                  ログアウト
                </a>
              </li>
            </div>
          </ul>
        </div>
      </header>
      <div className="header__header--delimitation-line" />
    </div>
  );
};
export default Header;
