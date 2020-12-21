import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { getGroupTransactions } from '../../reducks/groupTransactions/selectors';
import { getApprovedGroups } from '../../reducks/groups/selectors';
import { GroupTransactionsList } from '../../reducks/groupTransactions/types';
import { currentWeekNumber, incomeTransactionType } from '../../lib/constant';
import { bigCategoryColor } from '../../lib/function';
import { month } from '../../lib/constant';
import { displayWeeks, WeeklyInfo } from '../../lib/date';
import { EditTransactionModal, SelectMenu } from '../uikit';
import { useParams } from 'react-router';
import './color-explanation.scss';
import ColorExplanation from './ColorExplanation';

interface GroupMonthlyHistoryProps {
  year: number;
  month: number;
  groupTransactionsList: GroupTransactionsList;
}

const GroupMonthlyHistory = (props: GroupMonthlyHistoryProps) => {
  const selector = useSelector((state: State) => state);
  const { id } = useParams();
  const path = window.location.pathname;
  const approvedGroup = useSelector(getApprovedGroups);
  const currentGroupId = approvedGroup.findIndex((group) => group.group_id === Number(id));
  const currentGroup = approvedGroup[currentGroupId];
  const groupTransactionsList = getGroupTransactions(selector);
  const [open, setOpen] = useState<boolean>(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);

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

  const currentWeekBorder = (weekNum: number) => {
    if (weekNum === currentWeekNumber) {
      return {
        border: 'solid 2px #E2750F',
      };
    } else {
      return;
    }
  };

  const payerColor = (payerUserId: string): React.CSSProperties | undefined => {
    let color = '';

    for (const groupUser of currentGroup.approved_users_list) {
      if (groupUser.user_id === payerUserId) {
        color = groupUser.color_code;
      }
    }

    return { borderBottom: `2px solid ${color}` };
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
        <td
          style={currentWeekBorder(index + 1)}
          className="monthly-history-table__record-second"
          key={index}
        >
          {(() => {
            let items: ReactElement[] = [];
            let prevTransactionDate = '';

            groupTransactionsList.map((groupTransaction, index) => {
              const {
                id,
                transaction_date,
                transaction_type,
                big_category_name,
                medium_category_name,
                custom_category_name,
                shop,
                memo,
                amount,
                payment_user_id,
              } = groupTransaction;
              const transactionDay = Number(transaction_date.slice(8, 10));

              const categoryName = {
                bigCategory: big_category_name,
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
                              <>
                                <span className="monthly-history-table__item-font">
                                  {transaction_date}
                                  <br />
                                </span>
                              </>
                            );
                          } else {
                            return;
                          }
                        })()}
                        {(() => {
                          if (groupTransaction.medium_category_name != null) {
                            return (
                              <>
                                <span
                                  style={bigCategoryColor(big_category_name)}
                                  className="monthly-history-table__category-color"
                                />
                                <span className="monthly-history-table__item-font monthly-history-table__item-font--weight">
                                  {medium_category_name}
                                </span>
                                <span
                                  style={payerColor(payment_user_id)}
                                  className="monthly-history-table__item-font--position monthly-history-table__item-font"
                                >
                                  ¥ {amount.toLocaleString()}
                                </span>
                                <span />
                              </>
                            );
                          }

                          return (
                            <>
                              <span
                                style={bigCategoryColor(big_category_name)}
                                className="monthly-history-table__category-color"
                              />
                              <span className="monthly-history-table__item-font monthly-history-table__item-font--weight">
                                {custom_category_name}
                              </span>
                              <span className="monthly-history-table__item-font--position monthly-history-table__item-font">
                                ¥ {amount.toLocaleString()}
                              </span>
                            </>
                          );
                        })()}
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
                    paymentUserId={payment_user_id}
                    approvedGroups={approvedGroup}
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
          <SelectMenu
            startDate={displayWeek.startDate}
            endDate={displayWeek.endDate}
            month={props.month}
            year={props.year}
          />
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
    <>
      <div className="monthly-history-table__spacer__big" />
      <div className="box__monthlyExpense">
        {path !== `/group/${Number(id)}/weekly/history` && <h2>{month}月の支出</h2>}
        <ColorExplanation approvedGroup={currentGroup} />
        <div className="color-explanation__spacer--small" />
        <div className="monthly-history-table__spacer__small" />
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
};
export default GroupMonthlyHistory;
