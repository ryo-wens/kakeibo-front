import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, RouteProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { fetchUserInfo } from '../../reducks/users/operations';

const CheckAuth: React.FC<RouteProps> = ({ ...rest }) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const signal = axios.CancelToken.source();

    const fetchUser = async () => {
      try {
        await dispatch(fetchUserInfo(signal));
      } catch (error) {
        if (error.response.status === 401) {
          alert(error.response.data.error.message.toString());
          setIsLogin(true);
        }
      }
    };

    fetchUser();

    return () => {
      signal.cancel();
    };
  }, []);

  return <Route>{!isLogin ? <Route {...rest} /> : <Redirect to={{ pathname: '/login' }} />}</Route>;
};
export default CheckAuth;
