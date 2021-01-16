import React, { useEffect } from 'react';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';
import { useDispatch } from 'react-redux';
import { date } from '../../../../lib/constant';
import axios, { CancelTokenSource } from 'axios';
import { useParams } from 'react-router';
import '../../../shoppingList/Page/TodayShoppingListArea/today-shopping-list-area.scss';
import { fetchGroups } from '../../../../reducks/groups/operations';
import {
  fetchGroupTodayShoppingList,
  fetchGroupTodayShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/operations';

const GroupTodayShoppingListArea = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const todayDate: string = ('0' + date.getDate()).slice(-2);

  const fetchData = (
    groupId: number,
    year: string,
    month: string,
    date: string,
    signal: CancelTokenSource
  ) => {
    dispatch(fetchGroups(signal));
    dispatch(fetchGroupTodayShoppingList(groupId, todayYear, todayMonth, todayDate, signal));
    dispatch(
      fetchGroupTodayShoppingListByCategories(groupId, todayYear, todayMonth, todayDate, signal)
    );
  };

  useEffect(() => {
    const signal = axios.CancelToken.source();
    fetchData(Number(id), todayYear, todayMonth, todayDate, signal);
    const interval = setInterval(() => {
      fetchData(Number(id), todayYear, todayMonth, todayDate, signal);
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [todayYear, todayMonth, todayDate, id]);

  return (
    <>
      <div className="today-shopping-list-area__add-button"></div>
      <div className="today-shopping-list-area__switch-item">
        <div className="today-shopping-list-area__switch-item--width">
          {/*仮実装として、div タグを props として、渡しています。*/}
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={<div />}
            rightItem={<div />}
          />
        </div>
      </div>
    </>
  );
};

export default GroupTodayShoppingListArea;
