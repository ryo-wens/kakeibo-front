import React from 'react';
import InputYears from '../../../uikit/InputYears';
import './monthly-todo-list-area.scss';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import MonthlyImplementationDateTodoListContainer from '../../../../containers/todo/page/monthlyTodoListArea/Items/MonthlyImplementationDateTodoListContainer';
import MonthlyDueDateTodoListContainer from '../../../../containers/todo/page/monthlyTodoListArea/Items/MonthlyDueDateTodoListContainer';
import { date } from '../../../../lib/constant';
import AddTodoListItemFormContainer from '../../../../containers/todo/modules/form/AddTodoListItemFormContainer';

interface MonthlyTodoListAreaProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentYearMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthlyTodoListArea = (props: MonthlyTodoListAreaProps) => {
  return (
    <>
      <div className="monthly-todo-list-area__add-button">
        <AddTodoListItemFormContainer date={date} />
      </div>
      <div className="monthly-todo-list-area__switch-item">
        <div className="monthly-todo-list-area__switch-item--width">
          <div className="monthly-todo-list-area__input-years">
            <InputYears
              selectedYear={props.selectedYear}
              selectedMonth={props.selectedMonth}
              setSelectedMonth={props.setSelectedMonth}
              setSelectedYear={props.setSelectedYear}
            />
          </div>
          <SwitchItemTabs
            leftButtonLabel={'実施予定のToDo'}
            rightButtonLabel={'締切予定のToDo'}
            leftItem={
              <MonthlyImplementationDateTodoListContainer
                selectedMonth={props.selectedMonth}
                currentYearMonth={props.currentYearMonth}
                setEditing={props.setEditing}
              />
            }
            rightItem={
              <MonthlyDueDateTodoListContainer
                selectedMonth={props.selectedMonth}
                currentYearMonth={props.currentYearMonth}
                setEditing={props.setEditing}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default MonthlyTodoListArea;
