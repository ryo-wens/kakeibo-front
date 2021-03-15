import React from 'react';
import '../../../shoppingList/page/ExpiredShoppingListArea/ExpiredShoppingListArea.module.scss';
import GroupShoppingListItemComponentContainer from '../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { GroupDisplayShoppingListByDate } from '../../../../reducks/groupShoppingList/types';
import styles from '../../../shoppingList/page/ExpiredShoppingListArea/ExpiredShoppingListArea.module.scss';
import cn from 'classnames';

interface GroupExpiredShoppingListAreaProps {
  expiredShoppingList: GroupDisplayShoppingListByDate;
  displayExpiredShoppingList: GroupDisplayShoppingListByDate;
  currentYear: string;
  currentMonth: string;
  readMore: boolean;
  setReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  initialDisplayNumberShoppingList: number;
  readMoreBtnClassName: string;
}

const GroupExpiredShoppingListArea = (props: GroupExpiredShoppingListAreaProps) => {
  const existExpiredShoppingList = props.expiredShoppingList.length !== 0;

  return (
    <div>
      <div className={styles.wrapper}>
        {existExpiredShoppingList ? (
          <>
            <ol className={styles.listByDate}>
              {props.displayExpiredShoppingList.map((displayShoppingListItem) => {
                return (
                  <li className={styles.listItemByDate} key={displayShoppingListItem.date}>
                    <p className={styles.date}>{displayShoppingListItem.date}</p>
                    <ol className={styles.shoppingList}>
                      {displayShoppingListItem.shoppingList.map((item) => {
                        return (
                          <GroupShoppingListItemComponentContainer
                            listItem={item}
                            currentYear={props.currentYear}
                            currentMonth={props.currentMonth}
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
      </div>
    </div>
  );
};

export default GroupExpiredShoppingListArea;
