import React, { useState } from 'react';
import SearchField from './SearchField';
import { month, year } from '../../lib/constant';
import '../../assets/todo/search-todo-list.scss';

const SearchTodoList = () => {
  const [openSearchField, setOpenSearchField] = useState<boolean>(false);
  const [dateType, setDateType] = useState<string>('implementation_date');
  const [selectStartDate, setStartSelectDate] = useState<Date | null>(new Date(year, month - 1, 1));
  const [selectEndDate, setEndSelectDate] = useState<Date | null>(new Date(year, month, 0));
  const [completeFlag, setCompleteFlag] = useState<boolean | string>('all');
  const [todoContent, setTodoContent] = useState<string>('');
  const [sortItem, setSortItem] = useState<string>('implementation_date');
  const [sortType, setSortType] = useState<string>('desc');
  const [limit, setLimit] = useState<string>('');

  const openSearch = () => {
    setOpenSearchField(true);
  };

  const closeSearch = () => {
    setOpenSearchField(false);
  };

  const selectDateTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDateType(event.target.value as string);
  };

  const selectStartDateChange = (selectStartDate: Date | null) => {
    setStartSelectDate(selectStartDate as Date);
  };

  const selectEndDateChange = (selectEndDate: Date | null) => {
    setEndSelectDate(selectEndDate as Date);
  };

  const selectCompleteFlagChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'true') {
      setCompleteFlag(true);
    } else if (event.target.value === 'false') {
      setCompleteFlag(false);
    } else if (event.target.value === 'all') {
      setCompleteFlag('all');
    }
  };

  const inputTaskContent = (event: React.ChangeEvent<{ value: string }>) => {
    setTodoContent(event.target.value);
  };

  const selectSortItemChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortItem(event.target.value as string);
  };

  const selectSortType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortType(event.target.value as string);
  };

  const selectLimit = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLimit(event.target.value as string);
  };

  return (
    <>
      {!openSearchField ? (
        <button className="search-todo-list" onClick={() => openSearch()}>
          検索
        </button>
      ) : (
        <SearchField
          closeSearch={closeSearch}
          dateType={dateType}
          selectStartDate={selectStartDate}
          selectEndDate={selectEndDate}
          completeFlag={completeFlag}
          todoContent={todoContent}
          sortItem={sortItem}
          sortType={sortType}
          limit={limit}
          selectDateTypeChange={selectDateTypeChange}
          selectStartDateChange={selectStartDateChange}
          selectEndDateChange={selectEndDateChange}
          selectCompleteFlagChange={selectCompleteFlagChange}
          inputTaskContent={inputTaskContent}
          selectSortItemChange={selectSortItemChange}
          selectSortType={selectSortType}
          selectLimit={selectLimit}
        />
      )}
    </>
  );
};

export default SearchTodoList;
