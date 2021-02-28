import React from 'react';
import {
  RegularShoppingList,
  RegularShoppingListItem,
  TodayOrMonthly,
} from '../../../../reducks/shoppingList/types';
import './regular-shopping-list-area.scss';
import RegularShoppingListItemComponentContainer from '../../../../containers/shoppingList/modules/ListItem/RegularShoppingListItemComponentContainer/RegularShoppingListItemComponentContainer';

interface RegularShoppingListAreaProps {
  currentYear: string;
  currentMonth: string;
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
              <div className="regular-shopping-list-area__list-item" key={listItem.id}>
                <RegularShoppingListItemComponentContainer
                  listItem={listItem}
                  currentYear={props.currentYear}
                  currentMonth={props.currentMonth}
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
