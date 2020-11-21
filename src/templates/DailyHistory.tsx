import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../reducks/transactions/selectors';
import { getGroupTransactions } from '../reducks/groupTransactions/selectors';
import { fetchTransactionsList } from '../reducks/transactions/operations';
import { fetchGroupTransactionsList } from '../reducks/groupTransactions/operations';
import { fetchCategories } from '../reducks/categories/operations';
import { fetchGroupCategories } from '../reducks/groupCategories/operations';
import { State } from '../reducks/store/types';
import { customMonth, noTransactionMessage } from '../lib/constant';
import { getPathTemplateName } from '../lib/path';
import { DailyHistoryBody, GroupDailyHistoryBody } from '../components/history/index';
import SearchTransaction from '../components/uikit/SearchTransaction';
import '../assets/history/daily-history.scss';
import { getPathGroupId } from '../lib/path';

interface DailyHistoryProps {
  selectYears: number;
  selectMonth: string;
}

const DailyHistory = (props: DailyHistoryProps) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const transactionsList = getTransactions(selector);
  const groupTransactionsList = getGroupTransactions(selector);
  const pathName = getPathTemplateName(window.location.pathname);
  const groupId = getPathGroupId(window.location.pathname);
  const [openSearchField, setOpenSearchField] = useState<boolean>(false);
  const [selectStartDate, setStartSelectDate] = useState<Date | null>(new Date());
  const [selectEndDate, setEndSelectDate] = useState<Date | null>(new Date());
  const [memo, setMemo] = useState<string>('');
  const [shop, setShop] = useState<string>('');
  const [lowAmount, setLowAmount] = useState<string>('');
  const [highAmount, setHighAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [bigCategoryId, setBigCategoryId] = useState<number>(0);
  const [mediumCategoryId, setMediumCategoryId] = useState<number | null>(null);
  const [customCategoryId, setCustomCategoryId] = useState<number | null>(null);
  const [transactionType, setTransactionType] = useState<string>('');

  useEffect(() => {
    if (pathName !== 'group') {
      dispatch(fetchTransactionsList(String(props.selectYears), customMonth));
    } else if (pathName === 'group') {
      dispatch(fetchGroupTransactionsList(props.selectYears, customMonth, groupId));
    }
  }, [pathName, props.selectYears]);

  useEffect(() => {
    if (pathName !== 'group') {
      dispatch(fetchCategories());
    } else {
      dispatch(fetchGroupCategories(groupId));
    }
  }, [pathName, groupId]);

  const openSearch = useCallback(() => {
    setOpenSearchField(true);
  }, [setOpenSearchField]);

  const closeSearch = useCallback(() => {
    setOpenSearchField(false);
  }, [setOpenSearchField]);

  const selectStartDateChange = useCallback((selectStartDate: Date | null) => {
    setStartSelectDate(selectStartDate as Date);
  }, []);

  const selectEndDateChange = useCallback((selectEndDate: Date | null) => {
    setEndSelectDate(selectEndDate as Date);
  }, []);

  const inputMemo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMemo(event.target.value);
    },
    [setMemo]
  );

  const inputShop = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setShop(event.target.value);
    },
    [setShop]
  );

  const inputLowAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLowAmount(event.target.value);
    },
    [setLowAmount]
  );

  const inputHighAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHighAmount(event.target.value);
    },
    [setHighAmount]
  );

  const changeCategory = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setCategory(event.target.value as string);
    },
    [setCategory]
  );

  const selectTransactionType = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setTransactionType(event.target.value as string);
    },
    [setTransactionType]
  );

  const selectCategory = useCallback(
    (bigCategoryId: number, associatedCategoryId: number | null, category_type: string) => {
      switch (category_type) {
        case 'MediumCategory':
          setBigCategoryId(bigCategoryId);
          setMediumCategoryId(associatedCategoryId);
          setCustomCategoryId(null);
          break;
        case 'CustomCategory':
          setBigCategoryId(bigCategoryId);
          setMediumCategoryId(null);
          setCustomCategoryId(associatedCategoryId);
          break;
      }
    },
    [setBigCategoryId, setMediumCategoryId, setCustomCategoryId]
  );

  return (
    <>
      <div className="daily-history daily-history__background">
        <SearchTransaction
          closeSearch={closeSearch}
          openSearch={openSearch}
          openSearchFiled={openSearchField}
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
          customCategoryId={customCategoryId}
          mediumCategoryId={mediumCategoryId}
        />
        <div className="daily-history__spacer" />
        {(() => {
          if (pathName !== 'group') {
            if (!transactionsList.length) {
              return <h3>{noTransactionMessage}</h3>;
            } else if (transactionsList.length) {
              return (
                <DailyHistoryBody
                  selectYears={props.selectYears}
                  selectMonth={props.selectMonth}
                  transactionsList={transactionsList}
                />
              );
            }
          } else {
            if (!groupTransactionsList.length) {
              return <h3>{noTransactionMessage}</h3>;
            } else if (groupTransactionsList.length) {
              return (
                <GroupDailyHistoryBody
                  selectYears={props.selectYears}
                  selectMonth={props.selectMonth}
                  groupTransactionsList={groupTransactionsList}
                />
              );
            }
          }
        })()}
      </div>
    </>
  );
};
export default DailyHistory;
