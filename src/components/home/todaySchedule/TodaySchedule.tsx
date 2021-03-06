import React from 'react';
import styles from './TodaySchedule.module.scss';
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
  selectedYearParam: string;
  selectedMonthParam: string;
  implementationTodoList: TodoListItem[];
  dueTodoList: TodoListItem[];
}

const TodaySchedule = (props: TodayScheduleProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>今日の予定</h3>
      <div className={styles.content}>
        <h4>ToDoリスト</h4>
        <SwitchItemTabs
          leftButtonLabel={'実施予定のToDo'}
          rightButtonLabel={'締切予定のToDo'}
          leftItem={
            <TodayScheduleTodoListArea
              todoList={props.implementationTodoList}
              selectedYearParam={props.selectedYearParam}
              selectedMonthParam={props.selectedMonthParam}
              message={'今日の実施予定のToDoリストは、登録されていません。'}
              setEditing={props.setTodoEditing}
            />
          }
          rightItem={
            <TodayScheduleTodoListArea
              todoList={props.dueTodoList}
              selectedYearParam={props.selectedYearParam}
              selectedMonthParam={props.selectedMonthParam}
              message={'今日の締切予定のToDoリストは、登録されていません。'}
              setEditing={props.setTodoEditing}
            />
          }
          tabsBtnClassName={styles.childTabsBtn}
        />
      </div>
      <div className={styles.content}>
        <h4>買い物リスト</h4>
        {props.pathName === 'group' ? (
          <GroupTodayScheduleShoppingListAreaContainer
            selectedYearParam={props.selectedYearParam}
            selectedMonthParam={props.selectedMonthParam}
          />
        ) : (
          <TodayScheduleShoppingListAreaContainer
            selectedYearParam={props.selectedYearParam}
            selectedMonthParam={props.selectedMonthParam}
          />
        )}
      </div>
      {props.pathName === 'group' && (
        <div className={styles.content}>
          <h4>タスク</h4>
          <TodayScheduleTaskAreaContainer />
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
