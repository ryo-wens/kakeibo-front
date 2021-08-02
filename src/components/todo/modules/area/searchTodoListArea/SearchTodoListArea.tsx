import React from 'react';
import { DatePicker, TextInput } from '../../../../../components/uikit';
import { Select } from '../../../../uikit/Select';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchResultTodoListContainer from '../../../../../containers/todo/modules/area/searchTodoListArea/searchResultTodoList/SearchResultTodoListContainer';
import { FetchSearchTodoListReq } from '../../../../../reducks/todoList/types';
import {
  selectDateType,
  selectLimitList,
  selectSortTypeList,
  selectSortItemList,
  selectCompleteFlagList,
} from '../../../../../lib/constant';
import styles from './SearchTodoListArea.module.scss';

interface SearchTodoListAreaProps {
  currentDateType: string;
  dateType: string;
  startDate: Date | null;
  endDate: Date | null;
  completeFlag: string | boolean;
  todoContent: string;
  sortItem: string;
  sortType: string;
  limit: string;
  handleSelectDateTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleStartDateChange: (selectStartDate: Date | null) => void;
  handleEndDateChange: (selectEndDate: Date | null) => void;
  handleSelectCompleteFlagChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleTaskContent: (event: React.ChangeEvent<{ value: string }>) => void;
  handleSelectSortItem: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleSelectSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleSelectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
  openSearchResultTodoList: boolean;
  handleFetchSearchTodoList: () => void;
  fetchSearchTodoListRequestData: FetchSearchTodoListReq;
  handleCloseSearch: () => void;
}

const SearchTodoListArea = (props: SearchTodoListAreaProps) => {
  const searchItems = [
    {
      key: '日時の指定',
      value: (
        <div className={styles.dateDesignation}>
          <div className={styles.selectDateType}>
            <Select selectItemList={selectDateType} changeItem={props.handleSelectDateTypeChange} />
          </div>
          <div className={styles.datePickers}>
            <DatePicker
              id={'startDate'}
              label={'開始日'}
              onChange={props.handleStartDateChange}
              required={false}
              value={props.startDate}
              disabled={false}
              minDate={new Date('1900-01-01')}
            />
            <span className={styles.datePickers__space}>〜</span>
            <DatePicker
              id={'startDate'}
              label={'終了日'}
              onChange={props.handleEndDateChange}
              required={false}
              value={props.endDate}
              disabled={false}
              minDate={new Date('1900-01-01')}
            />
          </div>
        </div>
      ),
    },
    {
      key: '実施の有無',
      value: (
        <Select
          selectItemList={selectCompleteFlagList}
          changeItem={props.handleSelectCompleteFlagChange}
        />
      ),
    },
    {
      key: 'ToDo名',
      value: (
        <TextInput
          id="todo-consent"
          label={''}
          value={props.todoContent}
          onChange={props.handleTaskContent}
          required={true}
          type={'text'}
          fullWidth={false}
          disabled={false}
        />
      ),
    },
    {
      key: '並び替え項目',
      value: <Select selectItemList={selectSortItemList} changeItem={props.handleSelectSortItem} />,
    },
    {
      key: '並び順',
      value: <Select selectItemList={selectSortTypeList} changeItem={props.handleSelectSortType} />,
    },
    {
      key: '取得件数',
      value: <Select selectItemList={selectLimitList} changeItem={props.handleSelectLimit} />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.position}>
        <button className={styles.btnPosition} onClick={() => props.handleCloseSearch()}>
          <ChevronLeftIcon />
        </button>
        <h3 className={styles.title}>ToDoを検索</h3>
      </div>
      {searchItems.map((item) => {
        return (
          <div className={styles.selectItems} key={item.key}>
            <span className={styles.selectItems__key}>{item.key}</span>
            <span className={styles.selectItems__value}>{item.value}</span>
          </div>
        );
      })}
      <div className={styles.searchBtnPosition}>
        <button className={styles.searchBtn} onClick={props.handleFetchSearchTodoList}>
          この条件で検索
        </button>
      </div>
      {props.openSearchResultTodoList && (
        <SearchResultTodoListContainer
          currentDateType={props.currentDateType}
          fetchSearchTodoListRequestData={props.fetchSearchTodoListRequestData}
        />
      )}
    </div>
  );
};

export default SearchTodoListArea;
