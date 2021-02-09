import React from 'react';
import '../../shoppingList/page/shopping-list-page.scss';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import GroupTodayShoppingListArea from './GroupTodayShoppingListArea/GroupTodayShoppingListArea';
import GroupMonthlyShoppingListArea from './GroupMonthlyShoppingListArea/GroupMonthlyShoppingListArea';
import GroupExpiredShoppingListArea from './GroupExpiredShoppingListArea/GroupExpiredShoppingListArea';
import GroupRegularShoppingListArea from './GroupRegularShoppingListArea/GroupRegularShoppingListArea';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';
import AddGroupRegularShoppingListModalContainer from '../../../containers/groupShoppingList/modules/modal/AddGroupRegularShoppingListItemModalContainer';

interface GroupShoppingListPageProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentItem: TodayOrMonthly;
  setCurrentItem: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
  currentYearMonth: string;
}

const GroupShoppingListPage = (props: GroupShoppingListPageProps) => {
  return (
    <div className="shopping-list-page">
      <div className="shopping-list-page__left">
        <div className="shopping-list-page__left-content">
          <SwitchTodayOrMonthlyTabsContainer
            currentItem={props.currentItem}
            setCurrentItems={props.setCurrentItem}
            leftItem={<GroupTodayShoppingListArea currentYearMonth={props.currentYearMonth} />}
            rightItem={
              <GroupMonthlyShoppingListArea
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
                setSelectedYear={props.setSelectedYear}
                setSelectedMonth={props.setSelectedMonth}
              />
            }
          />
        </div>
      </div>
      <div className="shopping-list-page__right">
        <div className="shopping-list-page__right-content">
          <h4>定期買い物リスト</h4>
          <AddGroupRegularShoppingListModalContainer currentYearMonth={props.currentYearMonth} />
          <GroupRegularShoppingListArea
            currentYearMonth={props.currentYearMonth}
            currentTodayOrMonthly={props.currentItem}
          />
        </div>
        <div className="shopping-list-page__right-content">
          <h4>期限切れ買い物リスト</h4>
          <GroupExpiredShoppingListArea currentYearMonth={props.currentYearMonth} />
        </div>
      </div>
    </div>
  );
};

export default GroupShoppingListPage;
