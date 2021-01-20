import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getLatestTransactions } from '../../reducks/transactions/selectors';
import RecentInputBody from './recentTransaction/RecentInputBody';

const RecentInputBodyContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);
  const latestTransactionsList = useSelector(getLatestTransactions);

  const openModal = (transactionId: number) => {
    setOpen(true);
    setOpenId(transactionId);
  };

  const closeModal = () => {
    setOpen(false);
    setOpenId(undefined);
  };

  return (
    <RecentInputBody
      open={open}
      openId={openId}
      latestTransactionsList={latestTransactionsList}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};
export default RecentInputBodyContainer;
