import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLatestTransactionsList } from '../../reducks/transactions/operations';
import ListItem from '@material-ui/core/ListItem';

const RecentInput = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLatestTransactionsList());
  }, []);

  const message = '「入力フォーム」から家計簿の追加を行ってください';

  return (
    <div className="grid__column box__recent ">
      <h3>最近の入力</h3>
      <ListItem>{message}</ListItem>
    </div>
  );
};
export default RecentInput;
