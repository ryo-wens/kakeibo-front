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
  selectedYearParam: string;
  selectedMonthParam: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyTodoListArea = (props: MonthlyTodoListAreaProps) => {
  return (
    <>
      <div className={styles.addButton}>
        <AddTodoListItemFormContainer
          selectedYearParam={props.selectedYearParam}
          selectedMonthParam={props.selectedMonthParam}
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
                selectedYearParam={props.selectedYearParam}
                selectedMonthParam={props.selectedMonthParam}
                setEditing={props.setEditing}
              />
            }
            rightItem={
              <MonthlyDueDateTodoListContainer
                selectedMonth={props.selectedMonth}
                selectedYearParam={props.selectedYearParam}
                selectedMonthParam={props.selectedMonthParam}
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
