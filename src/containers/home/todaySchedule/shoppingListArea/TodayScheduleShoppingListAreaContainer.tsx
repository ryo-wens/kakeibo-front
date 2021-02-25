import React from 'react';
import { useSelector } from 'react-redux';
import TodayScheduleShoppingListArea from '../../../../components/home/todaySchedule/shoppingListArea/TodayScheduleShoppingListArea';
import {
  getTodayShoppingList,
  getTodayShoppingListByCategories,
} from '../../../../reducks/shoppingList/selectors';

interface TodayScheduleShoppingListAreaContainerProps {
  currentYear: string;
  currentMonth: string;
}

const TodayScheduleShoppingListAreaContainer = (
  props: TodayScheduleShoppingListAreaContainerProps
) => {
  const todayShoppingList = useSelector(getTodayShoppingList);
  const todayShoppingListByCategories = useSelector(getTodayShoppingListByCategories);

  return (
    <TodayScheduleShoppingListArea
      todayShoppingList={todayShoppingList}
      todayShoppingListByCategories={todayShoppingListByCategories}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
    />
  );
};
export default TodayScheduleShoppingListAreaContainer;
