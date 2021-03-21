import React from 'react';
import { useSelector } from 'react-redux';
import { getTodayShoppingListByCategories } from '../../../../reducks/shoppingList/selectors';
import TodayScheduleShoppingListArea from '../../../../components/home/todaySchedule/shoppingListArea/TodayScheduleShoppingListArea';

interface TodayScheduleShoppingListAreaContainerProps {
  currentYear: string;
  currentMonth: string;
}

const TodayScheduleShoppingListAreaContainer = (
  props: TodayScheduleShoppingListAreaContainerProps
) => {
  const todayShoppingListByCategories = useSelector(getTodayShoppingListByCategories);

  return (
    <TodayScheduleShoppingListArea
      shoppingListByCategories={todayShoppingListByCategories}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      message={'今日の買い物リストは、登録されていません。'}
    />
  );
};
export default TodayScheduleShoppingListAreaContainer;
