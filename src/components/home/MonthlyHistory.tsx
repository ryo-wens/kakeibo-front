import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionsList } from '../../reducks/transactions/operations';
import { State } from '../../reducks/store/types';
import { getTransactions } from '../../reducks/transactions/selectors';
import { year, month, customMonth } from '../../lib/constant';
import '../../assets/home/monthly-history.scss';
import '../../assets/modules/button.scss';
import { fetchCategories } from '../../reducks/categories/operations';
import { displayWeeks, WeeklyInfo } from '../../lib/date';

const MonthlyHistory = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const transactionsList = getTransactions(selector);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    dispatch(fetchTransactionsList(String(year), customMonth));
  }, []);

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
        <td className="monthlyhistory-table__record-second" key={index}>
          {(() => {
            let items: ReactElement[] = [];
            let prevTransactionDate = '';

            transactionsList.map((transaction) => {
              const transactionDay = Number(transaction.transaction_date.slice(8, 10));

              if (
                displayWeek.startDate <= transactionDay &&
                transactionDay <= displayWeek.endDate
              ) {
                items = [
                  ...items,
                  <dl className="monthlyhistory-table__dl" key={transaction.id}>
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
                ];
              }
            });
            return items;
          })()}
        </td>,
      ];

      operationRow = [
        ...operationRow,
        <td className="monthlyhistory-table__record-third" key={index} align={'center'}>
          <button className="btn btn--orange">入力する</button>
        </td>,
      ];

      subTotalAmountRow = [
        ...subTotalAmountRow,
        <td key={index} className="monthlyhistory-table__record-fourth">
          小計
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

  return (
    <div className="box__monthlyExpense">
      <h2>{month}月の支出</h2>
      <table className="monthlyhistory-table">
        <tbody className="monthlyhistory-table__tbody">
          <tr className="monthlyhistory-table__thead">{rows().headerRow}</tr>
          <tr className="monthlyhistory-table__trow">{rows().historyRow}</tr>
          <tr className="monthlyhistory-table__trow">{rows().operationRow}</tr>
          <tr className="monthlyhistory-table__trow">{rows().totalAmountRow}</tr>
        </tbody>
      </table>
      <div className="monthlyhistory-table__box-total">合計：</div>
    </div>
  );
};

export default MonthlyHistory;
