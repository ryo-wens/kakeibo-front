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
  return (
    <div className="search-result-todo-list">
      <div className="search-result-todo-list__list">
        {props.searchTodoList.length ? (
          props.searchTodoList.map((listItem) => {
            return (
              <div className="search-result-todo-list__item" key={listItem.id}>
                {props.equalsDisplayDate(listItem) && (
                  <p className="search-result-todo-list__item-date">
                    {props.displayDate(listItem)}
                  </p>
                )}
                <SearchTodoListItemComponentContainer
                  listItem={listItem}
                  currentYear={String(year)}
                  currentMonth={customMonth}
                  inputTodoClassName={'todo-list-item-component__input-todo'}
                  fetchSearchTodoListRequestData={props.fetchSearchTodoListRequestData}
                />
              </div>
            );
          })
        ) : (
          <p className="search-result-todo-list__message">{props.message}</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultTodoList;
