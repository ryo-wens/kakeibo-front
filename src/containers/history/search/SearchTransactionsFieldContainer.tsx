import React from 'react';
import { useDispatch } from 'react-redux';
import SearchTransactionsField from '../../../components/history/search/SearchTransactionsField';
import { searchTransactions } from '../../../reducks/transactions/operations';
import { searchGroupTransactions } from '../../../reducks/groupTransactions/operations';
import { useCreateGroupUserList } from '../../../hooks/groupUsers/useCreateGroupUserList';

interface SearchTransactionsFieldContainerProps {
  pathName: string;
  groupId: number;
  openSearchField: boolean;
  openSearch: () => void;
  resetSearchTransactionsList: () => void;
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

const SearchTransactionsFieldContainer = (props: SearchTransactionsFieldContainerProps) => {
  const dispatch = useDispatch();
  const { createUsersList } = useCreateGroupUserList();

  const selectUsersItemList = createUsersList(props.groupId);
  selectUsersItemList.unshift({ value: '', label: '指定しない' });

  const searchOperation = () => {
    dispatch(searchTransactions(props.searchRequestData));
  };

  const groupSearchOperation = () => {
    dispatch(searchGroupTransactions(props.groupId, props.groupSearchRequestData));
  };

  return (
    <SearchTransactionsField
      groupId={props.groupId}
      pathName={props.pathName}
      notSpecified={props.notSpecified}
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
      resetSearchTransactionsList={props.resetSearchTransactionsList}
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
      searchOperation={searchOperation}
      groupSearchOperation={groupSearchOperation}
      selectUsersItemList={selectUsersItemList}
    />
  );
};
export default SearchTransactionsFieldContainer;
