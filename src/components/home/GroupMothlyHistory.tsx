import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupTransactionsList } from '../../reducks/groupTransactions/operations';
import { State } from '../../reducks/store/types';
import { getGroupTransactions } from '../../reducks/groupTransactions/selectors';
import { incomeTransactionType } from '../../lib/constant';
import { getPathGroupId } from '../../lib/path';
import { year, month, customMonth } from '../../lib/constant';
import { displayWeeks, WeeklyInfo } from '../../lib/date';
import { EditTransactionModal, SelectMenu } from '../uikit';

const GroupMonthlyHistory = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const groupId = getPathGroupId(window.location.pathname);
  const groupTransactionsList = getGroupTransactions(selector);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchGroupTransactionsList(year, customMonth, groupId));
  }, []);

  const handleOpen = (transactionId: number) => {
    setOpen(true);
    setOpenId(transactionId);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenId(undefined);
  };

  const subTotalAmounts = (startDate: number, endDate: number) => {
    let oneWeekSubTotal = 0;

    for (const groupTransaction of groupTransactionsList) {
      if (groupTransaction.transaction_type !== incomeTransactionType) {
        const transactionDay = Number(groupTransaction.transaction_date.slice(8, 10));
        if (startDate <= transactionDay && transactionDay <= endDate) {
          oneWeekSubTotal += groupTransaction.amount;
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

            groupTransactionsList.map((groupTransaction, index) => {
              const {
                id,
                transaction_date,
                transaction_type,
                medium_category_name,
                custom_category_name,
                shop,
                memo,
                amount,
              } = groupTransaction;
              const transactionDay = Number(transaction_date.slice(8, 10));

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
                  <dl className="monthly-history-table__dl" key={id} onClick={() => handleOpen(id)}>
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
                          if (groupTransaction.medium_category_name != null) {
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

    for (const groupTransaction of groupTransactionsList) {
      if (groupTransaction.transaction_type !== incomeTransactionType) {
        amount += groupTransaction.amount;
      }
    }
    return amount;
  };

  return (
    <div className="box__monthlyExpense">
      <table className="monthly-history-table">
        <h2>{month}月の支出</h2>
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
export default GroupMonthlyHistory;
