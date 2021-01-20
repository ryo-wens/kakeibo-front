import React from 'react';
import './shopping-list-page.scss';
import SwitchTodayOrMonthlyTabs from './SwitchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabs';
import TodayShoppingListArea from './TodayShoppingListArea/TodayShoppingListArea';
import MonthlyShoppingListArea from './MonthlyShoppingListArea/MonthlyShoppingListArea';
import ExpiredShoppingListArea from './ExpiredShoppingListArea/ExpiredShoppingListArea';
import RegularShoppingListArea from './RegularShoppingListArea/RegularShoppingListArea';
import AddRegularShoppingListModal from '../uikit/Modal/AddRegularShoppingListModal/AddRegularShoppingListModal';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';

interface ShoppingListPageProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentItem: TodayOrMonthly;
  setCurrentItem: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
  currentYearMonth: string;
}

const ShoppingListPage = (props: ShoppingListPageProps) => {
  return (
    <div className="shopping-list-page">
      <div className="shopping-list-page__left">
        <div className="shopping-list-page__left-content">
          <SwitchTodayOrMonthlyTabs
            currentItems={props.currentItem}
            setCurrentItems={props.setCurrentItem}
            leftItem={<TodayShoppingListArea currentYearMonth={props.currentYearMonth} />}
            rightItem={
              <MonthlyShoppingListArea
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
                setSelectedYear={props.setSelectedYear}
                setSelectedMonth={props.setSelectedMonth}
                currentYearMonth={props.currentYearMonth}
              />
            }
          />
        </div>
      </div>
      <div className="shopping-list-page__right">
        <div className="shopping-list-page__right-content">
          <h4>定期買い物リスト</h4>
          <AddRegularShoppingListModal
            selectedYear={props.selectedYear}
            selectedMonth={props.selectedMonth}
          />
          <RegularShoppingListArea
            currentYearMonth={props.currentYearMonth}
            currentTodayOrMonthly={props.currentItem}
          />
        </div>
        <div className="shopping-list-page__right-content">
          <h4>期限切れ買い物リスト</h4>
          <ExpiredShoppingListArea currentYearMonth={props.currentYearMonth} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
