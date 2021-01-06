import React from 'react';
import './shopping-list-page.scss';
import SwitchTodayOrMonthlyTabs from './SwitchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabs';
import TodayShoppingArea from './TodayShoppingArea/TodayShoppingArea';
import MonthlyShoppingArea from './MonthlyShoppingArea/MonthlyShoppingArea';

const ShoppingListPage = () => {
  return (
    <div className="shopping-list-page">
      <div className="shopping-list-page__left">
        <div className="shopping-list-page__left-content">
          <SwitchTodayOrMonthlyTabs
            leftItem={<TodayShoppingArea />}
            rightItem={<MonthlyShoppingArea />}
          />
        </div>
      </div>
      <div className="shopping-list-page__right">
        <div className="shopping-list-page__right-content">
          <h4>定期買い物リスト</h4>
        </div>
        <div className="shopping-list-page__right-content">
          <h4>期限切れ買い物リスト</h4>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
