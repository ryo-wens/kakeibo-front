import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import GroupTodayShoppingListByCategoriesContainer from '../../../../containers/groupShoppingList/page/todayShoppingListArea/todayShoppingListByCategoriesContainer/GroupTodayShoppingListByCategoriesContainer';
import AddGroupShoppingListItemModalContainer from '../../../../containers/groupShoppingList/modules/modal/AddGroupShoppingListItemModalContainer';
import GroupTodayShoppingListByDateContainer from '../../../../containers/groupShoppingList/page/todayShoppingListArea/todayShoppingListByDateContainer/GroupTodayShoppingListByDateContainer';
import styles from '../../../shoppingList/page/TodayShoppingListArea/TodayShoppingListArea.module.scss';

interface GroupTodayShoppingListAreaProps {
  currentYear: string;
  currentMonth: string;
}

const GroupTodayShoppingListArea = (props: GroupTodayShoppingListAreaProps) => {
  return (
    <>
      <div className={styles.addButton}>
        <AddGroupShoppingListItemModalContainer
          currentYear={props.currentYear}
          currentMonth={props.currentMonth}
        />
      </div>
      <div className={styles.switchItem}>
        <div className={styles.switchItem__width}>
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={
              <GroupTodayShoppingListByDateContainer
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
              />
            }
            rightItem={
              <GroupTodayShoppingListByCategoriesContainer
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
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
