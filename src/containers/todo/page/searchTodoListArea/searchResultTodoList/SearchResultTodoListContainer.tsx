import React from 'react';
import { SearchTodoRequestData, TodoListItem } from '../../../../../reducks/todoList/types';
import { useSelector } from 'react-redux';
import { getGroupSearchTodoList } from '../../../../../reducks/groupTodoList/selectors';
import { getSearchTodoList } from '../../../../../reducks/todoList/selectors';
import { useLocation } from 'react-router';
import SearchResultTodoList from '../../../../../components/todo/page/SearchTodoListArea/searchResultTodoList/SearchResultTodoList';

interface SearchResultTodoListContainerProps {
  currentDateType: string;
  fetchSearchTodoListRequestData: SearchTodoRequestData;
}

const SearchResultTodoListContainer = (props: SearchResultTodoListContainerProps) => {
  const pathName = useLocation().pathname.split('/')[1];

  const searchTodoList = useSelector(getSearchTodoList);
  const groupSearchTodoList = useSelector(getGroupSearchTodoList);

  let date = '';

  const equalsDisplayDate = (listItem: TodoListItem) => {
    const displayDate =
      props.currentDateType === 'implementation_date'
        ? listItem.implementation_date
        : listItem.due_date;

    if (date !== displayDate) {
      date = displayDate;
      return true;
    }
    return false;
  };

  const displayDate = (listItem: TodoListItem) => {
    return props.currentDateType === 'implementation_date'
      ? listItem.implementation_date
      : listItem.due_date;
  };

  return (
    <SearchResultTodoList
      searchTodoList={pathName === 'group' ? groupSearchTodoList : searchTodoList}
      equalsDisplayDate={equalsDisplayDate}
      displayDate={displayDate}
      fetchSearchTodoListRequestData={props.fetchSearchTodoListRequestData}
      message={'条件に一致するtodoは見つかりませんでした。'}
    />
  );
};

export default SearchResultTodoListContainer;
