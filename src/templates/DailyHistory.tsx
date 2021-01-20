import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTransactions, getSearchTransactions } from '../reducks/transactions/selectors';
import {
  getGroupTransactions,
  getSearchGroupTransactions,
} from '../reducks/groupTransactions/selectors';
import { getApprovedGroups } from '../reducks/groups/selectors';
import { noTransactionMessage, year, month } from '../lib/constant';
import {
  DailyHistoryBody,
  GroupDailyHistoryBody,
  SearchTransaction,
} from '../components/history/index';
import '../assets/history/daily-history.scss';
import { useLocation, useParams } from 'react-router';

interface DailyHistoryProps {
  selectYear: number;
  selectMonth: number;
  openSearchField: boolean;
  setOpenSearchField: React.Dispatch<React.SetStateAction<boolean>>;
}

const DailyHistory = (props: DailyHistoryProps) => {
  const { group_id } = useParams();
  const pathName = useLocation().pathname.split('/')[1];
  const transactionsList = useSelector(getTransactions);
  const searchTransactionsList = useSelector(getSearchTransactions);
  const groupTransactionsList = useSelector(getGroupTransactions);
  const groupSearchTransactionsList = useSelector(getSearchGroupTransactions);
  const approvedGroup = useSelector(getApprovedGroups);
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

  const openSearch = () => {
    props.setOpenSearchField(true);
  };

  const closeSearch = () => {
    props.setOpenSearchField(false);
  };

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
    setCategory(event.target.value as string);
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

  const selectCategory = (bigCategoryId: number) => {
    setBigCategoryId(bigCategoryId);
  };

  const selectLimit = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLimit(event.target.value as string);
  };

  return (
    <>
      <div className="daily-history daily-history__background">
        <SearchTransaction
          closeSearch={closeSearch}
          openSearch={openSearch}
          openSearchFiled={props.openSearchField}
          pathName={pathName}
          inputMemo={inputMemo}
          inputShop={inputShop}
          selectTransactionsType={selectTransactionType}
          memo={memo}
          shop={shop}
          transactionType={transactionType}
          category={category}
          selectCategory={selectCategory}
          changeCategory={changeCategory}
          bigCategoryId={bigCategoryId}
          selectStartDate={selectStartDate}
          selectEndDate={selectEndDate}
          highAmount={highAmount}
          lowAmount={lowAmount}
          selectStartDateChange={selectStartDateChange}
          selectEndDateChange={selectEndDateChange}
          inputHighAmount={inputHighAmount}
          inputLowAmount={inputLowAmount}
          groupId={Number(group_id)}
          approvedGroup={approvedGroup}
          paymentUserId={paymentUserId}
          changePayer={changePayer}
          changeSortItem={changeSortItem}
          changeSortType={changeSortType}
          sortItem={sortItem}
          sortType={sortType}
          limit={limit}
          selectLimit={selectLimit}
          submit={submit}
          setSearchSubmit={setSubmit}
        />
        <div className="daily-history__spacer" />
        {displayPersonalTransactions && (
          <>
            {!transactionsList.length && <h3>{noTransactionMessage}</h3>}
            <DailyHistoryBody
              selectYears={props.selectYear}
              selectMonth={props.selectMonth}
              transactionsList={transactionsList}
              searchTransactionsList={searchTransactionsList}
            />
          </>
        )}

        {displayGroupTransactions && (
          <>
            {!groupTransactionsList.length && <h3>{noTransactionMessage}</h3>}
            <GroupDailyHistoryBody
              selectYears={props.selectYear}
              selectMonth={props.selectMonth}
              groupTransactionsList={groupTransactionsList}
              groupSearchTransactionsList={groupSearchTransactionsList}
            />
          </>
        )}
      </div>
    </>
  );
};
export default DailyHistory;
