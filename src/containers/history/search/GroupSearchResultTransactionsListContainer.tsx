import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { getSearchGroupTransactions } from '../../../reducks/groupTransactions/selectors';
import { GroupTransactionsList } from '../../../reducks/groupTransactions/types';
import GroupSearchResultTransactionsList from '../../../components/history/search/GroupSearchResultTransactionsList';

const GroupSearchResultTransactionsListContainer = () => {
  const approvedGroup = useSelector(getApprovedGroups);
  const groupSearchTransactions = useSelector(getSearchGroupTransactions);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpnId] = useState<number | undefined>(undefined);
  const [searchTransaction, setSearchTransaction] = useState<GroupTransactionsList>([]);

  useEffect(() => {
    setSearchTransaction(groupSearchTransactions);
  }, [groupSearchTransactions]);

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
      open={open}
      openId={openId}
      searchTransaction={searchTransaction}
      openModal={openModal}
      closeModal={closeModal}
      payerUser={payerUser}
    />
  );
};
export default GroupSearchResultTransactionsListContainer;
