import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  getDisplayExpiredShoppingList,
  getExpiredShoppingList,
  getSlicedExpiredShoppingList,
} from '../../../../../reducks/shoppingList/selectors';
import { fetchExpiredShoppingList } from '../../../../../reducks/shoppingList/operations';
import ExpiredShoppingListArea from '../../../../../components/shoppingList/modules/area/ExpiredShoppingListArea/ExpiredShoppingListArea';
import { DisplayShoppingListByDate, ShoppingList } from '../../../../../reducks/shoppingList/types';
import { generateZeroPaddingMonth } from '../../../../../lib/date';

interface ExpiredShoppingListAreaContainerProps {
  selectedYear: number;
  selectedMonth: number;
  readMoreBtnClassName: string;
}

const ExpiredShoppingListAreaContainer = (props: ExpiredShoppingListAreaContainerProps) => {
  const dispatch = useDispatch();
  const expiredShoppingList = useSelector(getExpiredShoppingList);
  const displayExpiredShoppingList = useSelector(getDisplayExpiredShoppingList);
  const slicedExpiredShoppingList = useSelector(getSlicedExpiredShoppingList);

  const selectedYearParam = String(props.selectedYear);
  const selectedMonthParam = generateZeroPaddingMonth(props.selectedMonth);
  const initialDisplayNumberShoppingList = 3;

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const notExistsExpiredShoppingList = expiredShoppingList.length === 0;
    const signal = axios.CancelToken.source();

    if (notExistsExpiredShoppingList) {
      dispatch(fetchExpiredShoppingList(signal));
      return () => signal.cancel();
    }
  }, []);

  const selectDisplayShoppingList = (
    expiredShoppingList: ShoppingList,
    displayExpiredShoppingList: DisplayShoppingListByDate,
    slicedShoppingList: DisplayShoppingListByDate,
    readMore: boolean
  ) => {
    const initialDisplayNumberTodoList = 3;

    if (expiredShoppingList.length > initialDisplayNumberTodoList && !readMore) {
      return slicedShoppingList;
    }

    return displayExpiredShoppingList;
  };

  const displayShoppingList: DisplayShoppingListByDate = selectDisplayShoppingList(
    expiredShoppingList,
    displayExpiredShoppingList,
    slicedExpiredShoppingList,
    readMore
  );

  return (
    <ExpiredShoppingListArea
      expiredShoppingList={expiredShoppingList}
      displayExpiredShoppingList={displayShoppingList}
      selectedYearParam={selectedYearParam}
      selectedMonthParam={selectedMonthParam}
      readMore={readMore}
      setReadMore={setReadMore}
      initialDisplayNumberShoppingList={initialDisplayNumberShoppingList}
      readMoreBtnClassName={props.readMoreBtnClassName}
    />
  );
};

export default ExpiredShoppingListAreaContainer;
