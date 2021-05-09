import React from 'react';
import { TransactionsList } from '../../../reducks/transactions/types';
import { GroupTransactionsList } from '../../../reducks/groupTransactions/types';
import SearchTransactionsFieldContainer from '../../../containers/history/search/SearchTransactionsFieldContainer';
import SearchResultTransactionsListContainer from '../../../containers/history/search/SearchResultTransactionsListContainer';
import GroupSearchResultTransactionsListContainer from '../../../containers/history/search/GroupSearchResultTransactionsListContainer';
import './search-transaction.scss';

interface SearchTransactionProps {
  pathName: string;
  groupId: number;
  submit: boolean;
  searchResults: boolean;
  openSearchField: boolean;
  searchTransaction: TransactionsList;
  groupSearchTransaction: GroupTransactionsList;
  resetSearchTransactionsList: () => void;
  displaySearchTransactionResult: boolean;
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
  paymentUserId: string;
  sortItem: string;
  sortType: string;
  limit: string;
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

const SearchTransaction = (props: SearchTransactionProps) => {
  return (
    <>
      <button
        className="daily-history__search-btn"
        onClick={!props.openSearchField ? props.openSearch : props.resetSearchTransactionsList}
      >
        検索
      </button>
      <div className="daily-history__spacer" />

      {props.openSearchField && (
        <SearchTransactionsFieldContainer
          openSearch={props.openSearch}
          openSearchField={props.openSearchField}
          resetSearchTransactionsList={props.resetSearchTransactionsList}
          notSpecified={props.notSpecified}
          pathName={props.pathName}
          inputMemo={props.inputMemo}
          inputShop={props.inputShop}
          selectTransactionsType={props.selectTransactionsType}
          memo={props.memo}
          shop={props.shop}
          transactionType={props.transactionType}
          category={props.category}
          changeCategory={props.changeCategory}
          bigCategoryId={props.bigCategoryId}
          selectStartDate={props.selectStartDate}
          selectEndDate={props.selectEndDate}
          highAmount={props.highAmount}
          lowAmount={props.lowAmount}
          selectStartDateChange={props.selectStartDateChange}
          selectEndDateChange={props.selectEndDateChange}
          inputHighAmount={props.inputHighAmount}
          inputLowAmount={props.inputLowAmount}
          groupId={props.groupId}
          paymentUserId={props.paymentUserId}
          changePayer={props.changePayer}
          changeSortItem={props.changeSortItem}
          changeSortType={props.changeSortType}
          sortItem={props.sortItem}
          sortType={props.sortType}
          limit={props.limit}
          selectLimit={props.selectLimit}
          setSearchSubmit={props.setSearchSubmit}
          searchRequestData={props.searchRequestData}
          groupSearchRequestData={props.groupSearchRequestData}
        />
      )}
      <div className="daily-history__spacer" />

      {props.displaySearchTransactionResult && props.pathName !== 'group' && (
        <SearchResultTransactionsListContainer
          submit={props.submit}
          searchResults={props.searchResults}
          searchRequestData={props.searchRequestData}
          searchTransaction={props.searchTransaction}
        />
      )}

      {props.displaySearchTransactionResult && props.pathName === 'group' && (
        <GroupSearchResultTransactionsListContainer
          submit={props.submit}
          searchResults={props.searchResults}
          groupSearchRequestData={props.groupSearchRequestData}
          groupSearchTransaction={props.groupSearchTransaction}
        />
      )}
    </>
  );
};
export default SearchTransaction;
