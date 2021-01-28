import React from 'react';
import { date } from '../../../../lib/constant';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import TodayImplementationDateTodoListContainer from '../../../../containers/todo/page/todayTodoListArea/Items/TodayImplementationDateTodoListContainer';
import TodayDueDateTodoListContainer from '../../../../containers/todo/page/todayTodoListArea/Items/TodayDueDateTodoListContainer';
import './today-todo-list-area.scss';
import AddTodoListItemFormContainer from '../../../../containers/todo/modules/Form/AddTodoListItemFormContainer';

interface TodayTodoListAreaProps {
  currentYearMonth: string;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayTodoListArea = (props: TodayTodoListAreaProps) => {
  return (
    <>
      <div className="today-todo-list-area__add-button">
        <AddTodoListItemFormContainer date={date} />
      </div>
      <div className="today-todo-list-area__switch-item">
        <div className="today-todo-list-area__switch-item--width">
          <SwitchItemTabs
            leftButtonLabel={'実施予定のToDo'}
            rightButtonLabel={'締切予定のToDo'}
            leftItem={
              <TodayImplementationDateTodoListContainer
                currentYearMonth={props.currentYearMonth}
                setEditing={props.setEditing}
              />
            }
            rightItem={
              <TodayDueDateTodoListContainer
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

export default TodayTodoListArea;
