import React, { useEffect, useState } from 'react';
import './shopping-list-page.scss';
import SwitchTodayOrMonthlyTabs from './SwitchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabs';
import TodayShoppingListArea from './TodayShoppingListArea/TodayShoppingListArea';
import MonthlyShoppingListArea from './MonthlyShoppingListArea/MonthlyShoppingListArea';
import ExpiredShoppingListArea from './ExpiredShoppingListArea/ExpiredShoppingListArea';
import RegularShoppingListArea from './RegularShoppingListArea/RegularShoppingListArea';
import AddRegularShoppingListModal from '../uikit/Modal/AddRegularShoppingListModal/AddRegularShoppingListModal';
import { month, year } from '../../../lib/constant';
import { fetchCategories } from '../../../reducks/categories/operations';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getExpenseCategories, getIncomeCategories } from '../../../reducks/categories/selectors';

const ShoppingListPage = () => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const currentMonth = (`0` + `${selectedMonth}`).slice(-2);
  const currentYearMonth = `${selectedYear}/${currentMonth}`;

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (pathName !== 'group' && !incomeCategories.length && !expenseCategories.length) {
      dispatch(fetchCategories(signal));
    }
    return () => signal.cancel();
  }, []);

  return (
    <div className="shopping-list-page">
      <div className="shopping-list-page__left">
        <div className="shopping-list-page__left-content">
          <SwitchTodayOrMonthlyTabs
            leftItem={<TodayShoppingListArea />}
            rightItem={
              <MonthlyShoppingListArea
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                setSelectedYear={setSelectedYear}
                setSelectedMonth={setSelectedMonth}
              />
            }
          />
        </div>
      </div>
      <div className="shopping-list-page__right">
        <div className="shopping-list-page__right-content">
          <h4>定期買い物リスト</h4>
          <AddRegularShoppingListModal selectedYear={selectedYear} selectedMonth={selectedMonth} />
          <RegularShoppingListArea currentYearMonth={currentYearMonth} />
        </div>
        <div className="shopping-list-page__right-content">
          <h4>期限切れ買い物リスト</h4>
          <ExpiredShoppingListArea />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
