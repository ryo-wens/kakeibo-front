import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { fetchUserInfo } from '../../reducks/users/operations';
import axios from 'axios';

export const useFetchUserInfo = () => {
  const dispatch = useDispatch();
  const signal = axios.CancelToken.source();

  useEffect(() => {
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
};
