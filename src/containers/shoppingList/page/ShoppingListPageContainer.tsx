import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenseCategories, getIncomeCategories } from '../../../reducks/categories/selectors';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import { month, year } from '../../../lib/constant';
import axios from 'axios';
import { fetchCategories } from '../../../reducks/categories/operations';
import ShoppingListPage from '../../../components/shoppingList/page/ShoppingListPage';
import { fetchGroups } from '../../../reducks/groups/operations';
import { generateZeroPaddingMonth } from '../../../lib/date';

const ShoppingListPageContainer = () => {
  const dispatch = useDispatch();
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);

  const [currentItem, setCurrentItem] = useState<TodayOrMonthly>('today');
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  const currentYear = String(selectedYear);
  const currentMonth = generateZeroPaddingMonth(selectedMonth);

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
  }, []);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    if (!incomeCategories.length && !expenseCategories.length) {
      dispatch(fetchCategories(signal));
    }
    return () => signal.cancel();
  }, []);

  return (
    <ShoppingListPage
      selectedYear={selectedYear}
      selectedMonth={selectedMonth}
      setSelectedYear={setSelectedYear}
      setSelectedMonth={setSelectedMonth}
      currentItem={currentItem}
      setCurrentItem={setCurrentItem}
      currentYear={currentYear}
      currentMonth={currentMonth}
    />
  );
};

export default ShoppingListPageContainer;
