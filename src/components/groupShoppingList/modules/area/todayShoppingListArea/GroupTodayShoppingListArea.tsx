import React from 'react';
import SwitchItemTabs from '../../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import GroupTodayShoppingListByCategoriesContainer from '../../../../../containers/groupShoppingList/modules/area/todayShoppingListArea/todayShoppingListByCategoriesContainer/GroupTodayShoppingListByCategoriesContainer';
import AddGroupShoppingListItemModalContainer from '../../../../../containers/groupShoppingList/modules/modal/AddGroupShoppingListItemModalContainer';
import GroupTodayShoppingListByDateContainer from '../../../../../containers/groupShoppingList/modules/area/todayShoppingListArea/todayShoppingListByDateContainer/GroupTodayShoppingListByDateContainer';
import styles from '../../../../shoppingList/modules/area/TodayShoppingListArea/TodayShoppingListArea.module.scss';

interface GroupTodayShoppingListAreaProps {
  selectedYear: number;
  selectedMonth: number;
}

const GroupTodayShoppingListArea = (props: GroupTodayShoppingListAreaProps) => {
  return (
    <>
      <div className={styles.addButton}>
        <AddGroupShoppingListItemModalContainer
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
              <GroupTodayShoppingListByDateContainer
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
              />
            }
            rightItem={
              <GroupTodayShoppingListByCategoriesContainer
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

export default GroupTodayShoppingListArea;
