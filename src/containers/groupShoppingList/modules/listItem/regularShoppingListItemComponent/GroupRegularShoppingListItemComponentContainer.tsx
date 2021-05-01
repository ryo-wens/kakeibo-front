import React from 'react';
import { GroupRegularShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import GroupRegularShoppingListItemComponent from '../../../../../components/groupShoppingList/modules/listItem/regularShoppingListItemComponent/GroupRegularShoppingListItemComponent';

interface GroupRegularShoppingListItemComponentContainerProps {
  listItem: GroupRegularShoppingListItem;
  selectedYearParam: string;
  selectedMonthParam: string;
}

const GroupRegularShoppingListItemComponentContainer = (
  props: GroupRegularShoppingListItemComponentContainerProps
) => {
  return (
    <GroupRegularShoppingListItemComponent
      listItem={props.listItem}
      selectedYearParam={props.selectedYearParam}
      selectedMonthParam={props.selectedMonthParam}
    />
  );
};

export default GroupRegularShoppingListItemComponentContainer;
