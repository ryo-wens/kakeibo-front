import React from 'react';
import SwitchItemTabs from '../../../uikit/tabs/switchItemTabs/SwitchItemTabs';
import TodayScheduleShoppingListByDate from '../shoppingListArea/todayScheduleShoppingListByDate/TodayScheduleShoppingListByDate';
import TodayScheduleShoppingListByCategories from '../shoppingListArea/todayScheduleShoppingListByCategories/TodayScheduleShoppingListByCategories';
import { ShoppingList, ShoppingListByCategories } from '../../../../reducks/shoppingList/types';

interface TodayScheduleShoppingListAreaProps {
  todayShoppingList: ShoppingList;
  todayShoppingListByCategories: ShoppingListByCategories;
  currentYearMonth: string;
}

const TodayScheduleShoppingListArea = (props: TodayScheduleShoppingListAreaProps) => {
  return (
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
  );
};
export default TodayScheduleShoppingListArea;
