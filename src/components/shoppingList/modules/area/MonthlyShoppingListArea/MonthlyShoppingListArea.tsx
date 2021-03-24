import React from 'react';
import SwitchItemTabs from '../../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import styles from './MonthlyShoppingListArea.module.scss';
import InputYears from '../../../../modules/inputYears/InputYears';
import AddShoppingListItemModalContainer from '../../../../../containers/shoppingList/modules/Modal/AddShoppingListItemModalContainer';
import MonthlyShoppingListByDateContainer from '../../../../../containers/shoppingList/page/MonthlyShoppingListArea/monthlyShoppingListByDateContainer/MonthlyShoppingListByDateContainer';
import MonthlyShoppingListByCategoriesContainer from '../../../../../containers/shoppingList/page/MonthlyShoppingListArea/monthlyShoppingListByCategoriesContainer/MonthlyShoppingListByCategoriesContainer';

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
      <div className={styles.addButton}>
        <AddShoppingListItemModalContainer
          currentYear={props.currentYear}
          currentMonth={props.currentMonth}
        />
      </div>
      <div className={styles.switchItem}>
        <div className={styles.switchItem__width}>
          <div className={styles.inputYears}>
            <InputYears
              currentPage={'todo'}
              selectedYear={props.selectedYear}
              selectedMonth={props.selectedMonth}
              setSelectedMonth={props.setSelectedMonth}
              setSelectedYear={props.setSelectedYear}
              btnClassName={styles.childInputYearsBtn}
              selectWrapperClassName={styles.childSelectWrapper}
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
            tabsBtnClassName={styles.childTabsBtn}
          />
        </div>
      </div>
    </>
  );
};

export default MonthlyShoppingListArea;
