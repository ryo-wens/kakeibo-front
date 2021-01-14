import React, { useEffect } from 'react';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTodayShoppingList,
  getTodayShoppingListByCategories,
} from '../../../../reducks/shoppingList/selectors';
import {
  fetchTodayShoppingList,
  fetchTodayShoppingListByCategories,
} from '../../../../reducks/shoppingList/operations';
import { date } from '../../../../lib/constant';
import axios from 'axios';
import { useLocation, useParams } from 'react-router';
import AddShoppingListModal from '../../uikit/Modal/AddShoppingListModal/AddShoppingListModal';
import './today-shopping-list-area.scss';
import { fetchGroups } from '../../../../reducks/groups/operations';
import ShoppingListByDate from '../../uikit/List/ShoppingListByDate/ShoppingListByDate';
import ShoppingListByCategoriesComponent from '../../uikit/List/ShoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';
import {
  fetchGroupTodayShoppingList,
  fetchGroupTodayShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/operations';

interface TodayShoppingListAreaProps {
  currentYearMonth: string;
}

const TodayShoppingListArea = (props: TodayShoppingListAreaProps) => {
  const dispatch = useDispatch();
  const todayShoppingList = useSelector(getTodayShoppingList);
  const todayShoppingListByCategories = useSelector(getTodayShoppingListByCategories);
  const pathName = useLocation().pathname.split('/')[1];
  const { id } = useParams();
  const todayYear = String(date.getFullYear());
  const todayMonth: string = ('0' + (date.getMonth() + 1)).slice(-2);
  const todayDate: string = ('0' + date.getDate()).slice(-2);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroups(signal));
    const interval = setInterval(() => {
      dispatch(fetchGroups(signal));
    }, 3000);
    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, [todayYear, todayMonth, todayDate]);

  useEffect(() => {
    if (pathName === 'group') {
      const signal = axios.CancelToken.source();
      dispatch(fetchGroupTodayShoppingList(Number(id), todayYear, todayMonth, todayDate, signal));
      dispatch(
        fetchGroupTodayShoppingListByCategories(
          Number(id),
          todayYear,
          todayMonth,
          todayDate,
          signal
        )
      );
      const interval = setInterval(() => {
        dispatch(fetchGroupTodayShoppingList(Number(id), todayYear, todayMonth, todayDate, signal));
        dispatch(
          fetchGroupTodayShoppingListByCategories(
            Number(id),
            todayYear,
            todayMonth,
            todayDate,
            signal
          )
        );
      }, 3000);
      return () => {
        signal.cancel();
        clearInterval(interval);
      };
    }
  }, [todayYear, todayMonth, todayDate, id]);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (
      pathName !== 'group' &&
      !todayShoppingList.length &&
      !todayShoppingListByCategories.length
    ) {
      dispatch(fetchTodayShoppingList(todayYear, todayMonth, todayDate, signal));
      dispatch(fetchTodayShoppingListByCategories(todayYear, todayMonth, todayDate, signal));
      return () => signal.cancel();
    }
  }, []);

  return (
    <>
      <div className="today-shopping-list-area__add-button">
        <AddShoppingListModal />
      </div>
      <div className="today-shopping-list-area__switch-item">
        <div className="today-shopping-list-area__switch-item--width">
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={
              <ShoppingListByDate
                shoppingListByDate={todayShoppingList}
                currentYearMonth={props.currentYearMonth}
                message={'今日の買い物リストは、登録されていません。'}
              />
            }
            rightItem={
              <ShoppingListByCategoriesComponent
                shoppingListByCategories={todayShoppingListByCategories}
                currentYearMonth={props.currentYearMonth}
                message={'今日の買い物リストは、登録されていません。'}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default TodayShoppingListArea;
