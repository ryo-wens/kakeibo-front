import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { push } from 'connected-react-router';
import axios from 'axios';
import { Groups } from '../../reducks/groups/types';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { fetchGroups } from '../../reducks/groups/operations';
import { fetchUserInfo, logOut } from '../../reducks/users/operations';
import Header from '../../components/header/Header';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const currentPath = useLocation().pathname;
  const pathName = useLocation().pathname.split('/')[1];
  const approvedGroups: Groups = useSelector(getApprovedGroups);
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
    const style = {
      color: '',
      borderBottom: '',
      paddingBottom: '',
    };

    if (path === currentPath) {
      style.color = '#e2750f';
      style.borderBottom = '4px solid #e2750f';
      style.paddingBottom = '14px';
    }
    return style;
  };

  return (
    <Header
      group_id={Number(group_id)}
      pathName={pathName}
      name={name}
      setName={setName}
      approvedGroups={approvedGroups}
      currentPage={currentPage}
      logOutCheck={logOutCheck}
      homeButtonClick={homeButtonClick}
      existsGroupWhenRouting={existsGroupWhenRouting}
    />
  );
};
export default HeaderContainer;
