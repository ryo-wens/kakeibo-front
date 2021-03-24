import React from 'react';
import InputYears from '../../../../../components/modules/inputYears/InputYears';
import SwitchItemTabs from '../../../../../components/uikit/tabs/switchItemTabs/SwitchItemTabs';
import MonthlyImplementationDateTodoListContainer from '../../../../../containers/todo/modules/area/monthlyTodoListArea/Items/MonthlyImplementationDateTodoListContainer';
import MonthlyDueDateTodoListContainer from '../../../../../containers/todo/modules/area/monthlyTodoListArea/Items/MonthlyDueDateTodoListContainer';
import AddTodoListItemFormContainer from '../../../../../containers/todo/modules/form/AddTodoListItemFormContainer';
import styles from './MonthlyTodoListArea.module.scss';

interface MonthlyTodoListAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYear: string;
  currentMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyTodoListArea = (props: MonthlyTodoListAreaProps) => {
  return (
    <>
      <div className={styles.addButton}>
        <AddTodoListItemFormContainer
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
            leftButtonLabel={'実施予定のToDo'}
            rightButtonLabel={'締切予定のToDo'}
            leftItem={
              <MonthlyImplementationDateTodoListContainer
                selectedMonth={props.selectedMonth}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
                setEditing={props.setEditing}
              />
            }
            rightItem={
              <MonthlyDueDateTodoListContainer
                selectedMonth={props.selectedMonth}
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
                setEditing={props.setEditing}
              />
            }
            tabsBtnClassName={styles.childTabsBtn}
          />
        </div>
      </div>
    </>
  );
};

export default MonthlyTodoListArea;
