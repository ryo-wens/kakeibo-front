import React from 'react';
import {
  RegularShoppingList,
  RegularShoppingListItem,
  TodayOrMonthly,
} from '../../../../../reducks/shoppingList/types';
import styles from './RegularShoppingListArea.module.scss';
import RegularShoppingListItemComponentContainer from '../../../../../containers/shoppingList/modules/listItem/regularShoppingListItemComponentContainer/RegularShoppingListItemComponentContainer';

interface RegularShoppingListAreaProps {
  selectedYearParam: string;
  selectedMonthParam: string;
  currentTodayOrMonthly: TodayOrMonthly;
  regularShoppingList: RegularShoppingList;
}

const RegularShoppingListArea = (props: RegularShoppingListAreaProps) => {
  return (
    <>
      {props.regularShoppingList.length ? (
        <ul className={styles.list}>
          {props.regularShoppingList.map((listItem: RegularShoppingListItem) => {
            return (
              <RegularShoppingListItemComponentContainer
                listItem={listItem}
                currentYear={props.selectedMonthParam}
                currentMonth={props.selectedMonthParam}
                key={listItem.id}
              />
            );
          })}
        </ul>
      ) : (
        <p className={styles.message}>定期買い物リストは登録されていません。</p>
      )}
    </>
  );
};

export default RegularShoppingListArea;
