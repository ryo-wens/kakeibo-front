import React from 'react';
import GroupShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponentContainer';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
  GroupDisplayShoppingListByDate,
  GroupShoppingList,
} from '../../../../../reducks/groupShoppingList/types';
import styles from '../../../../shoppingList/modules/area/ExpiredShoppingListArea/ExpiredShoppingListArea.module.scss';
import cn from 'classnames';

interface GroupExpiredShoppingListAreaProps {
  expiredShoppingList: GroupShoppingList;
  displayExpiredShoppingList: GroupDisplayShoppingListByDate;
  selectedYearParam: string;
  selectedMonthParam: string;
  readMore: boolean;
  setReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  initialDisplayNumberShoppingList: number;
  readMoreBtnClassName: string;
}

const GroupExpiredShoppingListArea = (props: GroupExpiredShoppingListAreaProps) => {
  const existsExpiredShoppingList = props.expiredShoppingList.length !== 0;
  const initialDisplayNumberShoppingList = 3;

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
                        <GroupShoppingListItemComponentContainer
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
          {props.expiredShoppingList.length > initialDisplayNumberShoppingList && (
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

export default GroupExpiredShoppingListArea;
