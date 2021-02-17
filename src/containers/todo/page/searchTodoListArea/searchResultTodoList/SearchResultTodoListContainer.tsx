import React from 'react';
import { customMonth, year } from '../../../../../lib/constant';
import { TodoListItem } from '../../../../../reducks/todoList/types';
import { useSelector } from 'react-redux';
import { getGroupSearchTodoList } from '../../../../../reducks/groupTodoList/selectors';
import { getSearchTodoList } from '../../../../../reducks/todoList/selectors';
import { useLocation } from 'react-router';
import SearchResultTodoList from '../../../../../components/todo/page/SearchTodoListArea/searchResultTodoList/SearchResultTodoList';

interface SearchResultTodoListContainerProps {
  currentDateType: string;
}

const SearchResultTodoListContainer = (props: SearchResultTodoListContainerProps) => {
  const pathName = useLocation().pathname.split('/')[1];

  const currentYearMonth = `${year}/${customMonth}`;
  const searchTodoList = useSelector(getSearchTodoList);
  const groupSearchTodoList = useSelector(getGroupSearchTodoList);

  const prevData = {
    date: '',
  };

  const equalsDisplayDate = (listItem: TodoListItem) => {
    const displayDate =
      props.currentDateType === 'implementation_date'
        ? listItem.implementation_date
        : listItem.due_date;

    if (prevData.date !== displayDate) {
      prevData.date = displayDate;
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
      currentYearMonth={currentYearMonth}
      equalsDisplayDate={equalsDisplayDate}
      displayDate={displayDate}
      message={'条件に一致するtodoは見つかりませんでした。'}
    />
  );
};

export default SearchResultTodoListContainer;
