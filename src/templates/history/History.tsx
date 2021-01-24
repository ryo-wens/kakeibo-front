import React from 'react';
import { GroupTransactionsList } from '../../reducks/groupTransactions/types';
import { MonthlyHistory, GroupMonthlyHistory } from '../../components/home';
import DailyHistoryContainer from '../../containers/history/DailyHistoryContainer';
import InputYears from '../../components/uikit/InputYears';
import { Header } from '../../components/header';
import './history.scss';

interface HistoryProps {
  path: string;
  pathName: string;
  groupId: string;
  openSearchField: boolean;
  selectedYear: number;
  selectedMonth: number;
  groupTransactionsList: GroupTransactionsList;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  setOpenSearchField: React.Dispatch<React.SetStateAction<boolean>>;
  currentPageColor: (currentPath: string) => { backgroundColor: string; color: string } | undefined;
  routingDailyHistory: () => void;
  routingWeeklyHistory: () => void;
}

const History = (props: HistoryProps) => {
  return (
    <>
      <Header />
      <main className="section__container">
        <div className="history__position">
          <div
            className="switch-item-tabs__buttons  history__top-button"
            aria-label="small outlined button group"
          >
            <button
              style={props.currentPageColor(
                props.pathName !== 'group'
                  ? '/daily/history'
                  : `/group/${props.groupId}/daily/history`
              )}
              onClick={props.routingDailyHistory}
            >
              日ごと
            </button>
            <button
              style={props.currentPageColor(
                props.pathName !== 'group'
                  ? '/weekly/history'
                  : `/group/${props.groupId}/weekly/history`
              )}
              onClick={props.routingWeeklyHistory}
            >
              週ごと
            </button>
          </div>
          <div className="history__spacer" />
          {!props.openSearchField && (
            <InputYears
              selectedYear={props.selectedYear}
              selectedMonth={props.selectedMonth}
              setSelectedMonth={props.setSelectedMonth}
              setSelectedYear={props.setSelectedYear}
            />
          )}
        </div>

        {(props.path === '/daily/history' ||
          props.path === `/group/${props.groupId}/daily/history`) && (
          <div className="history__table-size">
            <DailyHistoryContainer
              selectYear={props.selectedYear}
              selectMonth={props.selectedMonth}
              openSearchField={props.openSearchField}
              setOpenSearchField={props.setOpenSearchField}
            />
          </div>
        )}

        {props.path === '/weekly/history' && (
          <div className="history__table-size">
            <MonthlyHistory month={props.selectedMonth} year={props.selectedYear} />
          </div>
        )}

        {props.path === `/group/${props.groupId}/weekly/history` && (
          <div className="history__table-size">
            <GroupMonthlyHistory
              month={props.selectedMonth}
              year={props.selectedYear}
              groupTransactionsList={props.groupTransactionsList}
            />
          </div>
        )}
      </main>
    </>
  );
};
export default History;
