import React from 'react';
import { Group, Groups } from '../../../reducks/groups/types';
import { HistoryRows } from '../../../reducks/transactions/types';
import { GroupTransactionsList } from '../../../reducks/groupTransactions/types';
import { month } from '../../../lib/constant';
import { displayWeeks, WeeklyInfo } from '../../../lib/date';
import ColorExplanation from '../../home/ColorExplanation';
import { SelectMenu } from '../../uikit';
import GroupWeeklyHistoryRow from './GroupWeeklyHistoryRow';
import '../../../assets/history/monthly-history.scss';

interface GroupWeeklyHistoryProps {
  year: number;
  month: number;
  path: string;
  open: boolean;
  openId: number | undefined;
  groupId: number;
  approvedGroup: Groups;
  openModal: (transactionId: number) => void;
  closeModal: () => void;
  currentGroup: Group;
  expenseGroupTransactionsList: GroupTransactionsList;
  currentWeekBorder: (weekNum: number) => { border: string };
  subTotalAmounts: (startDate: number, endDate: number) => number;
  totalAmount: () => number;
  payerUnderLineColor: (payerUserId: string) => React.CSSProperties;
}

const GroupWeeklyHistory = (props: GroupWeeklyHistoryProps) => {
  const historyRows = () => {
    const rows: HistoryRows = {
      headerRow: [],
      operationRow: [],
      subTotalAmountRow: [],
      weekNum: 1,
    };

    displayWeeks(props.year, props.month).map((displayWeek: WeeklyInfo, index: number) => {
      rows.headerRow = [
        ...rows.headerRow,
        <th key={index} align="center">
          {rows.weekNum++}週目
          <br />
          {props.month + '月' + displayWeek.startDate + '日'}~{displayWeek.endDate + '日'}
        </th>,
      ];

      rows.operationRow = [
        ...rows.operationRow,
        <td className="monthly-history-table__record-third" key={index} align={'center'}>
          <SelectMenu
            startDate={displayWeek.startDate}
            endDate={displayWeek.endDate}
            month={props.month}
            year={props.year}
          />
        </td>,
      ];

      rows.subTotalAmountRow = [
        ...rows.subTotalAmountRow,
        <td key={index} className="monthly-history-table__record-fourth">
          小計 ¥{' '}
          {props.subTotalAmounts(displayWeek.startDate, displayWeek.endDate).toLocaleString()}
        </td>,
      ];
    });
    return {
      headerRow: rows.headerRow,
      operationRow: rows.operationRow,
      totalAmountRow: rows.subTotalAmountRow,
    };
  };

  return (
    <>
      <div className="monthly-history-table__spacer__big" />
      <div className="box__monthlyExpense">
        {props.path !== `/group/${props.groupId}/weekly/history` && <h2>{month}月の支出</h2>}
        <ColorExplanation approvedGroup={props.currentGroup} />
        <div className="color-explanation__spacer--small" />
        <div className="monthly-history-table__spacer__small" />
        <table className="monthly-history-table">
          <tbody className="monthly-history-table__tbody">
            <tr className="monthly-history-table__thead">{historyRows().headerRow}</tr>
            <GroupWeeklyHistoryRow
              year={props.year}
              month={props.month}
              open={props.open}
              openId={props.openId}
              openModal={props.openModal}
              closeModal={props.closeModal}
              expenseGroupTransactionsList={props.expenseGroupTransactionsList}
              currentWeekBorder={props.currentWeekBorder}
              payerUnderLineColor={props.payerUnderLineColor}
            />
            <tr className="monthly-history-table__trow">{historyRows().operationRow}</tr>
            <tr className="monthly-history-table__trow">{historyRows().totalAmountRow}</tr>
          </tbody>
        </table>
        <div className="monthly-history-table__box-total">
          合計： ¥ {props.totalAmount().toLocaleString()}
        </div>
      </div>
    </>
  );
};
export default GroupWeeklyHistory;
