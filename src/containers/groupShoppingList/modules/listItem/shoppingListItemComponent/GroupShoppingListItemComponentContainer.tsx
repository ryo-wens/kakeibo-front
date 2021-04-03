import React from 'react';
import { GroupShoppingListItem } from '../../../../../reducks/groupShoppingList/types';
import { useSelector } from 'react-redux';
import { getApprovedGroups } from '../../../../../reducks/groups/selectors';
import { useLocation, useParams } from 'react-router';
import GroupShoppingListItemComponent from '../../../../../components/groupShoppingList/modules/listItem/shoppingListItemComponent/GroupShoppingListItemComponent';

interface GroupShoppingListItemComponentContainerProps {
  listItem: GroupShoppingListItem;
  currentYear: string;
  currentMonth: string;
  purchaseClassName: string;
  amountClassName: string;
}

const GroupShoppingListItemComponentContainer = (
  props: GroupShoppingListItemComponentContainerProps
) => {
  const approvedGroups = useSelector(getApprovedGroups);
  const pathNames = useLocation().pathname.split('/');
  const currentPage = pathNames.slice(-1)[0];
  const { group_id } = useParams<{ group_id: string }>();

  return (
    <GroupShoppingListItemComponent
      approvedGroups={approvedGroups}
      groupId={Number(group_id)}
      listItem={props.listItem}
      currentYear={props.currentYear}
      currentMonth={props.currentMonth}
      currentPage={currentPage}
      purchaseClassName={props.purchaseClassName}
      amountClassName={props.amountClassName}
    />
  );
};

export default GroupShoppingListItemComponentContainer;
