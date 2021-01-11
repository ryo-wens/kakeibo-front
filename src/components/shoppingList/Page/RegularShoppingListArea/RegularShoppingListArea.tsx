import React from 'react';
import { useSelector } from 'react-redux';
import { getRegularShoppingList } from '../../../../reducks/shoppingList/selectors';
import {
  RegularShoppingList,
  RegularShoppingListItem,
} from '../../../../reducks/shoppingList/types';
import RegularShoppingListItemComponent from '../../uikit/ListItem/RegularShoppingListItemComponent/RegularShoppingListItemComponent';
import './regular-shopping-list-area.scss';

interface RegularShoppingListAreaProps {
  currentYearMonth: string;
}

const RegularShoppingListArea = (props: RegularShoppingListAreaProps) => {
  const regularShoppingList: RegularShoppingList = useSelector(getRegularShoppingList);

  return (
    <div>
      <div className="regular-shopping-list-area">
        {regularShoppingList.length ? (
          regularShoppingList.map((listItem: RegularShoppingListItem) => {
            return (
              <div key={listItem.id}>
                <RegularShoppingListItemComponent
                  listItem={listItem}
                  currentYearMonth={props.currentYearMonth}
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
