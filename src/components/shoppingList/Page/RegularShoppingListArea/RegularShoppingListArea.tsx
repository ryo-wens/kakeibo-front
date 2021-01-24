import React from 'react';
import {
  RegularShoppingList,
  RegularShoppingListItem,
  TodayOrMonthly,
} from '../../../../reducks/shoppingList/types';
import RegularShoppingListItemComponent from '../../modules/ListItem/RegularShoppingListItemComponent/RegularShoppingListItemComponent';
import './regular-shopping-list-area.scss';

interface RegularShoppingListAreaProps {
  currentYearMonth: string;
  currentTodayOrMonthly: TodayOrMonthly;
  regularShoppingList: RegularShoppingList;
}

const RegularShoppingListArea = (props: RegularShoppingListAreaProps) => {
  return (
    <div>
      <div className="regular-shopping-list-area">
        {props.regularShoppingList.length ? (
          props.regularShoppingList.map((listItem: RegularShoppingListItem) => {
            return (
              <div key={listItem.id}>
                <RegularShoppingListItemComponent
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

export default RegularShoppingListArea;
