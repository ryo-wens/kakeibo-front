import React, { useState } from 'react';
import { TransactionsList } from '../../../reducks/transactions/types';
import SearchResultTransactionsList from '../../../components/history/search/SearchResultTransactionsList';

interface SearchResultTransactionsListContainerProps {
  submit: boolean;
  searchResults: boolean;
  searchTransaction: TransactionsList;
  searchRequestData: {
    transaction_type: string | null;
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

const SearchResultTransactionsListContainer = (
  props: SearchResultTransactionsListContainerProps
) => {
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
    <SearchResultTransactionsList
      submit={props.submit}
      open={open}
      openId={openId}
      searchTransaction={props.searchTransaction}
      openModal={openModal}
      closeModal={closeModal}
      searchResults={props.searchResults}
      searchRequestData={props.searchRequestData}
    />
  );
};
export default SearchResultTransactionsListContainer;
