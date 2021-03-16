import React from 'react';
import styles from './ShoppingListPage.module.scss';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import TodayShoppingListAreaContainer from '../../../containers/shoppingList/page/TodayShoppingListArea/TodayShoppingListAreaContainer';
import MonthlyShoppingListAreaContainer from '../../../containers/shoppingList/page/MonthlyShoppingListArea/MonthlyShoppingListAreaContainer';
import ExpiredShoppingListAreaContainer from '../../../containers/shoppingList/page/ExpiredShoppingListArea/ExpiredShoppingListAreaContainer';
import RegularShoppingListAreaContainer from '../../../containers/shoppingList/page/regularShoppingListArea/RegularShoppingListAreaContainer';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';
import AddRegularShoppingListItemModalContainer from '../../../containers/shoppingList/modules/Modal/AddRegularShoppingListItemModalContainer';

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
          <h4>定期買い物リスト</h4>
          <AddRegularShoppingListItemModalContainer
            selectedYear={props.selectedYear}
            selectedMonth={props.selectedMonth}
            currentYear={props.currentYear}
            currentMonth={props.currentMonth}
          />
          <RegularShoppingListAreaContainer
            currentYear={props.currentYear}
            currentMonth={props.currentMonth}
            currentTodayOrMonthly={props.currentItem}
          />
        </div>
        <div className={styles.rightContent}>
          <h4>期限切れ買い物リスト</h4>
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
