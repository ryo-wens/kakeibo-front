import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../../../shoppingList/Page/ExpiredShoppingListArea/expired-shopping-list-area.scss';
import axios from 'axios';
import { useParams } from 'react-router';
import { fetchGroupExpiredShoppingList } from '../../../../reducks/groupShoppingList/operations';

const GroupExpiredShoppingListArea = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroupExpiredShoppingList(Number(id), signal));

    const interval = setInterval(() => {
      dispatch(fetchGroupExpiredShoppingList(Number(id), signal));
    }, 3000);

    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div>
        <div className="expired-shopping-list-area">
          <p className="expired-shopping-list-area__message">
            期限切れの買い物リストはありません。
          </p>
        </div>
      </div>
    </>
  );
};

export default GroupExpiredShoppingListArea;
