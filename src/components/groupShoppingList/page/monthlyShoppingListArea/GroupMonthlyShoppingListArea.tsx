import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import InputYears from '../../../modules/InputYears';
import AddGroupShoppingListItemModalContainer from '../../../../containers/groupShoppingList/modules/modal/AddGroupShoppingListItemModalContainer';
import GroupMonthlyShoppingListByDateContainer from '../../../../containers/groupShoppingList/page/monthlyShoppingListArea/monthlyShoppingListByDateContainer/GroupMonthlyShoppingListByDateContainer';
import GroupMonthlyShoppingListByCategoriesContainer from '../../../../containers/groupShoppingList/page/monthlyShoppingListArea/monthlyShoppingListByCategoriesContainer/GroupMonthlyShoppingListByCategoriesContainer';
import styles from '../../../shoppingList/page/MonthlyShoppingListArea/MonthlyShoppingListArea.module.scss';

interface GroupMonthlyShoppingListAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: string;
  currentMonth: string;
}

const GroupMonthlyShoppingListArea = (props: GroupMonthlyShoppingListAreaProps) => {
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
          <div className={styles.inputYears}>
            <InputYears
              selectedYear={props.selectedYear}
              selectedMonth={props.selectedMonth}
              setSelectedMonth={props.setSelectedMonth}
              setSelectedYear={props.setSelectedYear}
            />
          </div>
          <SwitchItemTabs
            leftButtonLabel={'日別'}
            rightButtonLabel={'カテゴリ別'}
            leftItem={
              <GroupMonthlyShoppingListByDateContainer
                selectedMonth={props.selectedMonth}
                selectedYear={props.selectedYear}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
              />
            }
            rightItem={
              <GroupMonthlyShoppingListByCategoriesContainer
                selectedMonth={props.selectedMonth}
                selectedYear={props.selectedYear}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default GroupMonthlyShoppingListArea;
