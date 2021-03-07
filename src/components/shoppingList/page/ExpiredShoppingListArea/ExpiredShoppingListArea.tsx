import React from 'react';
import './expired-shopping-list-area.scss';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ShoppingList } from '../../../../reducks/shoppingList/types';
import ShoppingListItemComponentContainer from '../../../../containers/shoppingList/modules/ListItem/shoppingListItemComponent/ShoppingListItemComponentContainer';

interface ExpiredShoppingListAreaProps {
  expiredShoppingList: ShoppingList;
  slicedExpiredShoppingList: ShoppingList;
  currentYear: string;
  currentMonth: string;
  equalsDisplayDate: (date: string) => boolean;
  readMore: boolean;
  setReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  initialDisplayNumberShoppingList: number;
}

const ExpiredShoppingListArea = (props: ExpiredShoppingListAreaProps) => {
  const existExpiredShoppingList = props.expiredShoppingList.length !== 0;

  return (
    <div>
      <div className="expired-shopping-list-area">
        {existExpiredShoppingList ? (
          <>
            {props.slicedExpiredShoppingList.map((listItem) => {
              return (
                <div className="expired-shopping-list-area__item" key={listItem.id}>
                  {props.equalsDisplayDate(listItem.expected_purchase_date) && (
                    <p className="expired-shopping-list-area__item-date">
                      {listItem.expected_purchase_date}
                    </p>
                  )}
                  <ShoppingListItemComponentContainer
                    listItem={listItem}
                    currentYear={props.currentYear}
                    currentMonth={props.currentMonth}
                    purchaseClassName={'expired-shopping-list-area__child-purchase'}
                    amountClassName={'expired-shopping-list-area__child-amount'}
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
