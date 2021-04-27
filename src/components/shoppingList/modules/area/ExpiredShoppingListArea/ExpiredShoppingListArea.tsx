import React from 'react';
import styles from './ExpiredShoppingListArea.module.scss';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { DisplayShoppingListByDate, ShoppingList } from '../../../../../reducks/shoppingList/types';
import ShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/listItem/shoppingListItemComponent/ShoppingListItemComponentContainer';
import cn from 'classnames';

interface ExpiredShoppingListAreaProps {
  expiredShoppingList: ShoppingList;
  displayExpiredShoppingList: DisplayShoppingListByDate;
  selectedYearParam: string;
  selectedMonthParam: string;
  readMore: boolean;
  setReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  initialDisplayNumberShoppingList: number;
  readMoreBtnClassName: string;
}

const ExpiredShoppingListArea = (props: ExpiredShoppingListAreaProps) => {
  const existsExpiredShoppingList = props.expiredShoppingList.length !== 0;

  return (
    <>
      {existsExpiredShoppingList ? (
        <>
          <ol className={styles.listByDate}>
            {props.displayExpiredShoppingList.map((displayShoppingListItem) => {
              return (
                <li className={styles.listItemByDate} key={displayShoppingListItem.date}>
                  <p className={styles.date}>{displayShoppingListItem.date}</p>
                  <ol className={styles.shoppingList}>
                    {displayShoppingListItem.shoppingList.map((item) => {
                      return (
                        <ShoppingListItemComponentContainer
                          listItem={item}
                          selectedYearParam={props.selectedYearParam}
                          selectedMonthParam={props.selectedMonthParam}
                          purchaseClassName={styles.childPurchase}
                          amountClassName={styles.childAmount}
                          key={item.id}
                        />
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          </ol>

          {props.expiredShoppingList.length > props.initialDisplayNumberShoppingList && (
            <button
              className={cn(styles.readMoreBtn, props.readMoreBtnClassName)}
              onClick={() => props.setReadMore(!props.readMore)}
            >
              {props.readMore ? 'close' : 'Read More'}
              {props.readMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />}
            </button>
          )}
        </>
      ) : (
        <p className={styles.message}>期限切れの買い物リストはありません。</p>
      )}
    </>
  );
};

export default ExpiredShoppingListArea;
