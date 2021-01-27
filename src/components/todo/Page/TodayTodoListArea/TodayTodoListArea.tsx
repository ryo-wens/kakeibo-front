import React from 'react';
import { date } from '../../../../lib/constant';
import { AddTodo } from '../../index';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import TodayImplementationDateTodoListContainer from '../../../../containers/todo/page/TodayTodoListArea/Items/TodayImplementationDateTodoListContainer';
import TodayDueDateTodoListContainer from '../../../../containers/todo/page/TodayTodoListArea/Items/TodayDueDateTodoListContainer';
import './today-todo-list-area.scss';

interface TodayTodoListAreaProps {
  currentYearMonth: string;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodayTodoListArea = (props: TodayTodoListAreaProps) => {
  return (
    <>
      <div className="today-todo-list-area__add-button">
        <AddTodo date={date} />
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
