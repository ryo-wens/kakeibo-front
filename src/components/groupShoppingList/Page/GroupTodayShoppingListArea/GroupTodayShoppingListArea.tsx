import React, { useEffect } from 'react';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';
import { useDispatch, useSelector } from 'react-redux';
import { date } from '../../../../lib/constant';
import axios, { CancelTokenSource } from 'axios';
import { useParams } from 'react-router';
import '../../../shoppingList/Page/TodayShoppingListArea/today-shopping-list-area.scss';
import { fetchGroups } from '../../../../reducks/groups/operations';
import { fetchGroupTodayShoppingListByCategories } from '../../../../reducks/groupShoppingList/operations';
import AddGroupShoppingListModal from '../../uikit/Modal/AddGroupShoppingListModal/AddGroupShoppingListModal';
import GroupTodayShoppingListComponent from './GroupTodayShoppingListComponent/GroupTodayShoppingListComponent';
import { getGroupTodayShoppingList } from '../../../../reducks/groupShoppingList/selectors';

interface GroupTodayShoppingListAreaProps {
  currentYearMonth: string;
}

const GroupTodayShoppingListArea = (props: GroupTodayShoppingListAreaProps) => {
  const dispatch = useDispatch();
  const groupTodayShoppingList = useSelector(getGroupTodayShoppingList);

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
      <div className="today-shopping-list-area__add-button">
        <AddGroupShoppingListModal currentYearMonth={props.currentYearMonth} />
      </div>
      <div className="today-shopping-list-area__switch-item">
        <div className="today-shopping-list-area__switch-item--width">
          {/*仮実装として、div タグを props として、渡しています。*/}
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={
              <GroupTodayShoppingListComponent
                shoppingList={groupTodayShoppingList}
                currentYearMonth={props.currentYearMonth}
                groupId={Number(id)}
                year={todayYear}
                month={todayMonth}
                date={todayDate}
              />
            }
            rightItem={<div />}
          />
        </div>
      </div>
    </>
  );
};

export default GroupTodayShoppingListArea;
