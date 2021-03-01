import React from 'react';
import '../../../shoppingList/page/ExpiredShoppingListArea/expired-shopping-list-area.scss';
import GroupShoppingListItemComponentContainer from '../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { GroupShoppingList } from '../../../../reducks/groupShoppingList/types';

interface GroupExpiredShoppingListAreaProps {
  expiredShoppingList: GroupShoppingList;
  slicedExpiredShoppingList: GroupShoppingList;
  currentYear: string;
  currentMonth: string;
  equalsDisplayDate: (date: string) => boolean;
  readMore: boolean;
  setReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  initialDisplayNumberShoppingList: number;
}

const GroupExpiredShoppingListArea = (props: GroupExpiredShoppingListAreaProps) => {
  return (
    <>
      <div>
        <div className="expired-shopping-list-area">
          {props.expiredShoppingList ? (
            <>
              {props.slicedExpiredShoppingList.map((listItem) => {
                return (
                  <div className="expired-shopping-list-area__item" key={listItem.id}>
                    {props.equalsDisplayDate(listItem.expected_purchase_date) && (
                      <p className="expired-shopping-list-area__item-date">
                        {listItem.expected_purchase_date}
                      </p>
                    )}
                    <GroupShoppingListItemComponentContainer
                      listItem={listItem}
                      currentYear={props.currentYear}
                      currentMonth={props.currentMonth}
                      purchaseClassName={'shopping-list-item-component__item-purchase'}
                      amountClassName={'shopping-list-item-component__item-amount'}
                      transactionDataItemClassName={'related-transaction-data-button__item'}
                      transactionDataItemKeyClassName={'related-transaction-data-button__item-key'}
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
    </>
  );
};

export default GroupExpiredShoppingListArea;
