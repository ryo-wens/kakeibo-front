import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserInfo } from '../../reducks/users/operations';
import { push } from 'connected-react-router';
import axios from 'axios';

const CheckAuth = () => {
  const dispatch = useDispatch();

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

  return <></>;
};
export default CheckAuth;
