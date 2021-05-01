import React from 'react';
import { useSelector } from 'react-redux';
import { getGroupTodayShoppingListByCategories } from '../../../../reducks/groupShoppingList/selectors';
import GroupTodayScheduleShoppingListArea from '../../../../components/home/todaySchedule/groupShoppingListArea/GroupTodayScheduleShoppingListArea';

interface GroupTodayScheduleShoppingListAreaContainerProps {
  selectedYearParam: string;
  selectedMonthParam: string;
}

const GroupTodayScheduleShoppingListAreaContainer = (
  props: GroupTodayScheduleShoppingListAreaContainerProps
) => {
  const groupTodayShoppingListByCategories = useSelector(getGroupTodayShoppingListByCategories);

  return (
    <GroupTodayScheduleShoppingListArea
      shoppingListByCategories={groupTodayShoppingListByCategories}
      selectedYearParam={props.selectedYearParam}
      selectedMonthParam={props.selectedMonthParam}
      message={'今日の買い物リストは、登録されていません。'}
    />
  );
};
export default GroupTodayScheduleShoppingListAreaContainer;
