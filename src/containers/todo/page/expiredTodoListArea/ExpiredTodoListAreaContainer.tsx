import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ExpiredTodoListArea from '../../../../components/todo/Page/ExpiredTodoListArea/ExpiredTodoListArea';
import { TodoListItem } from '../../../../reducks/todoList/types';
import { GroupTodoListItem } from '../../../../reducks/groupTodoList/types';
import { getExpiredTodoList } from '../../../../reducks/todoList/selectors';
import { getGroupExpiredTodoList } from '../../../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';
import { fetchExpiredTodoList } from '../../../../reducks/todoList/operations';

interface ExpiredTodoListAreaContainerProps {
  currentYearMonth: string;
}

const ExpiredTodoListAreaContainer = (props: ExpiredTodoListAreaContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const initialDisplayNumberTodoList = 3;

  const expiredTodoList = useSelector(getExpiredTodoList);
  const groupExpiredTodoList = useSelector(getGroupExpiredTodoList);

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (pathName !== 'group' && !expiredTodoList.length) {
      const signal = axios.CancelToken.source();
      dispatch(fetchExpiredTodoList(signal));
      return () => signal.cancel();
    }
  }, []);

  const prevData = {
    dueDate: '',
  };

  const equalsDisplayDate = (listItem: TodoListItem | GroupTodoListItem) => {
    if (prevData.dueDate !== listItem.due_date) {
      prevData.dueDate = listItem.due_date;
      return true;
    }
    return false;
  };

  const displayDate = (listItem: TodoListItem | GroupTodoListItem) => {
    return listItem.due_date;
  };

  const sliceTodoList = (
    shoppingList: (TodoListItem | GroupTodoListItem)[],
    currentReadMore: boolean,
    initialDisplayNumber: number
  ) => {
    if (shoppingList.length > initialDisplayNumber && !currentReadMore) {
      return shoppingList.slice(0, initialDisplayNumber);
    }
    return shoppingList;
  };

  const slicedExpiredTodoList = sliceTodoList(
    pathName === 'group' ? groupExpiredTodoList : expiredTodoList,
    readMore,
    initialDisplayNumberTodoList
  );

  return (
    <ExpiredTodoListArea
      expiredTodoList={pathName === 'group' ? groupExpiredTodoList : expiredTodoList}
      slicedExpiredTodoList={slicedExpiredTodoList}
      currentYearMonth={props.currentYearMonth}
      equalsDisplayDate={equalsDisplayDate}
      displayDate={displayDate}
      readMore={readMore}
      setReadMore={setReadMore}
      initialDisplayNumberTodoList={initialDisplayNumberTodoList}
    />
  );
};

export default ExpiredTodoListAreaContainer;
