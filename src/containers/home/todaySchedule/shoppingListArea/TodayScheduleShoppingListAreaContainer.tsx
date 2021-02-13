import React from 'react';
import { useSelector } from 'react-redux';
import TodayScheduleShoppingListArea from '../../../../components/home/todaySchedule/shoppingListArea/TodayScheduleShoppingListArea';
import {
  getTodayShoppingList,
  getTodayShoppingListByCategories,
} from '../../../../reducks/shoppingList/selectors';

interface TodayScheduleShoppingListAreaContainerProps {
  currentYearMonth: string;
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
      currentYearMonth={props.currentYearMonth}
    />
  );
};
export default TodayScheduleShoppingListAreaContainer;
