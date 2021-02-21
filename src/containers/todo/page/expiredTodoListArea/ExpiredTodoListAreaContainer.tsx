import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ExpiredTodoListArea from '../../../../components/todo/page/ExpiredTodoListArea/ExpiredTodoListArea';
import {
  getExpiredTodoList,
  getSlicedExpiredTodoList,
} from '../../../../reducks/todoList/selectors';
import {
  getGroupExpiredTodoList,
  getSlicedGroupExpiredTodoList,
} from '../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';
import { fetchExpiredTodoList } from '../../../../reducks/todoList/operations';
import { DisplayTodoList, DisplayTodoListItem } from '../../../../reducks/todoList/types';

interface ExpiredTodoListAreaContainerProps {
  currentYear: string;
  currentMonth: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpiredTodoListAreaContainer = (props: ExpiredTodoListAreaContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];

  const expiredTodoList = useSelector(getExpiredTodoList);
  const slicedExpiredTodoList = useSelector(getSlicedExpiredTodoList);
  const groupExpiredTodoList = useSelector(getGroupExpiredTodoList);
  const slicedGroupExpiredTodoList = useSelector(getSlicedGroupExpiredTodoList);

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (pathName !== 'group' && !expiredTodoList.length) {
      const signal = axios.CancelToken.source();
      dispatch(fetchExpiredTodoList(signal));
      return () => signal.cancel();
    }
  }, []);

  const generateDisplayTodoList = (
    expiredTodoList: DisplayTodoList,
    slicedTodoList: DisplayTodoList,
    readMore: boolean
  ) => {
    const initialDisplayNumberTodoList = 3;

    if (expiredTodoList.length > initialDisplayNumberTodoList && !readMore) {
      return slicedTodoList;
    }
    return expiredTodoList;
  };

  const displayExpiredTodoList: DisplayTodoListItem[] = generateDisplayTodoList(
    expiredTodoList,
    slicedExpiredTodoList,
    readMore
  );

  const groupDisplayExpiredTodoList: DisplayTodoListItem[] = generateDisplayTodoList(
    groupExpiredTodoList,
    slicedGroupExpiredTodoList,
    readMore
  );

  return (
    <ExpiredTodoListArea
      expiredTodoList={pathName === 'group' ? groupExpiredTodoList : expiredTodoList}
      displayExpiredTodoList={
        pathName === 'group' ? groupDisplayExpiredTodoList : displayExpiredTodoList
      }
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      readMore={readMore}
      setReadMore={setReadMore}
      setEditing={props.setEditing}
    />
  );
};

export default ExpiredTodoListAreaContainer;
