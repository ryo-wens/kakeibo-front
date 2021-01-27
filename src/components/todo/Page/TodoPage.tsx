import React from 'react';
import { SearchTodoList } from '../index';
import './todo-page.scss';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';
import ExpiredTodoListAreaContainer from '../../../containers/todo/page/ExpiredTodoListArea/ExpiredTodoListAreaContainer';
import TodayTodoAreaContainer from '../../../containers/todo/page/TodayTodoListArea/TodayTodoListAreaContainer';
import MonthlyTodoListAreaContainer from '../../../containers/todo/page/MonthlyTodoListArea/MonthlyTodoListAreaContainer';

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
          <div className="todo-page__right">
            <div className="todo-page__right-content">
              <h4>期限切れToDoリスト</h4>
              <ExpiredTodoListAreaContainer currentYearMonth={props.currentYearMonth} />
            </div>
          </div>
        </div>
      ) : (
        <SearchTodoList
          openSearchResultTodoList={props.openSearchResultTodoList}
          setOpenSearchResultTodoList={props.setOpenSearchResultTodoList}
          closeSearch={props.closeSearch}
        />
      )}
    </>
  );
};

export default TodoPage;
