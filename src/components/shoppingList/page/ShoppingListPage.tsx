import React from 'react';
import styles from './ShoppingListPage.module.scss';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import TodayShoppingListAreaContainer from '../../../containers/shoppingList/modules/area/todayShoppingListArea/TodayShoppingListAreaContainer';
import MonthlyShoppingListAreaContainer from '../../../containers/shoppingList/modules/area/monthlyShoppingListArea/MonthlyShoppingListAreaContainer';
import ExpiredShoppingListAreaContainer from '../../../containers/shoppingList/modules/area/expiredShoppingListArea/ExpiredShoppingListAreaContainer';
import RegularShoppingListAreaContainer from '../../../containers/shoppingList/modules/area/regularShoppingListArea/RegularShoppingListAreaContainer';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';
import AddRegularShoppingListItemModalContainer from '../../../containers/shoppingList/modules/modal/AddRegularShoppingListItemModalContainer';

interface ShoppingListPageProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: string;
  currentMonth: string;
  currentItem: TodayOrMonthly;
  setCurrentItem: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
}

const ShoppingListPage = (props: ShoppingListPageProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftArea}>
        <div className={styles.leftContent}>
          <SwitchTodayOrMonthlyTabsContainer
            currentItem={props.currentItem}
            setCurrentItems={props.setCurrentItem}
            leftItem={
              <TodayShoppingListAreaContainer
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
              />
            }
            rightItem={
              <MonthlyShoppingListAreaContainer
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
          <h3>定期買い物リスト</h3>
          <AddRegularShoppingListItemModalContainer
            selectedYear={props.selectedYear}
            selectedMonth={props.selectedMonth}
            currentYear={props.currentYear}
            currentMonth={props.currentMonth}
            addBtnClassName={styles.childAddRegularBtn}
          />
          <RegularShoppingListAreaContainer
            currentYear={props.currentYear}
            currentMonth={props.currentMonth}
            currentTodayOrMonthly={props.currentItem}
          />
        </div>
        <div className={styles.rightContent}>
          <h3>期限切れ買い物リスト</h3>
          <ExpiredShoppingListAreaContainer
            currentYear={props.currentYear}
            currentMonth={props.currentMonth}
            readMoreBtnClassName={styles.childReadBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
