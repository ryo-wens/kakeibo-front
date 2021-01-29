import React from 'react';
import './todo-page.scss';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';
import ExpiredTodoListAreaContainer from '../../../containers/todo/page/expiredTodoListArea/ExpiredTodoListAreaContainer';
import TodayTodoAreaContainer from '../../../containers/todo/page/todayTodoListArea/TodayTodoListAreaContainer';
import MonthlyTodoListAreaContainer from '../../../containers/todo/page/monthlyTodoListArea/MonthlyTodoListAreaContainer';
import SearchTodoListAreaContainer from '../../../containers/todo/page/searchTodoListArea/SearchTodoListAreaContainer';

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
  openSearchResultTodoList: boolean;
  setOpenSearchResultTodoList: React.Dispatch<React.SetStateAction<boolean>>;
  openSearch: () => void;
  closeSearch: () => void;
  currentYearMonth: string;
  pathName: string;
}

const TodoPage = (props: TodoPageProps) => {
  return (
    <>
      {!props.openSearchTodoList ? (
        <div className="todo-page">
          <div className="todo-page__left">
            <div className="todo-page__left-content">
              <div className="todo-page__switch-btn">
                <button className="todo-page__search" onClick={() => props.openSearch()}>
                  検索
                </button>
                <SwitchTodayOrMonthlyTabsContainer
                  currentItem={props.currentTodayOrMonthly}
                  setCurrentItems={props.setCurrentTodayOrMonthly}
                  leftItem={
                    <TodayTodoAreaContainer
                      currentYearMonth={props.currentYearMonth}
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
                      currentYearMonth={props.currentYearMonth}
                      editing={props.editing}
                      setEditing={props.setEditing}
                    />
                  }
                />
              </div>
            </div>
          </div>
          <div className="todo-page__right">
            <div className="todo-page__right-content">
              <h4>期限切れToDoリスト</h4>
              <ExpiredTodoListAreaContainer currentYearMonth={props.currentYearMonth} />
            </div>
          </div>
        </div>
      ) : (
        <SearchTodoListAreaContainer
          openSearchResultTodoList={props.openSearchResultTodoList}
          setOpenSearchResultTodoList={props.setOpenSearchResultTodoList}
          closeSearch={props.closeSearch}
        />
      )}
    </>
  );
};

export default TodoPage;
