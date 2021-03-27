import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import axios from 'axios';
import { getWeeklyHistoryTransactions } from '../../../reducks/transactions/selectors';
import { getGroupWeeklyTransaction } from '../../../reducks/groupTransactions/selectors';
import { fetchTransactionsList } from '../../../reducks/transactions/operations';
import { currentWeekNumber, incomeTransactionType } from '../../../lib/constant';
import { SelectYears } from '../../../lib/date';
import WeeklyHistory from '../../../components/history/weekly/WeeklyHistory';

interface MonthlyHistoryProps {
  year: number;
  month: number;
}

const WeeklyHistoryContainer = (props: MonthlyHistoryProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const expenseTransactionsList = useSelector(getWeeklyHistoryTransactions);
  const expenseGroupTransactionsList = useSelector(getGroupWeeklyTransaction);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const signal = axios.CancelToken.source();
    const years: SelectYears = {
      selectedYear: String(props.year),
      selectedMonth: props.month <= 9 ? '0' + props.month : String(props.month),
    };
    if (pathName !== 'group') {
      dispatch(fetchTransactionsList(years, signal));
      return () => signal.cancel();
    }
  }, [pathName]);

  const openModal = (transactionId: number) => {
    setOpenId(transactionId);
    setOpen(true);
  };

  const closeModal = () => {
    setOpenId(undefined);
    setOpen(false);
  };

  const currentWeekBorder = (weekNum: number) => {
    const style = {
      border: '',
    };

    if (weekNum === currentWeekNumber) {
      style.border = 'solid 2px #E2750F';
    }

    return style;
  };

  const subTotalAmounts = (startDate: number, endDate: number) => {
    let oneWeekSubTotal = 0;

    for (const transaction of expenseTransactionsList) {
      if (transaction.transaction_type !== incomeTransactionType) {
        const transactionDay = Number(transaction.transaction_date.slice(8, 10));
        if (startDate <= transactionDay && transactionDay <= endDate) {
          oneWeekSubTotal += transaction.amount;
        }
      }
    }

    return oneWeekSubTotal;
  };

  const totalAmount = () => {
    let amount = 0;

    for (const transaction of expenseTransactionsList) {
      if (transaction.transaction_type !== incomeTransactionType) {
        amount += transaction.amount;
      }
    }
    return amount;
  };

  return (
    <WeeklyHistory
      open={open}
      openId={openId}
      year={props.year}
      month={props.month}
      pathName={pathName}
      openModal={openModal}
      closeModal={closeModal}
      currentWeekBorder={currentWeekBorder}
      expenseTransactionsList={expenseTransactionsList}
      subTotalAmounts={subTotalAmounts}
      totalAmount={totalAmount}
      expenseGroupTransactionsList={expenseGroupTransactionsList}
    />
  );
};
export default WeeklyHistoryContainer;
