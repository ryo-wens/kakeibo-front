import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import '../../../shoppingList/page/MonthlyShoppingListArea/monthly-shopping-list-area.scss';
import InputYears from '../../../uikit/InputYears';
import AddGroupShoppingListItemModalContainer from '../../../../containers/groupShoppingList/modules/modal/AddGroupShoppingListItemModalContainer';
import GroupMonthlyShoppingListByDateContainer from '../../../../containers/groupShoppingList/page/monthlyShoppingListArea/monthlyShoppingListByDateContainer/GroupMonthlyShoppingListByDateContainer';
import GroupMonthlyShoppingListByCategoriesContainer from '../../../../containers/groupShoppingList/page/monthlyShoppingListArea/monthlyShoppingListByCategoriesContainer/GroupMonthlyShoppingListByCategoriesContainer';

interface GroupMonthlyShoppingListAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYearMonth: string;
}

const GroupMonthlyShoppingListArea = (props: GroupMonthlyShoppingListAreaProps) => {
  return (
    <>
      <div className="monthly-shopping-list-area__add-button">
        <AddGroupShoppingListItemModalContainer currentYearMonth={props.currentYearMonth} />
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
              />
            }
            rightItem={
              <GroupMonthlyShoppingListByCategoriesContainer
                selectedMonth={props.selectedMonth}
                selectedYear={props.selectedYear}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default GroupMonthlyShoppingListArea;
