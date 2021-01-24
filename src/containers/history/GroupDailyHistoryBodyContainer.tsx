import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { getUserId } from '../../reducks/users/selectors';
import { GroupTransactionsList } from '../../reducks/groupTransactions/types';
import GroupDailyHistoryBody from '../../components/history/GroupDailyHistoryBody';

interface GroupDailyHistoryBodyContainerProps {
  groupTransactionsList: GroupTransactionsList;
}

const GroupDailyHistoryBodyContainer = (props: GroupDailyHistoryBodyContainerProps) => {
  const approvedGroup = useSelector(getApprovedGroups);
  const userId = useSelector(getUserId);
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
    <GroupDailyHistoryBody
      userId={userId}
      open={open}
      openId={openId}
      groupTransactionsList={props.groupTransactionsList}
      openModal={openModal}
      closeModal={closeModal}
      payerUser={payerUser}
    />
  );
};
export default GroupDailyHistoryBodyContainer;
