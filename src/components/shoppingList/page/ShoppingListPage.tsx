import React from 'react';
import './shopping-list-page.scss';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import TodayShoppingListAreaContainer from '../../../containers/shoppingList/page/TodayShoppingListArea/TodayShoppingListAreaContainer';
import MonthlyShoppingListAreaContainer from '../../../containers/shoppingList/page/MonthlyShoppingListArea/MonthlyShoppingListAreaContainer';
import ExpiredShoppingListAreaContainer from '../../../containers/shoppingList/page/ExpiredShoppingListArea/ExpiredShoppingListAreaContainer';
import RegularShoppingListAreaContainer from '../../../containers/shoppingList/page/RegularShoppingListArea/RegularShoppingListAreaContainer';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';
import AddRegularShoppingListItemModalContainer from '../../../containers/shoppingList/modules/Modal/AddRegularShoppingListItemModalContainer';

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
          <SwitchTodayOrMonthlyTabsContainer
            currentItem={props.currentItem}
            setCurrentItems={props.setCurrentItem}
            leftItem={<TodayShoppingListAreaContainer currentYearMonth={props.currentYearMonth} />}
            rightItem={
              <MonthlyShoppingListAreaContainer
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
          <AddRegularShoppingListItemModalContainer
            selectedYear={props.selectedYear}
            selectedMonth={props.selectedMonth}
          />
          <RegularShoppingListAreaContainer
            currentYearMonth={props.currentYearMonth}
            currentTodayOrMonthly={props.currentItem}
          />
        </div>
        <div className="shopping-list-page__right-content">
          <h4>期限切れ買い物リスト</h4>
          <ExpiredShoppingListAreaContainer currentYearMonth={props.currentYearMonth} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
