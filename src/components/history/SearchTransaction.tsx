import React from 'react';
import { Groups } from '../../reducks/groups/types';
import '../../templates/history/daily/daily-history.scss';
import { SearchTransactionsField, SearchResultTransactionsList } from './index';
import './search-transaction.scss';

interface SearchTransactionProps {
  pathName: string;
  groupId: number;
  openSearchFiled: boolean;
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
  selectCategory: (bigCategoryId: number) => void;
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
  setSearchSubmit: React.Dispatch<React.SetStateAction<boolean>>;
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

const SearchTransaction = (props: SearchTransactionProps) => {
  const displaySearchTransactionResult = props.submit && props.openSearchFiled;

  return (
    <>
      <button
        className="daily-history__search-btn"
        onClick={!props.openSearchFiled ? props.openSearch : props.closeSearch}
      >
        検索
      </button>
      <div className="daily-history__spacer" />

      {props.openSearchFiled && (
        <SearchTransactionsField
          closeSearch={props.closeSearch}
          openSearch={props.openSearch}
          openSearchFiled={props.openSearchFiled}
          pathName={props.pathName}
          inputMemo={props.inputMemo}
          inputShop={props.inputShop}
          selectTransactionsType={props.selectTransactionsType}
          memo={props.memo}
          shop={props.shop}
          transactionType={props.transactionType}
          category={props.category}
          selectCategory={props.selectCategory}
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
          approvedGroup={props.approvedGroup}
          paymentUserId={props.paymentUserId}
          changePayer={props.changePayer}
          changeSortItem={props.changeSortItem}
          changeSortType={props.changeSortType}
          sortItem={props.sortItem}
          sortType={props.sortType}
          limit={props.limit}
          selectLimit={props.selectLimit}
          setSearchSubmit={props.setSearchSubmit}
        />
      )}
      <div className="daily-history__spacer" />

      {displaySearchTransactionResult && <SearchResultTransactionsList />}
    </>
  );
};
export default SearchTransaction;
