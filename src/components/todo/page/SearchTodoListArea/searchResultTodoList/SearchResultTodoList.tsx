import React from 'react';
import './search-result-todo-list.scss';
import {
  SearchTodoRequestData,
  TodoList,
  TodoListItem,
} from '../../../../../reducks/todoList/types';
import { customMonth, year } from '../../../../../lib/constant';
import SearchTodoListItemComponentContainer from '../../../../../containers/todo/page/searchTodoListArea/searchResultTodoList/searchResultTodoListItem/SearchTodoListItemComponentContainer';

interface SearchResultTodoListProps {
  searchTodoList: TodoList;
  equalsDisplayDate: (listItem: TodoListItem) => boolean;
  displayDate: (listItem: TodoListItem) => string;
  fetchSearchTodoListRequestData: SearchTodoRequestData;
  message: string;
}

const SearchResultTodoList = (props: SearchResultTodoListProps) => {
  const existSearchTodoList = props.searchTodoList.length !== 0;

  return (
    <div className="search-result-todo-list">
      {existSearchTodoList ? (
        <ol className="search-result-todo-list__list-by-date">
          {props.searchTodoList.map((listItem) => {
            return (
              <>
                {props.equalsDisplayDate(listItem) && (
                  <p className="search-result-todo-list__list-item-date">
                    {props.displayDate(listItem)}
                  </p>
                )}
                <SearchTodoListItemComponentContainer
                  listItem={listItem}
                  currentYear={String(year)}
                  currentMonth={customMonth}
                  inputTodoClassName={'search-result-todo-list__todo-list-item-form'}
                  listItemStyle={'search-result-todo-list__list-item'}
                  fetchSearchTodoListRequestData={props.fetchSearchTodoListRequestData}
                  key={listItem.id}
                />
              </>
            );
          })}
        </ol>
      ) : (
        <p className="search-result-todo-list__message">{props.message}</p>
      )}
    </div>
  );
};

export default SearchResultTodoList;
