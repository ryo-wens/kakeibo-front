import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionsList } from '../../reducks/transactions/operations';
import { State } from '../../reducks/store/types';
import { getTransactions } from '../../reducks/transactions/selectors';
import { year, month, customMonth } from '../../lib/constant';
import '../../assets/monthly-history.scss';
import { displayWeeks, WeeklyInfo } from '../../lib/date';
import { EditTransactionModal, SelectMenu } from '../uikit';
import { incomeTransactionType } from '../../lib/constant';

const MonthlyHistory = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const transactionsList = getTransactions(selector);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<number | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchTransactionsList(String(year), customMonth));
  }, []);

  const handleOpen = (transactionId: number) => {
    setOpen(transactionId);
    setModalOpen(true);
  };

  const handleClose = () => {
    setOpen(undefined);
    setModalOpen(false);
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

    displayWeeks().map((displayWeek: WeeklyInfo, index: number) => {
      headerRow = [
        ...headerRow,
        <th key={index} align="center">
          {weekNum++}週目
          <br />
          {month + '月' + displayWeek.startDate + '日'}~{displayWeek.endDate + '日'}
        </th>,
      ];

      historyRow = [
        ...historyRow,
        <td className="monthly-history-table__record-second" key={index}>
          {(() => {
            let items: ReactElement[] = [];
            let prevTransactionDate = '';

            transactionsList.map((transaction, index) => {
              const transactionDay = Number(transaction.transaction_date.slice(8, 10));

              const categoryName = {
                mediumCategory:
                  transaction.medium_category_name !== null ? transaction.medium_category_name : '',
                customCategory:
                  transaction.custom_category_name !== null ? transaction.custom_category_name : '',
              };

              if (transaction.transaction_type === incomeTransactionType) {
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
                    key={transaction.id}
                    onClick={() => handleOpen(transaction.id)}
                  >
                    <dt>
                      <span>
                        {(() => {
                          if (prevTransactionDate != transaction.transaction_date) {
                            prevTransactionDate = transaction.transaction_date;
                            return (
                              <span>
                                {transaction.transaction_date}
                                <br />
                              </span>
                            );
                          } else {
                            return;
                          }
                        })()}
                        {(() => {
                          if (transaction.medium_category_name != null) {
                            return transaction.medium_category_name;
                          }

                          return transaction.custom_category_name;
                        })()}
                        ¥{transaction.amount}
                      </span>
                    </dt>
                  </dl>,
                  <EditTransactionModal
                    key={index}
                    open={open === transaction.id && modalOpen}
                    onClose={handleClose}
                    id={transaction.id}
                    shop={transaction.shop === null ? '' : transaction.shop}
                    memo={transaction.memo === null ? '' : transaction.memo}
                    amount={transaction.amount}
                    categoryName={categoryName}
                    transactionDate={transaction.transaction_date}
                    transactionsType={transaction.transaction_type}
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
    <div className="box__monthlyExpense">
      <h2>{month}月の支出</h2>
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
  );
};

export default MonthlyHistory;
