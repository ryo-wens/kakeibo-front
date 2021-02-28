import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import TodayScheduleShoppingListByDate from '../shoppingListArea/todayScheduleShoppingListByDate/TodayScheduleShoppingListByDate';
import TodayScheduleShoppingListByCategories from '../shoppingListArea/todayScheduleShoppingListByCategories/TodayScheduleShoppingListByCategories';
import {
  GroupShoppingList,
  GroupShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/types';

interface GroupTodayScheduleShoppingListAreaProps {
  todayShoppingList: GroupShoppingList;
  todayShoppingListByCategories: GroupShoppingListByCategories;
  currentYear: string;
  currentMonth: string;
}

const GroupTodayScheduleShoppingListArea = (props: GroupTodayScheduleShoppingListAreaProps) => {
  return (
    <SwitchItemTabs
      leftButtonLabel={'日別'}
      rightButtonLabel={'カテゴリ別'}
      leftItem={
        <TodayScheduleShoppingListByDate
          shoppingListByDate={props.todayShoppingList}
          currentYear={props.currentYear}
          currentMonth={props.currentMonth}
          message={'今日の買い物リストは、登録されていません。'}
        />
      }
      rightItem={
        <TodayScheduleShoppingListByCategories
          shoppingListByCategories={props.todayShoppingListByCategories}
          currentYear={props.currentYear}
          currentMonth={props.currentMonth}
          message={'今日の買い物リストは、登録されていません。'}
        />
      }
    />
  );
};
export default GroupTodayScheduleShoppingListArea;
