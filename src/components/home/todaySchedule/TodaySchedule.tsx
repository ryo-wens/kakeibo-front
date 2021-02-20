import React from 'react';
import './today-schedule.scss';
import SwitchItemTabs from '../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import TodayScheduleTodoListArea from './todoListArea/TodayScheduleTodoListArea';
import { TodoListItem } from '../../../reducks/todoList/types';
import GroupTodayScheduleShoppingListAreaContainer from '../../../containers/home/todaySchedule/groupShoppingListArea/GroupTodayScheduleShoppingListAreaContainer';
import TodayScheduleShoppingListAreaContainer from '../../../containers/home/todaySchedule/shoppingListArea/TodayScheduleShoppingListAreaContainer';
import TodayScheduleTaskAreaContainer from '../../../containers/home/todaySchedule/taskArea/TodayScheduleTaskAreaContainer';

interface TodayScheduleProps {
  todoEditing: boolean;
  setTodoEditing: React.Dispatch<React.SetStateAction<boolean>>;
  pathName: string;
  currentYear: string;
  currentMonth: string;
  currentYearMonth: string;
  implementationTodoList: TodoListItem[];
  dueTodoList: TodoListItem[];
}

const TodaySchedule = (props: TodayScheduleProps) => {
  return (
    <div className="today-schedule">
      <h3 className="today-schedule__title">今日の予定</h3>
      <div className="today-schedule__content">
        <h4>Todoリスト</h4>
        <SwitchItemTabs
          leftButtonLabel={'実施予定のToDo'}
          rightButtonLabel={'締切予定のToDo'}
          leftItem={
            <TodayScheduleTodoListArea
              todoList={props.implementationTodoList}
              currentYear={props.currentYear}
              currentMonth={props.currentMonth}
              message={'今日の実施予定のToDoリストは、登録されていません。'}
              setEditing={props.setTodoEditing}
            />
          }
          rightItem={
            <TodayScheduleTodoListArea
              todoList={props.dueTodoList}
              currentYear={props.currentYear}
              currentMonth={props.currentMonth}
              message={'今日の締切予定のToDoリストは、登録されていません。'}
              setEditing={props.setTodoEditing}
            />
          }
        />
      </div>
      <div className="today-schedule__content">
        <h4>買い物リスト</h4>
        {props.pathName === 'group' ? (
          <GroupTodayScheduleShoppingListAreaContainer currentYearMonth={props.currentYearMonth} />
        ) : (
          <TodayScheduleShoppingListAreaContainer currentYearMonth={props.currentYearMonth} />
        )}
      </div>
      {props.pathName === 'group' && (
        <div className="today-schedule__content">
          <h4>タスク</h4>
          <TodayScheduleTaskAreaContainer />
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
