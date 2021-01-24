import React, { useState } from 'react';
import { TransactionsList } from '../../reducks/transactions/types';
import DailyHistoryBody from '../../components/history/DailyHistoryBody';

interface DailyHistoryBodyContainerProps {
  transactionsList: TransactionsList;
  searchTransactionsList: TransactionsList;
}

const DailyHistoryBodyContainer = (props: DailyHistoryBodyContainerProps) => {
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

  return (
    <DailyHistoryBody
      open={open}
      openId={openId}
      transactionsList={props.transactionsList}
      searchTransactionsList={props.searchTransactionsList}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};
export default DailyHistoryBodyContainer;
