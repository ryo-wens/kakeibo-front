import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import {
  GroupShoppingList,
  GroupShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/types';
import GroupTodayScheduleShoppingListByDate from './todayScheduleShoppingListByDate/GroupTodayScheduleShoppingListByDate';
import GroupTodayScheduleShoppingListByCategories from './todayScheduleShoppingListByCategories/GroupTodayScheduleShoppingListByCategories';

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
        <GroupTodayScheduleShoppingListByDate
          shoppingListByDate={props.todayShoppingList}
          currentYear={props.currentYear}
          currentMonth={props.currentMonth}
          message={'今日の買い物リストは、登録されていません。'}
        />
      }
      rightItem={
        <GroupTodayScheduleShoppingListByCategories
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
