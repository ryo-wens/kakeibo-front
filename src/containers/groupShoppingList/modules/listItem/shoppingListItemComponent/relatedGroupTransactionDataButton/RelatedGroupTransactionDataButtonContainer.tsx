import React, { useEffect, useRef, useState } from 'react';
import { GroupRelatedTransactionData } from '../../../../../../reducks/groupShoppingList/types';
import { Groups } from '../../../../../../reducks/groups/types';
import RelatedGroupTransactionDataButton from '../../../../../../components/groupShoppingList/modules/listItem/shoppingListItemComponent/relatedTransactionDataButton/RelatedGroupTransactionDataButton';

interface RelatedGroupTransactionDataButtonContainerProps {
  transactionData: GroupRelatedTransactionData;
  approvedGroups: Groups;
  groupId: number;
  transactionDataListClassName: string;
}

const RelatedGroupTransactionDataButtonContainer = (
  props: RelatedGroupTransactionDataButtonContainerProps
) => {
  const [open, setOpen] = useState(false);
  const transactionDataRef = useRef<HTMLDivElement>(null);

  const openTransactionData = () => {
    setOpen(true);
  };

  const onClickCloseTransactionData = (event: Event) => {
    if (transactionDataRef.current && !transactionDataRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('click', onClickCloseTransactionData, { capture: true });
      return () => {
        document.removeEventListener('click', onClickCloseTransactionData, { capture: true });
      };
    }
  }, [onClickCloseTransactionData]);

  const displayMediumCategoryOrCustomCategory = (transactionData: GroupRelatedTransactionData) => {
    if (transactionData.medium_category_name !== null) {
      return transactionData.medium_category_name;
    }
    if (transactionData.custom_category_name !== null) {
      return transactionData.custom_category_name;
    }
    return '';
  };

  const displayRelatedTransactionData: string = displayMediumCategoryOrCustomCategory(
    props.transactionData
  );

  const getPaymentUserName = (approvedGroups: Groups, userId: string, groupId: number) => {
    const group = approvedGroups.filter((group) => group.group_id === groupId);
    const idx = group[0].approved_users_list.findIndex((user) => user.user_id === userId);
    return group[0].approved_users_list[idx].user_name;
  };

  return (
    <RelatedGroupTransactionDataButton
      open={open}
      approvedGroups={props.approvedGroups}
      groupId={props.groupId}
      transactionData={props.transactionData}
      associatedCategoryName={displayRelatedTransactionData}
      openTransactionData={openTransactionData}
      getPaymentUserName={getPaymentUserName}
      transactionDataListClassName={props.transactionDataListClassName}
      ref={transactionDataRef}
    />
  );
};

export default RelatedGroupTransactionDataButtonContainer;
