import React from 'react';
import { DatePicker, SelectLimit, SelectSortType, TextInput } from '../../../uikit';
import SelectDateType from '../../modules/select/SelectDateType';
import './search-todo-list-area.scss';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchResultTodoListContainer from '../../../../containers/todo/page/searchTodoListArea/searchResultTodoList/SearchResultTodoListContainer';
import SelectSortItem from '../../modules/select/SelectSortItem';
import SelectCompleteFlag from '../../modules/select/SelectCompleteFlag';
import { SearchTodoRequestData } from '../../../../reducks/todoList/types';

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
  selectDateTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  startDateChange: (selectStartDate: Date | null) => void;
  endDateChange: (selectEndDate: Date | null) => void;
  selectCompleteFlagChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  inputTaskContent: (event: React.ChangeEvent<{ value: string }>) => void;
  selectSortItemChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
  openSearchResultTodoList: boolean;
  getSearchResultTodoList: () => void;
  fetchSearchTodoListRequestData: SearchTodoRequestData;
  closeSearch: () => void;
}

const SearchTodoListArea = (props: SearchTodoListAreaProps) => {
  const searchItems = [
    {
      key: '日時の指定',
      value: (
        <div className="search-todo-list-area__date-designation">
          <SelectDateType
            value={props.dateType}
            id={'dateType'}
            selectChange={props.selectDateTypeChange}
          />
          <div className="search-todo-list-area__date-pickers">
            <DatePicker
              id={'startDate'}
              label={'開始日'}
              onChange={props.startDateChange}
              required={false}
              value={props.startDate}
              disabled={false}
              minDate={new Date('1900-01-01')}
            />
            <span className="search-todo-list-area__date-pickers--space">〜</span>
            <DatePicker
              id={'startDate'}
              label={'終了日'}
              onChange={props.endDateChange}
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
          selectChange={props.selectCompleteFlagChange}
        />
      ),
    },
    {
      key: 'Todo名',
      value: (
        <TextInput
          id="todo-consent"
          label={''}
          value={props.todoContent}
          onChange={props.inputTaskContent}
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
          selectChange={props.selectSortItemChange}
        />
      ),
    },
    {
      key: '並び順',
      value: <SelectSortType selectSortType={props.selectSortType} value={props.sortType} />,
    },
    {
      key: '取得件数',
      value: <SelectLimit selectLimit={props.selectLimit} value={props.limit} />,
    },
  ];

  return (
    <div className="search-todo-list-area">
      <div className="search-todo-list-area__position">
        <button className="search-todo-list-area__btn-position" onClick={() => props.closeSearch()}>
          <ChevronLeftIcon />
        </button>
        <h3 className="search-todo-list-area__title">Todoを検索</h3>
      </div>
      {searchItems.map((item) => {
        return (
          <div className="search-todo-list-area__select-items" key={item.key}>
            <span className="search-todo-list-area__select-items--key">{item.key}</span>
            <span className="search-todo-list-area__select-items--value">{item.value}</span>
          </div>
        );
      })}
      <div className="search-todo-list-area__search-btn">
        <button className="save-btn" onClick={props.getSearchResultTodoList}>
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
