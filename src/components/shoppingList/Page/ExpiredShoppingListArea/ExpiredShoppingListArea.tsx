import React from 'react';
import './expired-shopping-list-area.scss';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ShoppingListItemComponent from '../../modules/ListItem/ShoppingListItemComponent/ShoppingListItemComponent';
import { ShoppingList } from '../../../../reducks/shoppingList/types';

interface ExpiredShoppingListAreaProps {
  expiredShoppingList: ShoppingList;
  slicedExpiredShoppingList: ShoppingList;
  currentYearMonth: string;
  equalsDisplayDate: (date: string) => boolean;
  readMore: boolean;
  setReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  initialDisplayNumberShoppingList: number;
}

const ExpiredShoppingListArea = (props: ExpiredShoppingListAreaProps) => {
  return (
    <div>
      <div className="expired-shopping-list-area">
        {props.expiredShoppingList.length ? (
          <>
            {props.slicedExpiredShoppingList.map((listItem) => {
              return (
                <div key={listItem.id}>
                  {props.equalsDisplayDate(listItem.expected_purchase_date) && (
                    <p className="expired-shopping-list-area__date">
                      {listItem.expected_purchase_date}
                    </p>
                  )}
                  <ShoppingListItemComponent
                    listItem={listItem}
                    currentYearMonth={props.currentYearMonth}
                    purchaseClassName={'shopping-list-item-component__item-purchase'}
                    amountClassName={'shopping-list-item-component__item-amount'}
                  />
                </div>
              );
            })}
            {props.expiredShoppingList.length > props.initialDisplayNumberShoppingList && (
              <button
                className="expired-shopping-list-area__read-more-button"
                onClick={() => props.setReadMore(!props.readMore)}
              >
                {props.readMore ? 'close' : 'Read More'}
                {props.readMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />}
              </button>
            )}
          </>
        ) : (
          <p className="expired-shopping-list-area__message">
            期限切れの買い物リストはありません。
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpiredShoppingListArea;
