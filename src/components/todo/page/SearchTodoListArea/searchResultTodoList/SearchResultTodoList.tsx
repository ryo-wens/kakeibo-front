import React from 'react';
import './search-result-todo-list.scss';
import { TodoList, TodoListItem } from '../../../../../reducks/todoList/types';
import TodoListItemComponentContainer from '../../../../../containers/todo/modules/listItem/TodoListItemComponentContainer';

interface SearchResultTodoListProps {
  searchTodoList: TodoList;
  currentYearMonth: string;
  equalsDisplayDate: (listItem: TodoListItem) => boolean;
  displayDate: (listItem: TodoListItem) => string;
  message: string;
}

const SearchResultTodoList = (props: SearchResultTodoListProps) => {
  return (
    <div className="search-result-todo-list">
      <div className="search-result-todo-list__list">
        {props.searchTodoList.length ? (
          props.searchTodoList.map((listItem) => {
            return (
              <div className="todo-list-component__item" key={listItem.id}>
                {props.equalsDisplayDate(listItem) && (
                  <p className="todo-list-component__item-date">{props.displayDate(listItem)}</p>
                )}
                <TodoListItemComponentContainer
                  listItem={listItem}
                  currentYearMonth={props.currentYearMonth}
                  inputTodoClassName={'todo-list-item-component__input-todo'}
                />
              </div>
            );
          })
        ) : (
          <p className="todo-list-component__message">{props.message}</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultTodoList;
