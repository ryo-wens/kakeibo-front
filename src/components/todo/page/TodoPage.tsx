import React from 'react';
import styles from './TodoPage.module.scss';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';
import ExpiredTodoListAreaContainer from '../../../containers/todo/modules/area/expiredTodoListArea/ExpiredTodoListAreaContainer';
import TodayTodoAreaContainer from '../../../containers/todo/modules/area/todayTodoListArea/TodayTodoListAreaContainer';
import MonthlyTodoListAreaContainer from '../../../containers/todo/modules/area/monthlyTodoListArea/MonthlyTodoListAreaContainer';
import SearchTodoListAreaContainer from '../../../containers/todo/modules/area/searchTodoListArea/SearchTodoListAreaContainer';

interface TodoPageProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  currentTodayOrMonthly: TodayOrMonthly;
  setCurrentTodayOrMonthly: React.Dispatch<React.SetStateAction<TodayOrMonthly>>;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  openSearchTodoList: boolean;
  handleOpenSearch: () => void;
  handleCloseSearch: () => void;
  pathName: string;
}

const TodoPage = (props: TodoPageProps) => {
  return (
    <>
      {!props.openSearchTodoList ? (
        <div className={styles.wrapper}>
          <div className={styles.leftArea}>
            <div className={styles.leftContent}>
              <div className={styles.switchBtn}>
                <button className={styles.search} onClick={() => props.handleOpenSearch()}>
                  検索
                </button>
                <SwitchTodayOrMonthlyTabsContainer
                  currentItem={props.currentTodayOrMonthly}
                  setCurrentItems={props.setCurrentTodayOrMonthly}
                  leftItem={
                    <TodayTodoAreaContainer
                      selectedYear={props.selectedYear}
                      selectedMonth={props.selectedMonth}
                      editing={props.editing}
                      setEditing={props.setEditing}
                    />
                  }
                  rightItem={
                    <MonthlyTodoListAreaContainer
                      selectedYear={props.selectedYear}
                      selectedMonth={props.selectedMonth}
                      setSelectedYear={props.setSelectedYear}
                      setSelectedMonth={props.setSelectedMonth}
                      editing={props.editing}
                      setEditing={props.setEditing}
                    />
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.rightArea}>
            <div className={styles.rightContent}>
              <h4>期限切れToDoリスト</h4>
              <ExpiredTodoListAreaContainer
                selectedYear={props.selectedYear}
                selectedMonth={props.selectedMonth}
                setEditing={props.setEditing}
                readMoreBtnClassName={styles.childReadBtn}
              />
            </div>
          </div>
        </div>
      ) : (
        <SearchTodoListAreaContainer handleCloseSearch={props.handleCloseSearch} />
      )}
    </>
  );
};

export default TodoPage;
