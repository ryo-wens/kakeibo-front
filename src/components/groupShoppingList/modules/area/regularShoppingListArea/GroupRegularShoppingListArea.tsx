import React from 'react';
import styles from '../../../../shoppingList/modules/area/RegularShoppingListArea/RegularShoppingListArea.module.scss';
import {
  GroupRegularShoppingList,
  GroupRegularShoppingListItem,
} from '../../../../../reducks/groupShoppingList/types';
import GroupRegularShoppingListItemComponentContainer from '../../../../../containers/groupShoppingList/modules/listItem/regularShoppingListItemComponent/GroupRegularShoppingListItemComponentContainer';

interface GroupRegularShoppingListAreaProps {
  regularShoppingList: GroupRegularShoppingList;
  selectedYearParam: string;
  selectedMonthParam: string;
}

const GroupRegularShoppingListArea = (props: GroupRegularShoppingListAreaProps) => {
  return (
    <>
      {props.regularShoppingList.length ? (
        <ul className={styles.list}>
          {props.regularShoppingList.map((listItem: GroupRegularShoppingListItem) => {
            return (
              <GroupRegularShoppingListItemComponentContainer
                listItem={listItem}
                selectedYearParam={props.selectedYearParam}
                selectedMonthParam={props.selectedMonthParam}
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

export default GroupRegularShoppingListArea;
