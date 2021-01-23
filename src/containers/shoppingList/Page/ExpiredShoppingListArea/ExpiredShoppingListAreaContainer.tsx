import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getExpiredShoppingList } from '../../../../reducks/shoppingList/selectors';
import { fetchExpiredShoppingList } from '../../../../reducks/shoppingList/operations';
import ExpiredShoppingListArea from '../../../../components/shoppingList/Page/ExpiredShoppingListArea/ExpiredShoppingListArea';
import { ShoppingList } from '../../../../reducks/shoppingList/types';

interface ExpiredShoppingListAreaContainerProps {
  currentYearMonth: string;
}

const ExpiredShoppingListAreaContainer = (props: ExpiredShoppingListAreaContainerProps) => {
  const dispatch = useDispatch();
  const expiredShoppingList = useSelector(getExpiredShoppingList);
  const initialDisplayNumberShoppingList = 3;

  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (!expiredShoppingList.length) {
      const signal = axios.CancelToken.source();
      dispatch(fetchExpiredShoppingList(signal));
      return () => signal.cancel();
    }
  }, []);

  const prevData = {
    expectedPurchaseDate: '',
  };

  const equalsDisplayDate = (expectedPurchaseDate: string) => {
    if (prevData.expectedPurchaseDate !== expectedPurchaseDate) {
      prevData.expectedPurchaseDate = expectedPurchaseDate;
      return true;
    }
    return false;
  };

  const sliceShoppingList = (shoppingList: ShoppingList, currentReadMore: boolean) => {
    if (shoppingList.length > initialDisplayNumberShoppingList && !currentReadMore) {
      return shoppingList.slice(0, 3);
    }
    return shoppingList;
  };

  const slicedExpiredShoppingList = sliceShoppingList(expiredShoppingList, readMore);

  return (
    <ExpiredShoppingListArea
      expiredShoppingList={expiredShoppingList}
      slicedExpiredShoppingList={slicedExpiredShoppingList}
      currentYearMonth={props.currentYearMonth}
      equalsDisplayDate={equalsDisplayDate}
      readMore={readMore}
      setReadMore={setReadMore}
      initialDisplayNumberShoppingList={initialDisplayNumberShoppingList}
    />
  );
};

export default ExpiredShoppingListAreaContainer;
