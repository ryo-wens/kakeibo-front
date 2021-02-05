import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { getSearchTransactions, getTransactions } from '../../../reducks/transactions/selectors';
import {
  getGroupTransactions,
  getSearchGroupTransactions,
} from '../../../reducks/groupTransactions/selectors';
import { getApprovedGroups } from '../../../reducks/groups/selectors';
import { month, year } from '../../../lib/constant';
import DailyHistory from '../../../templates/history/daily/DailyHistory';

interface DailyHistoryContainerProps {
  selectYear: number;
  selectMonth: number;
  notSpecified: boolean;
  openSearchField: boolean;
  searchFieldOpen: () => void;
  searchFieldClose: () => void;
}

const DailyHistoryContainer = (props: DailyHistoryContainerProps) => {
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const approvedGroup = useSelector(getApprovedGroups);
  const transactionsList = useSelector(getTransactions);
  const groupTransactionsList = useSelector(getGroupTransactions);
  const searchTransactionsList = useSelector(getSearchTransactions);
  const groupSearchTransactionsList = useSelector(getSearchGroupTransactions);
  const [selectStartDate, setStartSelectDate] = useState<Date | null>(new Date(year, month - 1, 1));
  const [selectEndDate, setEndSelectDate] = useState<Date | null>(new Date(year, month, 0));
  const [memo, setMemo] = useState('');
  const [shop, setShop] = useState('');
  const [lowAmount, setLowAmount] = useState('');
  const [highAmount, setHighAmount] = useState('');
  const [category, setCategory] = useState('');
  const [bigCategoryId, setBigCategoryId] = useState(0);
  const [transactionType, setTransactionType] = useState('');
  const [paymentUserId, setPaymentUserId] = useState('');
  const [sortItem, setSortItem] = useState('');
  const [sortType, setSortType] = useState('');
  const [limit, setLimit] = useState('');
  const [submit, setSubmit] = useState(false);
  const displayPersonalTransactions = !props.openSearchField && pathName !== 'group';
  const displayGroupTransactions = !props.openSearchField && pathName === 'group';

  const selectStartDateChange = (selectStartDate: Date | null) => {
    setStartSelectDate(selectStartDate as Date);
  };

  const selectEndDateChange = (selectEndDate: Date | null) => {
    setEndSelectDate(selectEndDate as Date);
  };

  const inputMemo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

  const inputShop = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
  };

  const inputLowAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLowAmount(event.target.value);
  };

  const inputHighAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHighAmount(event.target.value);
  };

  const changeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(String(event.target.value));
    setBigCategoryId(Number(event.target.value));
  };

  const selectTransactionType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTransactionType(event.target.value as string);
  };

  const changePayer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPaymentUserId(event.target.value as string);
  };

  const changeSortItem = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortItem(event.target.value as string);
  };

  const changeSortType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortType(event.target.value as string);
  };

  const selectLimit = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLimit(event.target.value as string);
  };

  return (
    <DailyHistory
      group_id={Number(group_id)}
      pathName={pathName}
      submit={submit}
      selectYear={props.selectYear}
      selectMonth={props.selectMonth}
      selectStartDate={selectStartDate}
      selectEndDate={selectEndDate}
      transactionType={transactionType}
      category={category}
      bigCategoryId={bigCategoryId}
      lowAmount={lowAmount}
      highAmount={highAmount}
      paymentUserId={paymentUserId}
      shop={shop}
      memo={memo}
      sortItem={sortItem}
      sortType={sortType}
      limit={limit}
      notSpecified={props.notSpecified}
      openSearchField={props.openSearchField}
      displayPersonalTransactions={displayPersonalTransactions}
      displayGroupTransactions={displayGroupTransactions}
      approvedGroup={approvedGroup}
      transactionsList={transactionsList}
      groupTransactionsList={groupTransactionsList}
      searchTransactionsList={searchTransactionsList}
      groupSearchTransactionsList={groupSearchTransactionsList}
      setSubmit={setSubmit}
      searchFieldOpen={props.searchFieldOpen}
      searchFieldClose={props.searchFieldClose}
      selectStartDateChange={selectStartDateChange}
      selectEndDateChange={selectEndDateChange}
      selectTransactionType={selectTransactionType}
      changeCategory={changeCategory}
      changePayer={changePayer}
      inputLowAmount={inputLowAmount}
      inputShop={inputShop}
      inputMemo={inputMemo}
      inputHighAmount={inputHighAmount}
      changeSortItem={changeSortItem}
      changeSortType={changeSortType}
      selectLimit={selectLimit}
    />
  );
};
export default DailyHistoryContainer;
