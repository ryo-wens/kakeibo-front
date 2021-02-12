import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router';
import { fetchGroupExpiredShoppingList } from '../../../../reducks/groupShoppingList/operations';
import { getGroupExpiredShoppingList } from '../../../../reducks/groupShoppingList/selectors';
import GroupExpiredShoppingListArea from '../../../../components/groupShoppingList/page/expiredShoppingListArea/GroupExpiredShoppingListArea';
import { GroupShoppingList } from '../../../../reducks/groupShoppingList/types';

interface GroupExpiredShoppingListAreaContainerProps {
  currentYearMonth: string;
}

const GroupExpiredShoppingListAreaContainer = (
  props: GroupExpiredShoppingListAreaContainerProps
) => {
  const dispatch = useDispatch();
  const groupExpiredShoppingList = useSelector(getGroupExpiredShoppingList);
  const { group_id } = useParams();
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

  let prevDate = '';
  const equalsDisplayDate = (expectedPurchaseDate: string) => {
    if (prevDate !== expectedPurchaseDate) {
      prevDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  const sliceShoppingList = (shoppingList: GroupShoppingList, currentReadMore: boolean) => {
    if (shoppingList.length > initialDisplayNumberShoppingList && !currentReadMore) {
      return shoppingList.slice(0, 3);
    }
    return shoppingList;
  };

  const slicedExpiredShoppingList = sliceShoppingList(groupExpiredShoppingList, readMore);

  return (
    <GroupExpiredShoppingListArea
      expiredShoppingList={groupExpiredShoppingList}
      slicedExpiredShoppingList={slicedExpiredShoppingList}
      currentYearMonth={props.currentYearMonth}
      equalsDisplayDate={equalsDisplayDate}
      readMore={readMore}
      setReadMore={setReadMore}
      initialDisplayNumberShoppingList={initialDisplayNumberShoppingList}
    />
  );
};

export default GroupExpiredShoppingListAreaContainer;
