import React, { useState } from 'react';
import SearchTodoListArea from '../../../../../components/todo/modules/area/searchTodoListArea/SearchTodoListArea';
import { month, year } from '../../../../../lib/constant';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { SearchTodoRequestData } from '../../../../../reducks/todoList/types';
import { fetchGroupSearchTodoList } from '../../../../../reducks/groupTodoList/operations';
import { fetchSearchTodoList } from '../../../../../reducks/todoList/operations';

interface SearchTodoListAreaContainerProps {
  openSearchResultTodoList: boolean;
  setOpenSearchResultTodoList: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseSearch: () => void;
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
  const { group_id } = useParams<{ group_id: string }>();

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

  const handleSelectDateTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDateType(event.target.value as string);
  };

  const handleStartDateChange = (startDate: Date | null) => {
    startSelectDate(startDate as Date);
  };

  const handleEndDateChange = (endDate: Date | null) => {
    setEndDate(endDate as Date);
  };

  const handleSelectCompleteFlagChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'true') {
      setCompleteFlag(true);
    } else if (event.target.value === 'false') {
      setCompleteFlag(false);
    } else if (event.target.value === 'all') {
      setCompleteFlag('all');
    }
  };

  const handleTaskContent = (event: React.ChangeEvent<{ value: string }>) => {
    setTodoContent(event.target.value);
  };

  const handleSelectSortItem = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortItem(event.target.value as string);
  };

  const handleSelectSortType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortType(event.target.value as string);
  };

  const handleSelectLimit = (event: React.ChangeEvent<{ value: unknown }>) => {
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
      dispatch(fetchGroupSearchTodoList(Number(group_id), requestData));
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
      handleCloseSearch={props.handleCloseSearch}
      setOpenSearchResultTodoList={props.setOpenSearchResultTodoList}
      dateType={dateType}
      startDate={startDate}
      endDate={endDate}
      completeFlag={completeFlag}
      todoContent={todoContent}
      sortItem={sortItem}
      sortType={sortType}
      limit={limit}
      handleSelectDateTypeChange={handleSelectDateTypeChange}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      handleSelectCompleteFlagChange={handleSelectCompleteFlagChange}
      handleTaskContent={handleTaskContent}
      handleSelectSortItem={handleSelectSortItem}
      handleSelectSortType={handleSelectSortType}
      openSearchResultTodoList={props.openSearchResultTodoList}
      getSearchResultTodoList={() => fetchSearchTodoListOperation()}
      fetchSearchTodoListRequestData={requestData}
      handleSelectLimit={handleSelectLimit}
    />
  );
};

export default SearchTodoListAreaContainer;
