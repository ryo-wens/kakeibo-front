import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import '../../../shoppingList/page/MonthlyShoppingListArea/MonthlyShoppingListArea.module.scss';
import InputYears from '../../../modules/InputYears';
import AddGroupShoppingListItemModalContainer from '../../../../containers/groupShoppingList/modules/modal/AddGroupShoppingListItemModalContainer';
import GroupMonthlyShoppingListByDateContainer from '../../../../containers/groupShoppingList/page/monthlyShoppingListArea/monthlyShoppingListByDateContainer/GroupMonthlyShoppingListByDateContainer';
import GroupMonthlyShoppingListByCategoriesContainer from '../../../../containers/groupShoppingList/page/monthlyShoppingListArea/monthlyShoppingListByCategoriesContainer/GroupMonthlyShoppingListByCategoriesContainer';

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
      <div className="monthly-shopping-list-area__add-button">
        <AddGroupShoppingListItemModalContainer
          currentYear={props.currentYear}
          currentMonth={props.currentMonth}
        />
      </div>
      <div className="monthly-shopping-list-area__switch-item">
        <div className="monthly-shopping-list-area__switch-item--width">
          <div className="monthly-shopping-list-area__input-years">
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
