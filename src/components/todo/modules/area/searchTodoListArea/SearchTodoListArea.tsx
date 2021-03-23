import React from 'react';
import {
  DatePicker,
  SelectLimit,
  SelectSortType,
  TextInput,
} from '../../../../../components/uikit';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchResultTodoListContainer from '../../../../../containers/todo/modules/area/searchTodoListArea/searchResultTodoList/SearchResultTodoListContainer';
import SelectSortItem from '../../select/SelectSortItem';
import SelectCompleteFlag from '../../select/SelectCompleteFlag';
import SelectDateType from '../../../../../components/todo/modules/select/SelectDateType';
import { SearchTodoRequestData } from '../../../../../reducks/todoList/types';
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
  setOpenSearchResultTodoList: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectDateTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleStartDateChange: (selectStartDate: Date | null) => void;
  handleEndDateChange: (selectEndDate: Date | null) => void;
  handleSelectCompleteFlagChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleTaskContent: (event: React.ChangeEvent<{ value: string }>) => void;
  handleSelectSortItem: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleSelectSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleSelectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
  openSearchResultTodoList: boolean;
  getSearchResultTodoList: () => void;
  fetchSearchTodoListRequestData: SearchTodoRequestData;
  handleCloseSearch: () => void;
}

const SearchTodoListArea = (props: SearchTodoListAreaProps) => {
  const searchItems = [
    {
      key: '日時の指定',
      value: (
        <div className={styles.dateDesignation}>
          <SelectDateType
            value={props.dateType}
            id={'dateType'}
            selectChange={props.handleSelectDateTypeChange}
          />
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
        <SelectCompleteFlag
          id={'select-complete-flag'}
          value={props.completeFlag}
          selectChange={props.handleSelectCompleteFlagChange}
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
      value: (
        <SelectSortItem
          id={'sortItem'}
          value={props.sortItem}
          selectChange={props.handleSelectSortItem}
        />
      ),
    },
    {
      key: '並び順',
      value: <SelectSortType selectSortType={props.handleSelectSortType} value={props.sortType} />,
    },
    {
      key: '取得件数',
      value: <SelectLimit selectLimit={props.handleSelectLimit} value={props.limit} />,
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
        <button className={styles.searchBtn} onClick={props.getSearchResultTodoList}>
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
