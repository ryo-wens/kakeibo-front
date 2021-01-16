import React, { useEffect, useState } from 'react';
import '../../shoppingList/Page/shopping-list-page.scss';
import { month, year } from '../../../lib/constant';
import { fetchCategories } from '../../../reducks/categories/operations';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getExpenseCategories, getIncomeCategories } from '../../../reducks/categories/selectors';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import SwitchTodayOrMonthlyTabs from '../../shoppingList/Page/SwitchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabs';
import GroupTodayShoppingListArea from './GroupTodayShoppingListArea/GroupTodayShoppingListArea';
import GroupMonthlyShoppingListArea from './GroupMonthlyShoppingListArea/GroupMonthlyShoppingListArea';
import GroupExpiredShoppingListArea from './GroupExpiredShoppingListArea/GroupExpiredShoppingListArea';
import GroupRegularShoppingListArea from './GroupRegularShoppingListArea/GroupRegularShoppingListArea';

const GroupShoppingListPage = () => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);

  const [currentItems, setCurrentItems] = useState<TodayOrMonthly>('today');
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
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
            leftItem={<GroupTodayShoppingListArea />}
            rightItem={
              <GroupMonthlyShoppingListArea
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                setSelectedYear={setSelectedYear}
                setSelectedMonth={setSelectedMonth}
                currentYearMonth={currentYearMonth}
              />
            }
          />
        </div>
      </div>
      <div className="shopping-list-page__right">
        <div className="shopping-list-page__right-content">
          <h4>定期買い物リスト</h4>
          <GroupRegularShoppingListArea />
        </div>
        <div className="shopping-list-page__right-content">
          <h4>期限切れ買い物リスト</h4>
          <GroupExpiredShoppingListArea />
        </div>
      </div>
    </div>
  );
};

export default GroupShoppingListPage;
