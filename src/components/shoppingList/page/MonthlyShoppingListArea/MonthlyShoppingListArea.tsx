import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import './monthly-shopping-list-area.scss';
import InputYears from '../../../uikit/InputYears';
import AddShoppingListItemModalContainer from '../../../../containers/shoppingList/modules/Modal/AddShoppingListItemModalContainer';
import MonthlyShoppingListByDateContainer from '../../../../containers/shoppingList/page/MonthlyShoppingListArea/monthlyShoppingListByDateContainer/MonthlyShoppingListByDateContainer';
import MonthlyShoppingListByCategoriesContainer from '../../../../containers/shoppingList/page/MonthlyShoppingListArea/monthlyShoppingListByCategoriesContainer/MonthlyShoppingListByCategoriesContainer';

interface MonthlyShoppingListAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: string;
  currentMonth: string;
}

const MonthlyShoppingListArea = (props: MonthlyShoppingListAreaProps) => {
  return (
    <>
      <div className="monthly-shopping-list-area__add-button">
        <AddShoppingListItemModalContainer
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
              <MonthlyShoppingListByDateContainer
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
              />
            }
            rightItem={
              <MonthlyShoppingListByCategoriesContainer
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
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

export default MonthlyShoppingListArea;
