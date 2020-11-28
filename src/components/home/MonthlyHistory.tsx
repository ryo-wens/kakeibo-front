import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionsList } from '../../reducks/transactions/operations';
import { State } from '../../reducks/store/types';
import { getTransactions } from '../../reducks/transactions/selectors';
import { month } from '../../lib/constant';
import '../../assets/history/monthly-history.scss';
import { displayWeeks, WeeklyInfo } from '../../lib/date';
import { EditTransactionModal, SelectMenu } from '../uikit';
import { incomeTransactionType } from '../../lib/constant';
import { getPathTemplateName } from '../../lib/path';
import GroupMonthlyHistory from './GroupMothlyHistory';
import { SelectYears } from '../../lib/date';

interface MonthlyHistoryProps {
  year: number;
  month: number;
}

const MonthlyHistory = (props: MonthlyHistoryProps) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const pathName = getPathTemplateName(window.location.pathname);
  const transactionsList = getTransactions(selector);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const years: SelectYears = {
      selectedYear: String(props.year),
      selectedMonth: props.month <= 9 ? '0' + props.month : String(props.month),
    };
    if (pathName !== 'group') {
      dispatch(fetchTransactionsList(years));
    }
  }, [pathName]);

  const handleOpen = (transactionId: number) => {
    setOpenId(transactionId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpenId(undefined);
    setOpen(false);
  };

  const subTotalAmounts = (startDate: number, endDate: number) => {
    let oneWeekSubTotal = 0;

    for (const transaction of transactionsList) {
      if (transaction.transaction_type !== incomeTransactionType) {
        const transactionDay = Number(transaction.transaction_date.slice(8, 10));
        if (startDate <= transactionDay && transactionDay <= endDate) {
          oneWeekSubTotal += transaction.amount;
        }
      }
    }

    return oneWeekSubTotal;
  };

  const rows = () => {
    let headerRow: ReactElement[] = [];
    let historyRow: ReactElement[] = [];
    let operationRow: ReactElement[] = [];
    let subTotalAmountRow: ReactElement[] = [];
    let weekNum = 1;

    displayWeeks(props.year, props.month).map((displayWeek: WeeklyInfo, index: number) => {
      headerRow = [
        ...headerRow,
        <th key={index} align="center">
          {weekNum++}週目
          <br />
          {props.month + '月' + displayWeek.startDate + '日'}~{displayWeek.endDate + '日'}
        </th>,
      ];

      historyRow = [
        ...historyRow,
        <td className="monthly-history-table__record-second" key={'week' + index}>
          {(() => {
            let items: ReactElement[] = [];
            let prevTransactionDate = '';

            transactionsList.map((transaction, index) => {
              const {
                id,
                transaction_date,
                transaction_type,
                medium_category_name,
                custom_category_name,
                shop,
                amount,
                memo,
              } = transaction;
              const transactionDay = Number(transaction.transaction_date.slice(8, 10));

              const categoryName = {
                mediumCategory: medium_category_name !== null ? medium_category_name : '',
                customCategory: custom_category_name !== null ? custom_category_name : '',
              };

              if (transaction_type === incomeTransactionType) {
                return null;
              }

              if (
                displayWeek.startDate <= transactionDay &&
                transactionDay <= displayWeek.endDate
              ) {
                items = [
                  ...items,
                  <dl
                    className="monthly-history-table__dl"
                    key={'id' + index}
                    onClick={() => handleOpen(id)}
                  >
                    <dt>
                      <span>
                        {(() => {
                          if (prevTransactionDate != transaction_date) {
                            prevTransactionDate = transaction_date;
                            return (
                              <span>
                                {transaction_date}
                                <br />
                              </span>
                            );
                          } else {
                            return;
                          }
                        })()}
                        {(() => {
                          if (medium_category_name != null) {
                            return medium_category_name;
                          }

                          return custom_category_name;
                        })()}
                        ¥{amount}
                      </span>
                    </dt>
                  </dl>,
                  <EditTransactionModal
                    key={index}
                    open={openId === id && open}
                    onClose={handleClose}
                    id={id}
                    shop={shop === null ? '' : shop}
                    memo={memo === null ? '' : memo}
                    amount={amount}
                    categoryName={categoryName}
                    transactionDate={transaction_date}
                    transactionsType={transaction_type}
                  />,
                ];
              }
            });
            return items;
          })()}
        </td>,
      ];

      operationRow = [
        ...operationRow,
        <td className="monthly-history-table__record-third" key={index} align={'center'}>
          <SelectMenu startDate={displayWeek.startDate} endDate={displayWeek.endDate} />
        </td>,
      ];

      subTotalAmountRow = [
        ...subTotalAmountRow,
        <td key={index} className="monthly-history-table__record-fourth">
          小計 ¥ {subTotalAmounts(displayWeek.startDate, displayWeek.endDate).toLocaleString()}
        </td>,
      ];
    });
    return {
      headerRow: headerRow,
      historyRow: historyRow,
      operationRow: operationRow,
      totalAmountRow: subTotalAmountRow,
    };
  };

  const totalAmount = () => {
    let amount = 0;

    for (const transaction of transactionsList) {
      if (transaction.transaction_type !== incomeTransactionType) {
        amount += transaction.amount;
      }
    }
    return amount;
  };

  return (
    <>
      {(() => {
        if (pathName !== 'group') {
          return (
            <>
              <div className="monthly-history-table__spacer" />
              <div className="box__monthlyExpense">
                {pathName !== 'weekly' && <h2>{month}月の支出</h2>}
                <table className="monthly-history-table">
                  <tbody className="monthly-history-table__tbody">
                    <tr className="monthly-history-table__thead">{rows().headerRow}</tr>
                    <tr className="monthly-history-table__trow">{rows().historyRow}</tr>
                    <tr className="monthly-history-table__trow">{rows().operationRow}</tr>
                    <tr className="monthly-history-table__trow">{rows().totalAmountRow}</tr>
                  </tbody>
                </table>
                <div className="monthly-history-table__box-total">
                  合計： ¥ {totalAmount().toLocaleString()}
                </div>
              </div>
            </>
          );
        } else {
          return <GroupMonthlyHistory month={props.month} year={props.year} />;
        }
      })()}
    </>
  );
};

export default MonthlyHistory;
