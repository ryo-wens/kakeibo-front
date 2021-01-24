import React from 'react';
import { useDispatch } from 'react-redux';
import { Groups } from '../../../reducks/groups/types';
import SearchTransactionsField from '../../../components/history/search/SearchTransactionsField';
import { searchTransactions } from '../../../reducks/transactions/operations';
import { searchGroupTransactions } from '../../../reducks/groupTransactions/operations';

interface SearchTransactionsFieldContainerProps {
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
}

const SearchTransactionsFieldContainer = (props: SearchTransactionsFieldContainerProps) => {
  const dispatch = useDispatch();

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

  return (
    <SearchTransactionsField
      groupId={props.groupId}
      pathName={props.pathName}
      selectStartDate={props.selectStartDate}
      selectEndDate={props.selectEndDate}
      transactionType={props.transactionType}
      category={props.category}
      bigCategoryId={props.bigCategoryId}
      lowAmount={props.lowAmount}
      highAmount={props.highAmount}
      shop={props.shop}
      memo={props.memo}
      paymentUserId={props.paymentUserId}
      sortItem={props.sortItem}
      sortType={props.sortType}
      limit={props.limit}
      openSearch={props.openSearch}
      approvedGroup={props.approvedGroup}
      openSearchFiled={props.openSearchFiled}
      closeSearch={props.closeSearch}
      setSearchSubmit={props.setSearchSubmit}
      selectStartDateChange={props.selectStartDateChange}
      selectEndDateChange={props.selectEndDateChange}
      selectTransactionsType={props.selectTransactionsType}
      changeCategory={props.changeCategory}
      inputLowAmount={props.inputLowAmount}
      inputHighAmount={props.inputHighAmount}
      inputShop={props.inputShop}
      inputMemo={props.inputMemo}
      changePayer={props.changePayer}
      changeSortItem={props.changeSortItem}
      changeSortType={props.changeSortType}
      selectLimit={props.selectLimit}
      searchOperation={() => dispatch(searchTransactions(searchRequestData))}
      groupSearchOperation={() =>
        dispatch(searchGroupTransactions(props.groupId, groupSearchRequestData))
      }
    />
  );
};
export default SearchTransactionsFieldContainer;
