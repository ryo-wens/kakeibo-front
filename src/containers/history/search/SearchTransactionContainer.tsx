import React, { useEffect, useState } from 'react';
import { Groups } from '../../../reducks/groups/types';
import SearchTransaction from '../../../components/history/search/SearchTransaction';
import { useSelector } from 'react-redux';
import { getSearchTransactions } from '../../../reducks/transactions/selectors';
import { TransactionsList } from '../../../reducks/transactions/types';
import { getSearchGroupTransactions } from '../../../reducks/groupTransactions/selectors';
import { GroupTransactionsList } from '../../../reducks/groupTransactions/types';

interface SearchTransactionContainerProps {
  pathName: string;
  groupId: number;
  openSearchField: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  selectStartDateChange: (selectStartDate: Date | null) => void;
  selectEndDateChange: (selectEndDate: Date | null) => void;
  selectTransactionsType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  inputMemo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputLowAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputHighAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputShop: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeCategory: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changePayer: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeSortItem: (event: React.ChangeEvent<{ value: unknown }>) => void;
  changeSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
  setSearchSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  notSpecified: boolean;
  selectStartDate: Date | null;
  selectEndDate: Date | null;
  lowAmount: string;
  highAmount: string;
  memo: string | null;
  shop: string | null;
  category: string;
  bigCategoryId: number;
  transactionType: string;
  approvedGroup: Groups;
  paymentUserId: string;
  sortItem: string;
  sortType: string;
  limit: string;
  submit: boolean;
}

const SearchTransactionContainer = (props: SearchTransactionContainerProps) => {
  const searchTransactions = useSelector(getSearchTransactions);
  const groupSearchTransactions = useSelector(getSearchGroupTransactions);
  const [searchTransaction, setSearchTransaction] = useState<TransactionsList>([]);
  const [groupSearchTransaction, setGroupSearchTransaction] = useState<GroupTransactionsList>([]);
  const searchResults = searchTransaction.length === 0;
  const displaySearchTransactionResult = props.submit && props.openSearchField && !searchResults;

  useEffect(() => {
    setSearchTransaction(searchTransactions);
  }, [searchTransactions]);

  useEffect(() => {
    setGroupSearchTransaction(groupSearchTransactions);
  }, [groupSearchTransactions]);

  useEffect(() => {
    setSearchTransaction(groupSearchTransactions);
  }, [groupSearchTransactions, props.openSearchField]);

  const searchRequestData = {
    transaction_type: props.transactionType !== '' ? props.transactionType : null,
    start_date: props.selectStartDate,
    end_date: props.selectEndDate,
    low_amount: props.lowAmount !== '' ? props.lowAmount : null,
    high_amount: props.highAmount !== '' ? props.highAmount : null,
    memo: props.memo !== '' ? props.memo : null,
    shop: props.shop !== '' ? props.shop : null,
    sort: props.sortItem !== '' ? props.sortItem : null,
    sort_type: props.sortType !== '' ? props.sortType : null,
    big_category_id: props.bigCategoryId !== 0 ? props.bigCategoryId : null,
    limit: props.limit !== '' ? props.limit : null,
  };

  const groupSearchRequestData = {
    transaction_type: props.transactionType !== '' ? props.transactionType : null,
    payment_user_id: props.paymentUserId !== '' ? props.paymentUserId : null,
    start_date: props.selectStartDate,
    end_date: props.selectEndDate,
    low_amount: props.lowAmount !== '' ? props.lowAmount : null,
    high_amount: props.highAmount !== '' ? props.highAmount : null,
    memo: props.memo !== '' ? props.memo : null,
    shop: props.shop !== '' ? props.shop : null,
    sort: props.sortItem !== '' ? props.sortItem : null,
    sort_type: props.sortType !== '' ? props.sortType : null,
    big_category_id: props.bigCategoryId !== 0 ? props.bigCategoryId : null,
    limit: props.limit !== '' ? props.limit : null,
  };

  const resetSearchTransactionsList = () => {
    props.closeSearch();
    setSearchTransaction([]);
  };

  return (
    <SearchTransaction
      groupId={props.groupId}
      pathName={props.pathName}
      searchResults={searchResults}
      notSpecified={props.notSpecified}
      openSearch={props.openSearch}
      closeSearch={props.closeSearch}
      displaySearchTransactionResult={displaySearchTransactionResult}
      approvedGroup={props.approvedGroup}
      selectStartDate={props.selectStartDate}
      selectEndDate={props.selectEndDate}
      transactionType={props.transactionType}
      category={props.category}
      bigCategoryId={props.bigCategoryId}
      lowAmount={props.lowAmount}
      highAmount={props.highAmount}
      paymentUserId={props.paymentUserId}
      shop={props.shop}
      memo={props.memo}
      sortItem={props.sortItem}
      sortType={props.sortType}
      limit={props.limit}
      submit={props.submit}
      openSearchField={props.openSearchField}
      selectStartDateChange={props.selectStartDateChange}
      selectEndDateChange={props.selectEndDateChange}
      selectTransactionsType={props.selectTransactionsType}
      changeCategory={props.changeCategory}
      inputLowAmount={props.inputLowAmount}
      inputHighAmount={props.inputHighAmount}
      changePayer={props.changePayer}
      changeSortItem={props.changeSortItem}
      changeSortType={props.changeSortType}
      inputShop={props.inputShop}
      inputMemo={props.inputMemo}
      selectLimit={props.selectLimit}
      setSearchSubmit={props.setSearchSubmit}
      searchRequestData={searchRequestData}
      groupSearchRequestData={groupSearchRequestData}
      searchTransaction={searchTransaction}
      groupSearchTransaction={groupSearchTransaction}
      resetSearchTransactionsList={resetSearchTransactionsList}
    />
  );
};
export default SearchTransactionContainer;
