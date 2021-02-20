import React, { useState } from 'react';
import SearchTodoListArea from '../../../../components/todo/page/SearchTodoListArea/SearchTodoListArea';
import { month, year } from '../../../../lib/constant';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { SearchTodoRequestData } from '../../../../reducks/todoList/types';
import { fetchSearchGroupTodoList } from '../../../../reducks/groupTodoList/operations';
import { fetchSearchTodoList } from '../../../../reducks/todoList/operations';

interface SearchTodoListAreaContainerProps {
  openSearchResultTodoList: boolean;
  setOpenSearchResultTodoList: React.Dispatch<React.SetStateAction<boolean>>;
  closeSearch: () => void;
}

const initialState = {
  initialCurrentDateType: '',
  initialDateType: 'implementation_date',
  initialStartDate: new Date(year, month - 1, 1),
  initialEndDate: new Date(year, month, 0),
  initialCompleteFlag: 'all',
  initialTodoContent: '',
  initialSortItem: 'implementation_date',
  initialSortType: 'asc',
  initialLimit: '',
};

const SearchTodoListAreaContainer = (props: SearchTodoListAreaContainerProps) => {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname.split('/')[1];
  const { group_id } = useParams();

  const [currentDateType, setCurrentDateType] = useState<string>(
    initialState.initialCurrentDateType
  );
  const [dateType, setDateType] = useState<string>(initialState.initialDateType);
  const [startDate, startSelectDate] = useState<Date | null>(initialState.initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialState.initialEndDate);
  const [completeFlag, setCompleteFlag] = useState<boolean | string>(
    initialState.initialCompleteFlag
  );
  const [todoContent, setTodoContent] = useState<string>(initialState.initialTodoContent);
  const [sortItem, setSortItem] = useState<string>(initialState.initialSortItem);
  const [sortType, setSortType] = useState<string>(initialState.initialSortType);
  const [limit, setLimit] = useState<string>(initialState.initialLimit);

  const selectDateTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDateType(event.target.value as string);
  };

  const startDateChange = (startDate: Date | null) => {
    startSelectDate(startDate as Date);
  };

  const endDateChange = (endDate: Date | null) => {
    setEndDate(endDate as Date);
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

  const searchTodoRequestData = () => {
    const data: SearchTodoRequestData = {
      date_type: dateType,
      start_date: startDate,
      end_date: endDate,
      sort: sortItem,
      sort_type: sortType,
    };

    if (completeFlag !== 'all') {
      data.complete_flag = completeFlag;
    }
    if (todoContent !== '') {
      data.todo_content = todoContent;
    }
    if (limit !== '') {
      data.limit = limit;
    }
    return data;
  };

  const requestData: SearchTodoRequestData = searchTodoRequestData();

  const fetchSearchTodoListOperation = () => {
    if (pathName === 'group') {
      dispatch(fetchSearchGroupTodoList(Number(group_id), requestData));
      props.setOpenSearchResultTodoList(true);
      setCurrentDateType(dateType);
    }

    dispatch(fetchSearchTodoList(requestData));
    props.setOpenSearchResultTodoList(true);
    setCurrentDateType(dateType);
  };

  return (
    <SearchTodoListArea
      currentDateType={currentDateType}
      closeSearch={props.closeSearch}
      setOpenSearchResultTodoList={props.setOpenSearchResultTodoList}
      dateType={dateType}
      startDate={startDate}
      endDate={endDate}
      completeFlag={completeFlag}
      todoContent={todoContent}
      sortItem={sortItem}
      sortType={sortType}
      limit={limit}
      selectDateTypeChange={selectDateTypeChange}
      startDateChange={startDateChange}
      endDateChange={endDateChange}
      selectCompleteFlagChange={selectCompleteFlagChange}
      inputTaskContent={inputTaskContent}
      selectSortItemChange={selectSortItemChange}
      selectSortType={selectSortType}
      openSearchResultTodoList={props.openSearchResultTodoList}
      getSearchResultTodoList={() => fetchSearchTodoListOperation()}
      fetchSearchTodoListRequestData={requestData}
      selectLimit={selectLimit}
    />
  );
};

export default SearchTodoListAreaContainer;
