import React from 'react';
import { Groups } from '../../../reducks/groups/types';
import SearchTransaction from '../../../components/history/search/SearchTransaction';

interface SearchTransactionContainerProps {
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
  const displaySearchTransactionResult = props.submit && props.openSearchFiled;

  return (
    <SearchTransaction
      groupId={props.groupId}
      pathName={props.pathName}
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
      openSearchFiled={props.openSearchFiled}
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
    />
  );
};
export default SearchTransactionContainer;
