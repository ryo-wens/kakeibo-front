import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router';
import { fetchGroupExpiredShoppingList } from '../../../../reducks/groupShoppingList/operations';
import {
  getGroupDisplayExpiredShoppingList,
  getGroupSlicedExpiredShoppingList,
} from '../../../../reducks/groupShoppingList/selectors';
import GroupExpiredShoppingListArea from '../../../../components/groupShoppingList/page/expiredShoppingListArea/GroupExpiredShoppingListArea';
import { GroupDisplayShoppingListByDate } from '../../../../reducks/groupShoppingList/types';

interface GroupExpiredShoppingListAreaContainerProps {
  currentYear: string;
  currentMonth: string;
  readMoreBtnClassName: string;
}

const GroupExpiredShoppingListAreaContainer = (
  props: GroupExpiredShoppingListAreaContainerProps
) => {
  const dispatch = useDispatch();
  const groupExpiredShoppingList = useSelector(getGroupDisplayExpiredShoppingList);
  const groupSlicedExpiredShoppingList = useSelector(getGroupSlicedExpiredShoppingList);
  const { group_id } = useParams<{ group_id: string }>();
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
    expiredShoppingList: GroupDisplayShoppingListByDate,
    slicedShoppingList: GroupDisplayShoppingListByDate,
    readMore: boolean
  ) => {
    const initialDisplayNumberTodoList = 3;

    if (expiredShoppingList.length > initialDisplayNumberTodoList && !readMore) {
      return slicedShoppingList;
    }

    return expiredShoppingList;
  };

  const displayExpiredShoppingList: GroupDisplayShoppingListByDate = selectDisplayShoppingList(
    groupExpiredShoppingList,
    groupSlicedExpiredShoppingList,
    readMore
  );

  return (
    <GroupExpiredShoppingListArea
      expiredShoppingList={groupExpiredShoppingList}
      displayExpiredShoppingList={displayExpiredShoppingList}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      readMore={readMore}
      setReadMore={setReadMore}
      initialDisplayNumberShoppingList={initialDisplayNumberShoppingList}
      readMoreBtnClassName={props.readMoreBtnClassName}
    />
  );
};

export default GroupExpiredShoppingListAreaContainer;
