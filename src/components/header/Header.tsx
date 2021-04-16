import React from 'react';
import dayjs from 'dayjs';
import { Groups } from '../../reducks/groups/types';
import MoneyIcon from '@material-ui/icons/Money';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { InvitationNotifications } from './index';
import SwitchEntityContainer from '../../containers/header/switchEntity/SwitchEntityContainer';
import { month, year } from '../../lib/constant';
import './header.scss';

interface HeaderProps {
  pathName: string;
  group_id: number;
  approvedGroups: Groups;
  logOutCheck: () => void;
  homeButtonClick: () => void;
  existsGroupWhenRouting: (path: string) => void;
  currentPage: (
    path: string
  ) =>
    | { paddingBottom: string; color: string; borderBottom: string }
    | { color: string; borderBottom: string };
}

const Header = (props: HeaderProps) => {
  return (
    <div className="header__header--position">
      <header className="header__header">
        <div className="header__upper-content">
          <h1>
            <a className="header__title" onClick={() => props.homeButtonClick()}>
              Tukecholl
            </a>
          </h1>
        </div>
        <div>
          <ul className="header__global-menu">
            <li
              className="header__global-menu--item"
              style={props.currentPage(
                props.pathName !== 'group' ? '/home' : `/group/${props.group_id}/home`
              )}
              onClick={() => props.existsGroupWhenRouting('/home')}
            >
              <a>
                <HomeIcon className="header__icon" />
                ホーム
              </a>
            </li>
            <li
              className="header__global-menu--item"
              style={props.currentPage(
                props.pathName !== 'group' ? `/history` : `/group/${props.group_id}/history`
              )}
              onClick={() =>
                props.existsGroupWhenRouting(
                  `/history?daily&year=${year}&month=${dayjs(String(month)).format('MM')}`
                )
              }
            >
              <a>
                <HistoryIcon className="header__icon" />
                家計
              </a>
            </li>
            <li
              className="header__global-menu--item"
              style={props.currentPage(
                props.pathName !== 'group' ? '/budgets' : `/group/${props.group_id}/budgets`
              )}
              onClick={() => props.existsGroupWhenRouting('/budgets?standard')}
            >
              <a>
                <MoneyIcon className="header__icon" />
                予算
              </a>
            </li>
            {props.pathName === 'group' && (
              <li
                className="header__global-menu--item"
                style={props.currentPage(`/group/${props.group_id}/accounting`)}
                onClick={() => props.existsGroupWhenRouting(`/accounting?year=${year}`)}
              >
                <a>
                  <CreditCardIcon className="header__icon" />
                  会計
                </a>
              </li>
            )}
            <li
              className="header__global-menu--item"
              style={props.currentPage(
                props.pathName !== 'group' ? '/todo' : `/group/${props.group_id}/todo`
              )}
              onClick={() => props.existsGroupWhenRouting('/todo')}
            >
              <a>
                <PlaylistAddCheckIcon className="header__icon" />
                ToDo
              </a>
            </li>
            <div className="header__global-menu--sub-menu">
              <SwitchEntityContainer approvedGroups={props.approvedGroups} />
              <InvitationNotifications />
              <li
                className="header__upper-content--nav-item header__upper-content--nav-item--logout"
                onClick={() => props.logOutCheck()}
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
