import React, { useEffect, useState } from 'react';
import { month, year } from '../../../lib/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import { fetchGroupCategories } from '../../../reducks/groupCategories/operations';
import GroupShoppingListPage from '../../../components/groupShoppingList/Page/GroupShoppingListPage';

const GroupShoppingListPageContainer = () => {
  const dispatch = useDispatch();
  const { group_id } = useParams();

  const [currentItem, setCurrentItem] = useState<TodayOrMonthly>('today');
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  const currentMonth = (`0` + `${selectedMonth}`).slice(-2);
  const currentYearMonth = `${selectedYear}/${currentMonth}`;

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroupCategories(Number(group_id), signal));
    return () => signal.cancel();
  }, []);

  return (
    <GroupShoppingListPage
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

export default GroupShoppingListPageContainer;
