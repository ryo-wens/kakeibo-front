import React from 'react';
import '../../../shoppingList/page/RegularShoppingListArea/regular-shopping-list-area.scss';
import {
  GroupRegularShoppingList,
  GroupRegularShoppingListItem,
} from '../../../../reducks/groupShoppingList/types';
import { TodayOrMonthly } from '../../../../reducks/shoppingList/types';
import GroupRegularShoppingListItemComponentContainer from '../../../../containers/groupShoppingList/modules/listItem/regularShoppingListItemComponent/GroupRegularShoppingListItemComponentContainer';

interface GroupRegularShoppingListAreaProps {
  regularShoppingList: GroupRegularShoppingList;
  currentYearMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
}

const GroupRegularShoppingListArea = (props: GroupRegularShoppingListAreaProps) => {
  return (
    <div>
      <div className="regular-shopping-list-area">
        {props.regularShoppingList.length ? (
          props.regularShoppingList.map((listItem: GroupRegularShoppingListItem) => {
            return (
              <div className="regular-shopping-list-area__list-item" key={listItem.id}>
                <GroupRegularShoppingListItemComponentContainer
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
