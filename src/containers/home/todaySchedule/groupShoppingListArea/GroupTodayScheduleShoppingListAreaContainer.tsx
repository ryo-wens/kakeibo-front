import React from 'react';
import GroupTodayScheduleShoppingListArea from '../../../../components/home/todaySchedule/groupShoppingListArea/GroupTodayScheduleShoppingListArea';
import { useSelector } from 'react-redux';
import {
  getGroupTodayShoppingList,
  getGroupTodayShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/selectors';

interface GroupTodayScheduleShoppingListAreaContainerProps {
  currentYear: string;
  currentMonth: string;
}

const GroupTodayScheduleShoppingListAreaContainer = (
  props: GroupTodayScheduleShoppingListAreaContainerProps
) => {
  const groupTodayShoppingList = useSelector(getGroupTodayShoppingList);
  const groupTodayShoppingListByCategories = useSelector(getGroupTodayShoppingListByCategories);

  return (
    <GroupTodayScheduleShoppingListArea
      todayShoppingList={groupTodayShoppingList}
      todayShoppingListByCategories={groupTodayShoppingListByCategories}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
    />
  );
};
export default GroupTodayScheduleShoppingListAreaContainer;
