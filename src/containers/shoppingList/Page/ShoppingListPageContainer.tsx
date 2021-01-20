import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenseCategories, getIncomeCategories } from '../../../reducks/categories/selectors';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import { month, year } from '../../../lib/constant';
import axios from 'axios';
import { fetchCategories } from '../../../reducks/categories/operations';
import ShoppingListPage from '../../../components/shoppingList/Page/ShoppingListPage';

const ShoppingListPageContainer = () => {
  const dispatch = useDispatch();
  const incomeCategories = useSelector(getIncomeCategories);
  const expenseCategories = useSelector(getExpenseCategories);

  const [currentItem, setCurrentItem] = useState<TodayOrMonthly>('today');
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  const currentMonth = (`0` + `${selectedMonth}`).slice(-2);
  const currentYearMonth = `${selectedYear}/${currentMonth}`;

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
      currentYearMonth={currentYearMonth}
    />
  );
};

export default ShoppingListPageContainer;
