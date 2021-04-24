import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { push } from 'connected-react-router';
import { Groups } from '../../reducks/groups/types';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { logOut, fetchUserInfo } from '../../reducks/users/operations';
import Header from '../../components/header/Header';
import axios from 'axios';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams<{ group_id: string }>();
  const currentPath = useLocation().pathname;
  const pathName = useLocation().pathname.split('/')[1];
  const approvedGroups: Groups = useSelector(getApprovedGroups);

  useEffect(() => {
    const signal = axios.CancelToken.source();

    const fetchUser = async () => {
      try {
        await dispatch(fetchUserInfo(signal));
      } catch (error) {
        if (error.response.status === 401) {
          alert(error.response.data.error.message.toString());
          dispatch(push('/login'));
        }
      }
    };

    fetchUser();

    return () => {
      signal.cancel();
    };
  }, []);

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
      approvedGroups={approvedGroups}
      currentPage={currentPage}
      logOutCheck={logOutCheck}
      homeButtonClick={homeButtonClick}
      existsGroupWhenRouting={existsGroupWhenRouting}
    />
  );
};
export default HeaderContainer;
