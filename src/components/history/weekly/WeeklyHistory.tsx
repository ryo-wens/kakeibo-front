import React from 'react';
import { FetchTransactions, HistoryRows } from '../../../reducks/transactions/types';
import { GroupTransactions } from '../../../reducks/groupTransactions/types';
import { month } from '../../../lib/constant';
import { SelectMenu } from '../../uikit';
import { displayWeeks, WeeklyInfo } from '../../../lib/date';
import WeeklyHistoryRow from './WeeklyHistoryRow';
import GroupWeeklyHistoryContainer from '../../../containers/history/weekly/GroupWeeklyHistoryContainer';
import '../../../assets/history/monthly-history.scss';

interface MonthlyHistoryProps {
  open: boolean;
  openId: number | undefined;
  year: number;
  month: number;
  pathName: string;
  openModal: (transactionId: number) => void;
  closeModal: () => void;
  expenseTransactionsList: FetchTransactions[];
  expenseGroupTransactionsList: GroupTransactions[];
  currentWeekBorder: (weekNum: number) => { border: string };
  subTotalAmounts: (startDate: number, endDate: number) => number;
  totalAmount: () => number;
}

const WeeklyHistory = (props: MonthlyHistoryProps) => {
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
      {props.pathName !== 'group' ? (
        <>
          <div className="monthly-history-table__spacer__big" />
          <div className="box__monthlyExpense">
            {props.pathName !== 'weekly' && <h2>{month}月の支出</h2>}
            <table className="monthly-history-table">
              <tbody className="monthly-history-table__tbody">
                <tr className="monthly-history-table__thead">{historyRows().headerRow}</tr>
                <WeeklyHistoryRow
                  open={props.open}
                  openId={props.openId}
                  year={props.year}
                  month={props.month}
                  openModal={props.openModal}
                  closeModal={props.closeModal}
                  currentWeekBorder={props.currentWeekBorder}
                  expenseTransactionsList={props.expenseTransactionsList}
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
      ) : (
        <GroupWeeklyHistoryContainer month={props.month} year={props.year} />
      )}
    </>
  );
};

export default WeeklyHistory;
