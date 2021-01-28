import React from 'react';
import './search-result-todo-list.scss';
import { TodoList, TodoListItem } from '../../../../../reducks/todoList/types';
import { GroupTodoList, GroupTodoListItem } from '../../../../../reducks/groupTodoList/types';
import TodoListComponent from '../../../modules/list/TodoListComponent/TodoListComponent';

interface SearchResultTodoListProps {
  searchTodoList: TodoList | GroupTodoList;
  currentYearMonth: string;
  equalsDisplayDate: (listItem: TodoListItem | GroupTodoListItem) => boolean;
  displayDate: (listItem: TodoListItem | GroupTodoListItem) => string;
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
