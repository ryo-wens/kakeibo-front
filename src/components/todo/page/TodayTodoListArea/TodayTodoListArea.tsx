import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import TodayImplementationDateTodoListContainer from '../../../../containers/todo/page/todayTodoListArea/Items/TodayImplementationDateTodoListContainer';
import TodayDueDateTodoListContainer from '../../../../containers/todo/page/todayTodoListArea/Items/TodayDueDateTodoListContainer';
import './today-todo-list-area.scss';
import AddTodoListItemFormContainer from '../../../../containers/todo/modules/form/AddTodoListItemFormContainer';

interface TodayTodoListAreaProps {
  currentYear: string;
  currentMonth: string;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayTodoListArea = (props: TodayTodoListAreaProps) => {
  return (
    <>
      <div className="today-todo-list-area__add-button">
        <AddTodoListItemFormContainer
          currentYear={props.currentYear}
          currentMonth={props.currentMonth}
        />
      </div>
      <div className="today-todo-list-area__switch-item">
        <div className="today-todo-list-area__switch-item--width">
          <SwitchItemTabs
            leftButtonLabel={'実施予定のToDo'}
            rightButtonLabel={'締切予定のToDo'}
            leftItem={
              <TodayImplementationDateTodoListContainer
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
                setEditing={props.setEditing}
              />
            }
            rightItem={
              <TodayDueDateTodoListContainer
                currentYear={props.currentYear}
                currentMonth={props.currentMonth}
                setEditing={props.setEditing}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default TodayTodoListArea;
