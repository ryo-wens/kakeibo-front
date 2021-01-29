import React from 'react';
import { HistoryRow, HistoryRowItem } from '../../../reducks/transactions/types';
import { GroupTransactionsList } from '../../../reducks/groupTransactions/types';
import { bigCategoryColor } from '../../../lib/function';
import { displayWeeks, WeeklyInfo } from '../../../lib/date';
import EditTransactionModalContainer from '../../../containers/home/modal/EditTransactionModalContainer';
import '../../../assets/history/monthly-history.scss';

interface GroupWeeklyHistoryRowProps {
  year: number;
  month: number;
  open: boolean;
  openId: number | undefined;
  openModal: (transactionId: number) => void;
  closeModal: () => void;
  expenseGroupTransactionsList: GroupTransactionsList;
  currentWeekBorder: (weekNum: number) => { border: string };
  payerUnderLineColor: (payerUserId: string) => React.CSSProperties;
}

const GroupWeeklyHistoryRow = (props: GroupWeeklyHistoryRowProps) => {
  const rows: HistoryRow = {
    historyRow: [],
  };

  const groupHistoryRow = () => {
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

            props.expenseGroupTransactionsList.map((groupTransaction, index) => {
              const transactionDay = Number(groupTransaction.transaction_date.slice(8, 10));

              const categoryName = {
                bigCategory: groupTransaction.big_category_name,
                mediumCategory:
                  groupTransaction.medium_category_name !== null
                    ? groupTransaction.medium_category_name
                    : '',
                customCategory:
                  groupTransaction.custom_category_name !== null
                    ? groupTransaction.custom_category_name
                    : '',
              };

              if (
                displayWeek.startDate <= transactionDay &&
                transactionDay <= displayWeek.endDate
              ) {
                historyRowItem.rowItem = [
                  ...historyRowItem.rowItem,
                  <dl
                    className="monthly-history-table__dl"
                    key={'id' + index}
                    onClick={() => props.openModal(groupTransaction.id)}
                  >
                    <dt>
                      <span>
                        {(() => {
                          if (
                            historyRowItem.prevTransactionDate != groupTransaction.transaction_date
                          ) {
                            historyRowItem.prevTransactionDate = groupTransaction.transaction_date;
                            return (
                              <span className="monthly-history-table__item-font">
                                {groupTransaction.transaction_date}
                                <br />
                              </span>
                            );
                          } else {
                            return;
                          }
                        })()}

                        <>
                          <span
                            style={bigCategoryColor(groupTransaction.big_category_name)}
                            className="monthly-history-table__category-color"
                          />
                          <span className="monthly-history-table__item-font monthly-history-table__item-font--weight">
                            {groupTransaction.medium_category_name != null
                              ? groupTransaction.medium_category_name
                              : groupTransaction.custom_category_name}
                          </span>
                          <span
                            style={props.payerUnderLineColor(groupTransaction.payment_user_id)}
                            className="monthly-history-table__item-font--position monthly-history-table__item-font"
                          >
                            ¥ {groupTransaction.amount.toLocaleString()}
                          </span>
                          <span />
                        </>
                      </span>
                    </dt>
                  </dl>,
                  <EditTransactionModalContainer
                    key={index}
                    open={props.openId === groupTransaction.id && props.open}
                    onClose={props.closeModal}
                    id={groupTransaction.id}
                    shop={groupTransaction.shop === null ? '' : groupTransaction.shop}
                    memo={groupTransaction.memo === null ? '' : groupTransaction.memo}
                    amount={groupTransaction.amount}
                    categoryName={categoryName}
                    transactionDate={groupTransaction.transaction_date}
                    transactionsType={groupTransaction.transaction_type}
                    paymentUserId={groupTransaction.payment_user_id}
                    bigCategoryId={groupTransaction.big_category_id}
                    mediumCategoryId={groupTransaction.medium_category_id}
                    customCategoryId={groupTransaction.custom_category_id}
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

  return <tr className="monthly-history-table__trow">{groupHistoryRow().historyRow}</tr>;
};
export default GroupWeeklyHistoryRow;
