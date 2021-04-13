import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ExpiredTodoListArea from '../../../../../components/todo/modules/area/expiredTodoListArea/ExpiredTodoListArea';
import {
  getExpiredTodoList,
  getSlicedExpiredTodoList,
} from '../../../../../reducks/todoList/selectors';
import {
  getGroupExpiredTodoList,
  getSlicedGroupExpiredTodoList,
} from '../../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';
import { fetchExpiredTodoList } from '../../../../../reducks/todoList/operations';
import { DisplayTodoList, DisplayTodoListItem } from '../../../../../reducks/todoList/types';
import { generateZeroPaddingMonth } from '../../../../../lib/date';

interface ExpiredTodoListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  readMoreBtnClassName: string;
}

const ExpiredTodoListAreaContainer = (props: ExpiredTodoListAreaContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);

  const expiredTodoList = useSelector(getExpiredTodoList);
  const groupExpiredTodoList = useSelector(getGroupExpiredTodoList);
  const slicedExpiredTodoList = useSelector(getSlicedExpiredTodoList);
  const slicedGroupExpiredTodoList = useSelector(getSlicedGroupExpiredTodoList);

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (pathName !== 'group') {
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

  const determineTodoList = (
    pathName: string,
    todoList: DisplayTodoList,
    groupTodoList: DisplayTodoList
  ) => {
    if (pathName === 'group') {
      return groupTodoList;
    }

    return todoList;
  };

  const todoList: DisplayTodoList = determineTodoList(
    pathName,
    expiredTodoList,
    groupExpiredTodoList
  );

  const displayTodoList: DisplayTodoList = determineTodoList(
    pathName,
    displayExpiredTodoList,
    groupDisplayExpiredTodoList
  );

  return (
    <ExpiredTodoListArea
      expiredTodoList={todoList}
      displayExpiredTodoList={displayTodoList}
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      readMore={readMore}
      setReadMore={setReadMore}
      setEditing={props.setEditing}
      readMoreBtnClassName={props.readMoreBtnClassName}
    />
  );
};

export default ExpiredTodoListAreaContainer;
