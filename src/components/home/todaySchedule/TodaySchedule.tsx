import React from 'react';
import './today-schedule.scss';
import SwitchItemTabs from '../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import TodayScheduleShoppingListByDate from './shoppingListArea/todayScheduleShoppingListByDate/TodayScheduleShoppingListByDate';
import TodayScheduleShoppingListByCategories from './shoppingListArea/todayScheduleShoppingListByCategories/TodayScheduleShoppingListByCategories';
import TodayScheduleTodoList from './todoListArea/TodayScheduleTodoList';
import { TodoListItem } from '../../../reducks/todoList/types';
import { GroupTodoListItem } from '../../../reducks/groupTodoList/types';
import { ShoppingList, ShoppingListByCategories } from '../../../reducks/shoppingList/types';

interface TodayScheduleProps {
  todoEditing: boolean;
  setTodoEditing: React.Dispatch<React.SetStateAction<boolean>>;
  pathName: string;
  currentYearMonth: string;
  implementationTodoList: (TodoListItem | GroupTodoListItem)[];
  dueTodoList: (TodoListItem | GroupTodoListItem)[];
  todayShoppingList: ShoppingList;
  todayShoppingListByCategories: ShoppingListByCategories;
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
            <TodayScheduleTodoList
              todoList={props.implementationTodoList}
              currentYearMonth={props.currentYearMonth}
              message={'今日の実施予定のToDoリストは、登録されていません。'}
              setEditing={props.setTodoEditing}
            />
          }
          rightItem={
            <TodayScheduleTodoList
              todoList={props.dueTodoList}
              currentYearMonth={props.currentYearMonth}
              message={'今日の実施予定のToDoリストは、登録されていません。'}
              setEditing={props.setTodoEditing}
            />
          }
        />
      </div>
      <div className="today-schedule__content">
        <h4>買い物リスト</h4>
        <SwitchItemTabs
          leftButtonLabel={'日別'}
          rightButtonLabel={'カテゴリ別'}
          leftItem={
            <TodayScheduleShoppingListByDate
              shoppingListByDate={props.todayShoppingList}
              currentYearMonth={props.currentYearMonth}
              message={'今日の買い物リストは、登録されていません。'}
            />
          }
          rightItem={
            <TodayScheduleShoppingListByCategories
              shoppingListByCategories={props.todayShoppingListByCategories}
              currentYearMonth={props.currentYearMonth}
              message={'今日の買い物リストは、登録されていません。'}
            />
          }
        />
      </div>
      {props.pathName === 'group' && (
        <div className="today-schedule__content">
          <h4>割り当てられたタスク</h4>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;
