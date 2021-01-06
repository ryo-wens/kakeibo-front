import React, { useEffect, useState } from 'react';
import SwitchItemTabs from '../../../uikit/tabs/SwitchItemTabs';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMonthlyShoppingList,
  fetchMonthlyShoppingListByCategories,
} from '../../../../reducks/shoppingList/operations';
import { month, year } from '../../../../lib/constant';
import axios from 'axios';
import { useLocation } from 'react-router';
import AddShoppingListModal from '../../uikit/AddShoppingListModal/AddShoppingListModal';
import './monthly-shopping-list-area.scss';
import InputYears from '../../../uikit/InputYears';
import { fetchGroups } from '../../../../reducks/groups/operations';
import ShoppingListByDate from '../../uikit/List/ShoppingListByDate/ShoppingListByDate';
import {
  getMonthlyShoppingList,
  getMonthlyShoppingListByCategories,
} from '../../../../reducks/shoppingList/selectors';
import ShoppingListByCategoriesComponent from '../../uikit/List/ShoppingListByCategoriesComponent/ShoppingListByCategoriesComponent';

const MonthlyShoppingListArea = () => {
  const dispatch = useDispatch();
  const monthlyShoppingList = useSelector(getMonthlyShoppingList);
  const monthlyShoppingListByCategories = useSelector(getMonthlyShoppingListByCategories);
  const pathName = useLocation().pathname.split('/')[1];
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group') {
      dispatch(
        fetchMonthlyShoppingList(String(selectedYear), ('0' + selectedMonth).slice(-2), signal)
      );
      dispatch(
        fetchMonthlyShoppingListByCategories(
          String(selectedYear),
          ('0' + selectedMonth).slice(-2),
          signal
        )
      );
      return () => signal.cancel();
    }
  }, [selectedYear, selectedMonth]);

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
  }, [selectedYear, selectedMonth]);

  return (
    <>
      <div className="monthly-shopping-list-area__add-button">
        <AddShoppingListModal />
      </div>
      <div className="monthly-shopping-list-area__switch-item">
        <div className="monthly-shopping-list-area__switch-item--width">
          <div className="monthly-shopping-list-area__input-years">
            <InputYears
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
            />
          </div>
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={
              <ShoppingListByDate
                shoppingListByDate={monthlyShoppingList}
                message={`${selectedMonth}月の買い物リストは登録されていません。`}
              />
            }
            rightItem={
              <ShoppingListByCategoriesComponent
                shoppingListByCategories={monthlyShoppingListByCategories}
                message={`${selectedMonth}月の買い物リストは登録されていません。`}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default MonthlyShoppingListArea;
