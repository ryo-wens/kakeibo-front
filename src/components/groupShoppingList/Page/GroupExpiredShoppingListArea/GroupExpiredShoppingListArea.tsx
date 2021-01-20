import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../shoppingList/Page/ExpiredShoppingListArea/expired-shopping-list-area.scss';
import axios from 'axios';
import { useParams } from 'react-router';
import { fetchGroupExpiredShoppingList } from '../../../../reducks/groupShoppingList/operations';
import { getGroupExpiredShoppingList } from '../../../../reducks/groupShoppingList/selectors';
import GroupShoppingListItemComponent from '../../uikit/ListItem/GroupShoppingListItemComponent/GroupShoppingListItemComponent';

interface GroupExpiredShoppingListAreaProps {
  currentYearMonth: string;
}

const GroupExpiredShoppingListArea = (props: GroupExpiredShoppingListAreaProps) => {
  const dispatch = useDispatch();
  const groupExpiredShoppingList = useSelector(getGroupExpiredShoppingList);
  const { group_id } = useParams();

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

  return (
    <>
      <div>
        <div className="expired-shopping-list-area">
          {groupExpiredShoppingList.length ? (
            groupExpiredShoppingList.map((listItem) => {
              return (
                <div key={listItem.id}>
                  <GroupShoppingListItemComponent
                    listItem={listItem}
                    displayPurchaseDate={equalsDisplayDate(listItem.expected_purchase_date)}
                    currentYearMonth={props.currentYearMonth}
                  />
                </div>
              );
            })
          ) : (
            <p className="expired-shopping-list-area__message">
              期限切れの買い物リストはありません。
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default GroupExpiredShoppingListArea;
