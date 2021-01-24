import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSearchTransactions } from '../../../reducks/transactions/selectors';
import { TransactionsList } from '../../../reducks/transactions/types';
import SearchResultTransactionsList from '../../../components/history/search/SearchResultTransactionsList';

const SearchResultTransactionsListContainer = () => {
  const searchTransactions = useSelector(getSearchTransactions);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpnId] = useState<number | undefined>(undefined);
  const [searchTransaction, setSearchTransaction] = useState<TransactionsList>([]);

  useEffect(() => {
    setSearchTransaction(searchTransactions);
  }, [searchTransactions]);

  const openModal = (transactionId: number) => {
    setOpen(true);
    setOpnId(transactionId);
  };

  const closeModal = () => {
    setOpen(false);
    setOpnId(undefined);
  };

  return (
    <SearchResultTransactionsList
      open={open}
      openId={openId}
      searchTransaction={searchTransaction}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};
export default SearchResultTransactionsListContainer;
