import React from 'react';
import './search-result-todo-list.scss';
import { TodoList, TodoListItem } from '../../../../../reducks/todoList/types';
import TodoListComponent from '../../../modules/list/TodoListComponent/TodoListComponent';

interface SearchResultTodoListProps {
  searchTodoList: TodoList;
  currentYearMonth: string;
  equalsDisplayDate: (listItem: TodoListItem) => boolean;
  displayDate: (listItem: TodoListItem) => string;
}

const SearchResultTodoList = (props: SearchResultTodoListProps) => {
  return (
    <div className="search-result-todo-list">
      <div className="search-result-todo-list__list">
        <TodoListComponent
          todoList={props.searchTodoList}
          currentYearMonth={props.currentYearMonth}
          message={'条件に一致するtodoは見つかりませんでした。'}
          equalsDisplayDate={props.equalsDisplayDate}
          displayDate={props.displayDate}
        />
      </div>
    </div>
  );
};

export default SearchResultTodoList;
