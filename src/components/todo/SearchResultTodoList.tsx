import React from 'react';
import { TodoListItem } from '../../reducks/todoList/types';
import { TodoListItemComponent } from './index';
import { date } from '../../lib/constant';
import { useSelector } from 'react-redux';
import { State } from '../../reducks/store/types';
import { getSearchTodoList, getSearchTodoListMessage } from '../../reducks/todoList/selectors';
import '../../assets/todo/search-result-todo-list.scss';

interface SearchResultTodoListProps {
  currentDateType: string;
}

const SearchResultTodoList = (props: SearchResultTodoListProps) => {
  const selector = useSelector((state: State) => state);
  const searchTodoList = getSearchTodoList(selector);
  const searchTodoListMessage = getSearchTodoListMessage(selector);

  const searchResultTodoList = () => {
    let prevDate = '';

    return searchTodoList.map((todoListItem: TodoListItem) => {
      const displayDate =
        props.currentDateType === 'implementation_date'
          ? todoListItem.implementation_date
          : todoListItem.due_date;

      const equalsDisplayDate = () => {
        if (prevDate !== displayDate) {
          prevDate = displayDate;
          return <p className="search-result-todo-list__date">{displayDate}</p>;
        }
      };

      return (
        <div key={todoListItem.id}>
          {equalsDisplayDate()}
          <TodoListItemComponent todoListItem={todoListItem} selectedDate={date} />
        </div>
      );
    });
  };

  return <>{searchTodoList.length ? searchResultTodoList() : <p>{searchTodoListMessage}</p>}</>;
};

export default SearchResultTodoList;
