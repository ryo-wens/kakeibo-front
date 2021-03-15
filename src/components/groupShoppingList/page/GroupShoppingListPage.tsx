import React from 'react';
import styles from '../../shoppingList/page/ShoppingListPage.module.scss';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import GroupTodayShoppingListArea from './todayShoppingListArea/GroupTodayShoppingListArea';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';
import AddGroupRegularShoppingListModalContainer from '../../../containers/groupShoppingList/modules/modal/AddGroupRegularShoppingListItemModalContainer';
import GroupRegularShoppingListAreaContainer from '../../../containers/groupShoppingList/page/regularShoppingListArea/GroupRegularShoppingListAreaContainer';
import GroupMonthlyShoppingListAreaContainer from '../../../containers/groupShoppingList/page/monthlyShoppingListArea/GroupMonthlyShoppingListAreaContainer';
import GroupExpiredShoppingListAreaContainer from '../../../containers/groupShoppingList/page/expiredShoppingListArea/GroupExpiredShoppingListAreaContainer';

interface GroupShoppingListPageProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: string;
  currentMonth: string;
  currentItem: TodayOrMonthly;
  setCurrentItem: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
}

const GroupShoppingListPage = (props: GroupShoppingListPageProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftArea}>
        <div className={styles.leftContent}>
          <SwitchTodayOrMonthlyTabsContainer
            currentItem={props.currentItem}
            setCurrentItems={props.setCurrentItem}
            leftItem={
              <GroupTodayShoppingListArea
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
              />
            }
            rightItem={
              <GroupMonthlyShoppingListAreaContainer
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
                setSelectedYear={props.setSelectedYear}
                setSelectedMonth={props.setSelectedMonth}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
              />
            }
          />
        </div>
      </div>
      <div className={styles.rightArea}>
        <div className={styles.rightContent}>
          <h4>定期買い物リスト</h4>
          <AddGroupRegularShoppingListModalContainer
            currentYear={props.currentYear}
            currentMonth={props.currentMonth}
          />
          <GroupRegularShoppingListAreaContainer
            currentYear={props.currentYear}
            currentMonth={props.currentMonth}
            currentTodayOrMonthly={props.currentItem}
          />
        </div>
        <div className={styles.rightContent}>
          <h4>期限切れ買い物リスト</h4>
          <GroupExpiredShoppingListAreaContainer
            currentYear={props.currentYear}
            currentMonth={props.currentMonth}
            readMoreBtnClassName={styles.childReadBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupShoppingListPage;
