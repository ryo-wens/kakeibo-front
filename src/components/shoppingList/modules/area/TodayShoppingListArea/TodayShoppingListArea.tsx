import React from 'react';
import SwitchItemTabs from '../../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import styles from './TodayShoppingListArea.module.scss';
import AddShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/modal/AddShoppingListItemModalContainer';
import TodayShoppingListByDateContainer from '../../../../../containers/shoppingList/modules/area/todayShoppingListArea/TodayShoppingListByDateContainer/TodayShoppingListByDateContainer';
import TodayShoppingListByCategoriesContainer from '../../../../../containers/shoppingList/modules/area/todayShoppingListArea/TodayShoppingListByCategoriesContainer/TodayShoppingListByCategoriesContainer';

interface TodayShoppingListAreaProps {
  selectedYear: number;
  selectedMonth: number;
}

const TodayShoppingListArea = (props: TodayShoppingListAreaProps) => {
  return (
    <>
      <div className={styles.addButton}>
        <AddShoppingListItemModalContainer
          selectedYear={props.selectedYear}
          selectedMonth={props.selectedMonth}
        />
      </div>
      <div className={styles.switchItem}>
        <div className={styles.switchItem__width}>
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={
              <TodayShoppingListByDateContainer
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
              />
            }
            rightItem={
              <TodayShoppingListByCategoriesContainer
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
              />
            }
            tabsBtnClassName={styles.childTabsBtn}
          />
        </div>
      </div>
    </>
  );
};

export default TodayShoppingListArea;
