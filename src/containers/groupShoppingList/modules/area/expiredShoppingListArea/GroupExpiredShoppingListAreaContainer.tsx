import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router';
import { fetchGroupExpiredShoppingList } from '../../../../../reducks/groupShoppingList/operations';
import {
  getGroupDisplayExpiredShoppingList,
  getGroupExpiredShoppingList,
  getGroupSlicedExpiredShoppingList,
} from '../../../../../reducks/groupShoppingList/selectors';
import GroupExpiredShoppingListArea from '../../../../../components/groupShoppingList/modules/area/expiredShoppingListArea/GroupExpiredShoppingListArea';
import {
  GroupDisplayShoppingListByDate,
  GroupShoppingList,
} from '../../../../../reducks/groupShoppingList/types';
import { generateZeroPaddingMonth } from '../../../../../lib/date';

interface GroupExpiredShoppingListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  readMoreBtnClassName: string;
}

const GroupExpiredShoppingListAreaContainer = (
  props: GroupExpiredShoppingListAreaContainerProps
) => {
  const dispatch = useDispatch();
  const groupExpiredShoppingList = useSelector(getGroupExpiredShoppingList);
  const groupDisplayExpiredShoppingList = useSelector(getGroupDisplayExpiredShoppingList);
  const groupSlicedExpiredShoppingList = useSelector(getGroupSlicedExpiredShoppingList);
  const { group_id } = useParams<{ group_id: string }>();

  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);
  const initialDisplayNumberShoppingList = 3;

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    dispatch(fetchGroupExpiredShoppingList(Number(group_id), signal));

    const interval = setInterval(() => {
      dispatch(fetchGroupExpiredShoppingList(Number(group_id), signal));
    }, 3000);

    return () => {
      signal.cancel();
      clearInterval(interval);
    };
  }, []);

  const selectDisplayShoppingList = (
    expiredShoppingList: GroupShoppingList,
    displayExpiredShoppingList: GroupDisplayShoppingListByDate,
    slicedShoppingList: GroupDisplayShoppingListByDate,
    readMore: boolean
  ) => {
    const initialDisplayNumberTodoList = 3;

    if (expiredShoppingList.length > initialDisplayNumberTodoList && !readMore) {
      return slicedShoppingList;
    }

    return displayExpiredShoppingList;
  };

  const displayExpiredShoppingList: GroupDisplayShoppingListByDate = selectDisplayShoppingList(
    groupExpiredShoppingList,
    groupDisplayExpiredShoppingList,
    groupSlicedExpiredShoppingList,
    readMore
  );

  return (
    <GroupExpiredShoppingListArea
      expiredShoppingList={groupExpiredShoppingList}
      displayExpiredShoppingList={displayExpiredShoppingList}
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      readMore={readMore}
      setReadMore={setReadMore}
      initialDisplayNumberShoppingList={initialDisplayNumberShoppingList}
      readMoreBtnClassName={props.readMoreBtnClassName}
    />
  );
};

export default GroupExpiredShoppingListAreaContainer;
