import React from 'react';
import { SearchTodoList } from '../index';
import { GroupTodoList } from '../../../reducks/groupTodoList/types';
import { TodoList } from '../../../reducks/todoList/types';
import './todo-page.scss';
import TodayTodoArea from './TodayTodoArea/TodayTodoArea';
import MonthlyTodoArea from './MonthlyTodoArea/MonthlyTodoArea';
import { TodayOrMonthly } from '../../../reducks/shoppingList/types';
import SwitchTodayOrMonthlyTabsContainer from '../../../containers/uikit/tabs/switchTodayOrMonthlyTabs/SwitchTodayOrMonthlyTabsContainer';

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
  existsExpiredTodoList: (todoList: TodoList | GroupTodoList) => JSX.Element;
  expiredTodoList: TodoList;
  groupExpiredTodoList: GroupTodoList;
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
                leftItem={<TodayTodoArea editing={props.editing} setEditing={props.setEditing} />}
                rightItem={
                  <MonthlyTodoArea
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
              {props.pathName !== 'group'
                ? props.existsExpiredTodoList(props.expiredTodoList)
                : props.existsExpiredTodoList(props.groupExpiredTodoList)}
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
