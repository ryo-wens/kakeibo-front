import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { GroupTransactionsList } from '../../../reducks/groupTransactions/types';
import GroupSearchResultTransactionsList from '../../../components/history/search/GroupSearchResultTransactionsList';

interface GroupSearchResultTransactionsListContainerProps {
  submit: boolean;
  searchResults: boolean;
  groupSearchTransaction: GroupTransactionsList;
  groupSearchRequestData: {
    transaction_type: string | null;
    payment_user_id: string | null;
    start_date: Date | null;
    end_date: Date | null;
    low_amount: string | null;
    high_amount: string | null;
    memo: string | null;
    shop: string | null;
    sort: string | null;
    sort_type: string | null;
    big_category_id: number | null;
    limit: string | null;
  };
}

const GroupSearchResultTransactionsListContainer = (
  props: GroupSearchResultTransactionsListContainerProps
) => {
  const approvedGroup = useSelector(getApprovedGroups);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpnId] = useState<number | undefined>(undefined);

  const openModal = (transactionId: number) => {
    setOpen(true);
    setOpnId(transactionId);
  };

  const closeModal = () => {
    setOpen(false);
    setOpnId(undefined);
  };

  const payerUser = (payerId: string) => {
    const payer = {
      user: '',
    };

    for (const group of approvedGroup) {
      for (const user of group.approved_users_list) {
        if (user.user_id === payerId) {
          payer.user = user.user_name;
        }
      }
    }

    return payer.user;
  };

  return (
    <GroupSearchResultTransactionsList
      submit={props.submit}
      open={open}
      openId={openId}
      searchTransaction={props.groupSearchTransaction}
      openModal={openModal}
      closeModal={closeModal}
      payerUser={payerUser}
      searchResults={props.searchResults}
      groupSearchRequestData={props.groupSearchRequestData}
    />
  );
};
export default GroupSearchResultTransactionsListContainer;
