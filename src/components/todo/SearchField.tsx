import React from 'react';
import { DatePicker, SelectCompleteFlag, SelectLimit, SelectSortType } from '../uikit';
import { TextInput } from './index';
import SelectDateType from '../uikit/SelectDateType';
import '../../assets/todo/search-field.scss';
import { useDispatch } from 'react-redux';
import { searchTodoList } from '../../reducks/todoList/operations';
import { searchTodoRequestData } from '../../reducks/todoList/types';

interface SearchFieldProps {
  closeSearch: () => void;
  setCurrentDateType: React.Dispatch<React.SetStateAction<string>>;
  setOpenSearchResultTodoList: React.Dispatch<React.SetStateAction<boolean>>;
  dateType: string;
  selectStartDate: Date | null;
  selectEndDate: Date | null;
  completeFlag: string | boolean;
  todoContent: string;
  sortItem: string;
  sortType: string;
  limit: string;
  selectDateTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectStartDateChange: (selectStartDate: Date | null) => void;
  selectEndDateChange: (selectEndDate: Date | null) => void;
  selectCompleteFlagChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  inputTaskContent: (event: React.ChangeEvent<{ value: string }>) => void;
  selectSortItemChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectSortType: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectLimit: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const SearchField = (props: SearchFieldProps) => {
  const dispatch = useDispatch();

  const searchFiled = [
    {
      key: '日時の指定',
      value: (
        <div className="search-field__date-designation">
          <SelectDateType
            value={props.dateType}
            label={'日時の種類'}
            id={'dateType'}
            selectChange={props.selectDateTypeChange}
          />
          <DatePicker
            id={'startDate'}
            label={'開始日'}
            onChange={props.selectStartDateChange}
            required={false}
            value={props.selectStartDate}
          />
          <span>〜</span>
          <DatePicker
            id={'startDate'}
            label={'終了日'}
            onChange={props.selectEndDateChange}
            required={false}
            value={props.selectEndDate}
          />
        </div>
      ),
    },
    {
      key: '実施の有無',
      value: (
        <SelectCompleteFlag
          value={props.completeFlag}
          selectCompleteFlagChange={props.selectCompleteFlagChange}
        />
      ),
    },
    {
      key: 'Todo名',
      value: (
        <TextInput
          id="filled-basic"
          variant="filled"
          required={true}
          rows={1}
          type={'text'}
          value={props.todoContent}
          onChange={props.inputTaskContent}
        />
      ),
    },
    {
      key: '並び替え項目',
      value: (
        <SelectDateType
          value={props.sortItem}
          label={'並び替え項目'}
          id={'sortItem'}
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

  const searchRequestData = () => {
    const requestData: searchTodoRequestData = {
      date_type: props.dateType,
      start_date: props.selectStartDate,
      end_date: props.selectEndDate,
      sort: props.sortItem,
      sort_type: props.sortType,
    };

    if (props.completeFlag !== 'all') {
      requestData.complete_flag = props.completeFlag;
    }
    if (props.todoContent !== '') {
      requestData.todo_content = props.todoContent;
    }
    if (props.limit !== '') {
      requestData.limit = props.limit;
    }
    return requestData;
  };

  return (
    <>
      {searchFiled.map((searchEntry) => {
        return (
          <div className="search-field__select-contents" key={searchEntry.key}>
            <span className="search-field__select-contents--key">{searchEntry.key}</span>
            <span className="search-field__select-contents--value">{searchEntry.value}</span>
          </div>
        );
      })}
      <div className="search-field__search-btn">
        <button
          className="save-btn"
          onClick={() => {
            dispatch(searchTodoList(searchRequestData()));
            props.setOpenSearchResultTodoList(true);
            props.setCurrentDateType(props.dateType);
          }}
        >
          この条件で検索
        </button>
      </div>
    </>
  );
};

export default SearchField;
