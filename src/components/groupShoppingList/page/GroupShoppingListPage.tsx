import React from 'react';
import styles from '../../shoppingList/page/ShoppingListPage.module.scss';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import GroupTodayShoppingListArea from '../modules/area/todayShoppingListArea/GroupTodayShoppingListArea';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';
import AddGroupRegularShoppingListModalContainer from '../../../containers/groupShoppingList/modules/modal/AddGroupRegularShoppingListItemModalContainer';
import GroupRegularShoppingListAreaContainer from '../../../containers/groupShoppingList/modules/area/regularShoppingListArea/GroupRegularShoppingListAreaContainer';
import GroupMonthlyShoppingListAreaContainer from '../../../containers/groupShoppingList/modules/area/monthlyShoppingListArea/GroupMonthlyShoppingListAreaContainer';
import GroupExpiredShoppingListAreaContainer from '../../../containers/groupShoppingList/modules/area/expiredShoppingListArea/GroupExpiredShoppingListAreaContainer';

interface GroupShoppingListPageProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
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
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
              />
            }
            rightItem={
              <GroupMonthlyShoppingListAreaContainer
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
                setSelectedYear={props.setSelectedYear}
                setSelectedMonth={props.setSelectedMonth}
              />
            }
          />
        </div>
      </div>
      <div className={styles.rightArea}>
        <div className={styles.rightContent}>
          <h3>定期買い物リスト</h3>
          <AddGroupRegularShoppingListModalContainer
            selectedYear={props.selectedYear}
            selectedMonth={props.selectedMonth}
            addBtnClassName={styles.childAddRegularBtn}
          />
          <GroupRegularShoppingListAreaContainer
            selectedYear={props.selectedYear}
            selectedMonth={props.selectedMonth}
          />
        </div>
        <div className={styles.rightContent}>
          <h3>期限切れ買い物リスト</h3>
          <GroupExpiredShoppingListAreaContainer
            selectedYear={props.selectedYear}
            selectedMonth={props.selectedMonth}
            readMoreBtnClassName={styles.childReadBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupShoppingListPage;
