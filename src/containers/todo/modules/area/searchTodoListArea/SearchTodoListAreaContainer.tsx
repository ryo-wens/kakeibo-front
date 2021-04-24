import React, { useState } from 'react';
import SearchTodoListArea from '../../../../../components/todo/modules/area/searchTodoListArea/SearchTodoListArea';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { FetchSearchTodoListReq } from '../../../../../reducks/todoList/types';
import { fetchGroupSearchTodoList } from '../../../../../reducks/groupTodoList/operations';
import { fetchSearchTodoList } from '../../../../../reducks/todoList/operations';
import dayjs from 'dayjs';

interface SearchTodoListAreaContainerProps {
  handleCloseSearch: () => void;
}

const initialState = {
  initialCurrentDateType: '',
  initialDateType: 'implementation_date',
  initialStartDate: dayjs().startOf('month').toDate(),
  initialEndDate: dayjs().endOf('month').toDate(),
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

  const [openSearchResult, setOpenSearchResult] = useState(false);

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

  const handleOpenSearchResult = () => {
    setOpenSearchResult(true);
  };

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
    const requestData: FetchSearchTodoListReq = {
      date_type: dateType,
      start_date: dayjs(String(startDate)).format(),
      end_date: dayjs(String(endDate)).format(),
      sort: sortItem,
      sort_type: sortType,
    };

    if (completeFlag !== 'all') requestData.complete_flag = completeFlag;

    if (todoContent !== '') requestData.todo_content = todoContent;

    if (limit !== '') requestData.limit = limit;

    return requestData;
  };

  const requestData: FetchSearchTodoListReq = searchTodoRequestData();

  const handleFetchSearchTodoList = async () => {
    if (pathName === 'group') {
      try {
        await dispatch(fetchGroupSearchTodoList(Number(group_id), requestData));

        handleOpenSearchResult();
        setCurrentDateType(dateType);
      } catch (error) {
        alert(error.response.data.error.message.toString());
      }
    } else {
      try {
        await dispatch(fetchSearchTodoList(requestData));

        handleOpenSearchResult();
        setCurrentDateType(dateType);
      } catch (error) {
        alert(error.response.data.error.message.toString());
      }
    }
  };

  return (
    <SearchTodoListArea
      currentDateType={currentDateType}
      handleCloseSearch={props.handleCloseSearch}
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
      openSearchResultTodoList={openSearchResult}
      handleFetchSearchTodoList={handleFetchSearchTodoList}
      fetchSearchTodoListRequestData={requestData}
      handleSelectLimit={handleSelectLimit}
    />
  );
};

export default SearchTodoListAreaContainer;
