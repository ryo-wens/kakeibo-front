import React from 'react';
import '../../../shoppingList/Page/RegularShoppingListArea/regular-shopping-list-area.scss';
import { useSelector } from 'react-redux';
import { getGroupRegularShoppingList } from '../../../../reducks/groupShoppingList/selectors';
import { GroupRegularShoppingListItem } from '../../../../reducks/groupShoppingList/types';
import { TodayOrMonthly } from '../../../../reducks/shoppingList/types';
import GroupRegularShoppingListItemComponent from '../../uikit/ListItem/GroupRegularShoppingListItemComponent/GroupRegularShoppingListItemComponent';

interface GroupRegularShoppingListAreaProps {
  currentYearMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const GroupRegularShoppingListArea = (props: GroupRegularShoppingListAreaProps) => {
  const groupRegularShoppingList = useSelector(getGroupRegularShoppingList);

  return (
    <div>
      <div className="regular-shopping-list-area">
        {groupRegularShoppingList.length ? (
          groupRegularShoppingList.map((listItem: GroupRegularShoppingListItem) => {
            return (
              <div key={listItem.id}>
                <GroupRegularShoppingListItemComponent
                  listItem={listItem}
                  currentYearMonth={props.currentYearMonth}
                  currentTodayOrMonthly={props.currentTodayOrMonthly}
                />
              </div>
            );
          })
        ) : (
          <p className="regular-shopping-list-area__message">
            定期買い物リストは登録されていません。
          </p>
        )}
      </div>
    </div>
  );
};

export default GroupRegularShoppingListArea;
