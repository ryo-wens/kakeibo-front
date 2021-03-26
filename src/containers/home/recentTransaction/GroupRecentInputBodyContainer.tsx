import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { getGroupLatestTransactions } from '../../../reducks/groupTransactions/selectors';
import GroupRecentInputBody from '../../../components/home/recentTransaction/recentTransactionBody/GroupRecentInputBody';

const GroupRecentInputBodyContainer = () => {
  const { group_id } = useParams<{ group_id: string }>();
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);
  const approvedGroup = useSelector(getApprovedGroups);
  const groupLatestTransactionList = useSelector(getGroupLatestTransactions);
  const currentGroupId = approvedGroup.findIndex((group) => group.group_id === Number(group_id));
  const currentGroup = approvedGroup[currentGroupId];

  const openModal = (transactionId: number) => {
    setOpen(true);
    setOpenId(transactionId);
  };

  const closeModal = () => {
    setOpen(false);
    setOpenId(undefined);
  };

  const payerColor = (payerUserId: string, transactionType: string): React.CSSProperties => {
    if (currentGroup) {
      if (currentGroup.approved_users_list) {
        const approvedUser = currentGroup.approved_users_list.find(
          (user) => user.user_id === payerUserId
        );

        if (approvedUser && transactionType === 'expense') {
          return { borderBottom: `2px solid ${approvedUser.color_code}` };
        }
      }
    }
    return { borderBottom: 0 };
  };

  return (
    <GroupRecentInputBody
      open={open}
      openId={openId}
      openModal={openModal}
      closeModal={closeModal}
      approvedGroup={approvedGroup}
      groupLatestTransactionsList={groupLatestTransactionList}
      payerColor={payerColor}
    />
  );
};
export default GroupRecentInputBodyContainer;
