import React from 'react';
import GroupTodayScheduleShoppingListArea from '../../../../components/home/todaySchedule/groupShoppingListArea/GroupTodayScheduleShoppingListArea';
import { useSelector } from 'react-redux';
import {
  getGroupTodayShoppingList,
  getGroupTodayShoppingListByCategories,
} from '../../../../reducks/groupShoppingList/selectors';

interface GroupTodayScheduleShoppingListAreaContainerProps {
  currentYearMonth: string;
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
      currentYearMonth={props.currentYearMonth}
    />
  );
};
export default GroupTodayScheduleShoppingListAreaContainer;
