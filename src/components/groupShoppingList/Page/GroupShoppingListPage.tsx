import React, { useEffect, useState } from 'react';
import '../../shoppingList/Page/shopping-list-page.scss';
import { month, year } from '../../../lib/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import SwitchTodayOrMonthlyTabs from '../../shoppingList/Page/SwitchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabs';
import GroupTodayShoppingListArea from './GroupTodayShoppingListArea/GroupTodayShoppingListArea';
import GroupMonthlyShoppingListArea from './GroupMonthlyShoppingListArea/GroupMonthlyShoppingListArea';
import GroupExpiredShoppingListArea from './GroupExpiredShoppingListArea/GroupExpiredShoppingListArea';
import GroupRegularShoppingListArea from './GroupRegularShoppingListArea/GroupRegularShoppingListArea';
import { fetchGroupCategories } from '../../../reducks/groupCategories/operations';
import AddGroupRegularShoppingListModal from '../uikit/Modal/AddGroupRegularShoppingListModal/AddGroupRegularShoppingListModal';

const GroupShoppingListPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [currentItems, setCurrentItems] = useState<TodayOrMonthly>('today');
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);

  const currentMonth = (`0` + `${selectedMonth}`).slice(-2);
  const currentYearMonth = `${selectedYear}/${currentMonth}`;

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroupCategories(Number(id), signal));
    return () => signal.cancel();
  }, []);

  return (
    <div className="shopping-list-page">
      <div className="shopping-list-page__left">
        <div className="shopping-list-page__left-content">
          <SwitchTodayOrMonthlyTabs
            currentItems={currentItems}
            setCurrentItems={setCurrentItems}
            leftItem={<GroupTodayShoppingListArea currentYearMonth={currentYearMonth} />}
            rightItem={
              <GroupMonthlyShoppingListArea
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
          <AddGroupRegularShoppingListModal currentYearMonth={currentYearMonth} />
          <GroupRegularShoppingListArea
            currentYearMonth={currentYearMonth}
            currentTodayOrMonthly={currentItems}
          />
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
