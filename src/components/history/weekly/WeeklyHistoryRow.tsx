import React from 'react';
import { bigCategoryColor } from '../../../lib/function';
import EditTransactionModalContainer from '../../../containers/home/modal/EditTransactionModalContainer';
import { FetchTransactions, HistoryRow, HistoryRowItem } from '../../../reducks/transactions/types';
import { displayWeeks, WeeklyInfo } from '../../../lib/date';
import '../../../assets/history/monthly-history.scss';

interface WeeklyHistoryRowProps {
  year: number;
  month: number;
  open: boolean;
  openId: number | undefined;
  openModal: (transactionId: number) => void;
  closeModal: () => void;
  expenseTransactionsList: FetchTransactions[];
  currentWeekBorder: (weekNum: number) => { border: string };
}

const WeeklyHistoryRow = (props: WeeklyHistoryRowProps) => {
  const rows: HistoryRow = {
    historyRow: [],
  };

  const historyRow = () => {
    displayWeeks(props.year, props.month).map((displayWeek: WeeklyInfo, index: number) => {
      rows.historyRow = [
        ...rows.historyRow,
        <td
          style={props.currentWeekBorder(index + 1)}
          className="monthly-history-table__record-second"
          key={index}
        >
          {(() => {
            const historyRowItem: HistoryRowItem = {
              rowItem: [],
              prevTransactionDate: '',
            };

            props.expenseTransactionsList.map((transaction, transactionIndex) => {
              const transactionDay = Number(transaction.transaction_date.slice(8, 10));

              const categoryName = {
                bigCategory: transaction.big_category_name,
                mediumCategory:
                  transaction.medium_category_name !== null ? transaction.medium_category_name : '',
                customCategory:
                  transaction.custom_category_name !== null ? transaction.custom_category_name : '',
              };

              if (
                displayWeek.startDate <= transactionDay &&
                transactionDay <= displayWeek.endDate
              ) {
                historyRowItem.rowItem = [
                  ...historyRowItem.rowItem,
                  <dl
                    className="monthly-history-table__dl"
                    key={transaction.id}
                    onClick={() => props.openModal(transaction.id)}
                  >
                    <dt>
                      <span>
                        {(() => {
                          if (historyRowItem.prevTransactionDate != transaction.transaction_date) {
                            historyRowItem.prevTransactionDate = transaction.transaction_date;
                            return (
                              <span className="monthly-history-table__item-font">
                                {transaction.transaction_date}
                                <br />
                              </span>
                            );
                          } else {
                            return;
                          }
                        })()}

                        <>
                          <span
                            style={bigCategoryColor(transaction.big_category_name)}
                            className="monthly-history-table__category-color"
                          />
                          <span className="monthly-history-table__item-font monthly-history-table__item-font--weight">
                            {transaction.medium_category_name != null
                              ? transaction.medium_category_name
                              : transaction.custom_category_name}
                          </span>
                          <span className="monthly-history-table__item-font--position monthly-history-table__item-font">
                            ¥{transaction.amount.toLocaleString()}
                          </span>
                        </>
                      </span>
                    </dt>
                  </dl>,
                  <EditTransactionModalContainer
                    key={transactionIndex}
                    open={props.openId === transaction.id && props.open}
                    onClose={props.closeModal}
                    id={transaction.id}
                    shop={transaction.shop === null ? '' : transaction.shop}
                    memo={transaction.memo === null ? '' : transaction.memo}
                    amount={transaction.amount}
                    categoryName={categoryName}
                    transactionDate={transaction.transaction_date}
                    transactionsType={transaction.transaction_type}
                    bigCategoryId={transaction.big_category_id}
                    mediumCategoryId={transaction.medium_category_id}
                    customCategoryId={transaction.custom_category_id}
                  />,
                ];
              }
            });
            return historyRowItem.rowItem;
          })()}
        </td>,
      ];
    });

    return { historyRow: rows.historyRow };
  };

  return <tr className="monthly-history-table__trow">{historyRow().historyRow}</tr>;
};
export default WeeklyHistoryRow;
