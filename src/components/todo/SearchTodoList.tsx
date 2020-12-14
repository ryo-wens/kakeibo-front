import React, { useState } from 'react';
import SearchField from './SearchField';
import { month, year } from '../../lib/constant';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { SearchResultTodoList } from './index';
import { Groups } from '../../reducks/groups/types';
import { useSelector } from 'react-redux';
import { getSearchTodoList, getSearchTodoListMessage } from '../../reducks/todoList/selectors';
import {
  getGroupSearchTodoList,
  getGroupSearchTodoListMessage,
} from '../../reducks/groupTodoList/selectors';
import { useLocation } from 'react-router';

interface SearchTodoListProps {
  openSearchResultTodoList: boolean;
  setOpenSearchResultTodoList: React.Dispatch<React.SetStateAction<boolean>>;
  closeSearch: () => void;
  approvedGroups: Groups;
}

const SearchTodoList = (props: SearchTodoListProps) => {
  const pathName = useLocation().pathname.split('/')[1];
  const searchTodoList = useSelector(getSearchTodoList);
  const searchTodoListMessage = useSelector(getSearchTodoListMessage);
  const groupSearchTodoList = useSelector(getGroupSearchTodoList);
  const groupSearchTodoListMessage = useSelector(getGroupSearchTodoListMessage);
  const [currentDateType, setCurrentDateType] = useState<string>('');
  const [dateType, setDateType] = useState<string>('implementation_date');
  const [selectStartDate, setStartSelectDate] = useState<Date | null>(new Date(year, month - 1, 1));
  const [selectEndDate, setEndSelectDate] = useState<Date | null>(new Date(year, month, 0));
  const [completeFlag, setCompleteFlag] = useState<boolean | string>('all');
  const [todoContent, setTodoContent] = useState<string>('');
  const [sortItem, setSortItem] = useState<string>('implementation_date');
  const [sortType, setSortType] = useState<string>('asc');
  const [limit, setLimit] = useState<string>('');
  const [userIds, setUserIds] = useState<Array<string>>([]);

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
      <div className="search-field">
        <div className="search-field__position">
          <button className="search-field__btn-position" onClick={() => props.closeSearch()}>
            <ChevronLeftIcon />
          </button>
          <h3 className="search-field__title">Todoを検索</h3>
        </div>
        <SearchField
          approvedGroups={props.approvedGroups}
          closeSearch={props.closeSearch}
          setCurrentDateType={setCurrentDateType}
          setOpenSearchResultTodoList={props.setOpenSearchResultTodoList}
          setUsersIds={setUserIds}
          dateType={dateType}
          selectStartDate={selectStartDate}
          selectEndDate={selectEndDate}
          completeFlag={completeFlag}
          todoContent={todoContent}
          sortItem={sortItem}
          sortType={sortType}
          limit={limit}
          userIds={userIds}
          selectDateTypeChange={selectDateTypeChange}
          selectStartDateChange={selectStartDateChange}
          selectEndDateChange={selectEndDateChange}
          selectCompleteFlagChange={selectCompleteFlagChange}
          inputTaskContent={inputTaskContent}
          selectSortItemChange={selectSortItemChange}
          selectSortType={selectSortType}
          selectLimit={selectLimit}
        />
        {props.openSearchResultTodoList && (
          <SearchResultTodoList
            currentDateType={currentDateType}
            todoList={pathName === 'group' ? groupSearchTodoList : searchTodoList}
            message={pathName === 'group' ? groupSearchTodoListMessage : searchTodoListMessage}
          />
        )}
      </div>
    </>
  );
};

export default SearchTodoList;
