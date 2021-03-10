import React from 'react';
import { GroupTransactionsList } from '../../reducks/groupTransactions/types';
import WeeklyHistoryContainer from '../../containers/history/weekly/WeeklyHistoryContainer';
import GroupWeeklyHistoryContainer from '../../containers/history/weekly/GroupWeeklyHistoryContainer';
import DailyHistoryContainer from '../../containers/history/daily/DailyHistoryContainer';
import InputYears from '../../components/modules/InputYears';
import HeaderContainer from '../../containers/header/HeaderContainer';
import './history.scss';

interface HistoryProps {
  query: string;
  pathName: string;
  groupId: string;
  openSearchField: boolean;
  notSpecified: boolean;
  selectedYear: number;
  selectedMonth: number;
  groupTransactionsList: GroupTransactionsList;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  searchFieldOpen: () => void;
  searchFieldClose: () => void;
  currentPageColor: (currentPath: string) => { backgroundColor: string; color: string } | undefined;
  routingDailyHistory: () => void;
  routingWeeklyHistory: () => void;
}

const History = (props: HistoryProps) => {
  return (
    <>
      <HeaderContainer />
      <main className="section__container">
        <div className="history__position">
          <div
            className="switch-item-tabs__buttons  history__top-button"
            aria-label="small outlined button group"
          >
            <button style={props.currentPageColor('?daily')} onClick={props.routingDailyHistory}>
              日ごと
            </button>
            <button style={props.currentPageColor('?weekly')} onClick={props.routingWeeklyHistory}>
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

        {props.query === '?daily' && (
          <div className="history__table-size">
            <DailyHistoryContainer
              selectYear={props.selectedYear}
              selectMonth={props.selectedMonth}
              openSearchField={props.openSearchField}
              notSpecified={props.notSpecified}
              searchFieldOpen={props.searchFieldOpen}
              searchFieldClose={props.searchFieldClose}
            />
          </div>
        )}

        {props.query === '?weekly' && (
          <div className="history__table-size">
            <WeeklyHistoryContainer month={props.selectedMonth} year={props.selectedYear} />
          </div>
        )}

        {props.query === '?weekly' && (
          <div className="history__table-size">
            <GroupWeeklyHistoryContainer month={props.selectedMonth} year={props.selectedYear} />
          </div>
        )}
      </main>
    </>
  );
};
export default History;
